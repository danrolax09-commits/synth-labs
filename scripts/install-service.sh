#!/bin/bash

##############################################################################
# INSTALL: Create systemd service for continuous pipeline
##############################################################################

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPTS_DIR="$PROJECT_DIR/scripts"
SERVICE_NAME="synth-labs-pipeline"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}[INSTALL]${NC} $1"; }
success() { echo -e "${GREEN}✓ $1${NC}"; }
error() { echo -e "${RED}✗ $1${NC}"; }

##############################################################################
# Check if running as root
##############################################################################

if [ "$EUID" -ne 0 ]; then
    error "This script must run as root (use: sudo ./scripts/install-service.sh)"
    exit 1
fi

log "Installing systemd service for continuous pipeline..."
echo ""

##############################################################################
# Create Service File
##############################################################################

log "Creating systemd service file..."

cat > "$SERVICE_FILE" << SERVICE
[Unit]
Description=Synth Labs Continuous Deploy Pipeline
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=$SUDO_USER
WorkingDirectory=$PROJECT_DIR
EnvironmentFile=-$PROJECT_DIR/.env.pipeline

# Load tokens from environment
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Environment="NODE_ENV=production"

# Build paths
ExecStart=$SCRIPTS_DIR/continuous-deploy.sh monitor
Restart=always
RestartSec=10

# Resource limits
LimitNOFILE=65536
LimitNPROC=4096

# Output
StandardOutput=journal
StandardError=journal
SyslogIdentifier=synth-labs-pipeline

# Shutdown
KillMode=mixed
KillSignal=SIGTERM
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target
SERVICE

success "Service file created: $SERVICE_FILE"
echo ""

##############################################################################
# Create Environment File
##############################################################################

log "Creating environment configuration file..."

ENV_FILE="$PROJECT_DIR/.env.pipeline"

if [ ! -f "$ENV_FILE" ]; then
    cat > "$ENV_FILE" << ENV
# Synth Labs Pipeline Environment Configuration

# Vercel Deployment Token (required)
# Get from: https://vercel.com/account/tokens
VERCEL_TOKEN=

# GitHub Token (optional, for auto-commit)
# Get from: https://github.com/settings/tokens
GITHUB_TOKEN=

# Pipeline Settings
DEPLOY_INTERVAL=300
NODE_ENV=production
ENV

    log "Created: $ENV_FILE"
    warn "⚠ EDIT THIS FILE: Add your VERCEL_TOKEN and GITHUB_TOKEN"
    warn "⚠ Then reload the service: sudo systemctl daemon-reload"
else
    success "Using existing: $ENV_FILE"
fi

echo ""

##############################################################################
# Reload systemd
##############################################################################

log "Reloading systemd daemon..."
systemctl daemon-reload
success "Systemd reloaded"

echo ""

##############################################################################
# Show Status
##############################################################################

echo "═══════════════════════════════════════════════════════════"
success "SERVICE INSTALLATION COMPLETE"
echo "═══════════════════════════════════════════════════════════"
echo ""

log "Service: $SERVICE_NAME"
log "File: $SERVICE_FILE"
log "Config: $ENV_FILE"
echo ""

log "Quick Commands:"
log "  Start:   sudo systemctl start $SERVICE_NAME"
log "  Stop:    sudo systemctl stop $SERVICE_NAME"
log "  Status:  sudo systemctl status $SERVICE_NAME"
log "  Logs:    sudo journalctl -u $SERVICE_NAME -f"
log "  Enable:  sudo systemctl enable $SERVICE_NAME"
log "  Disable: sudo systemctl disable $SERVICE_NAME"
echo ""

log "Next Steps:"
log "1. Edit configuration: nano $ENV_FILE"
log "2. Add VERCEL_TOKEN and GITHUB_TOKEN"
log "3. Start service: sudo systemctl start $SERVICE_NAME"
log "4. Monitor: sudo journalctl -u $SERVICE_NAME -f"
echo ""

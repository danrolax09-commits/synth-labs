#!/bin/bash

##############################################################################
# VERIFY: Check pipeline setup and readiness
##############################################################################

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}ℹ${NC} $1"; }
success() { echo -e "${GREEN}✓${NC} $1"; }
error() { echo -e "${RED}✗${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }

PASS=0
FAIL=0

check() {
    local name=$1
    local cmd=$2
    
    if eval "$cmd" > /dev/null 2>&1; then
        success "$name"
        ((PASS++))
    else
        error "$name"
        ((FAIL++))
    fi
}

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "                  PIPELINE READINESS CHECK"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Prerequisites
log "Checking Prerequisites..."
check "Node.js" "command -v node"
check "npm" "command -v npm"
check "Git" "command -v git"
check "curl" "command -v curl"
echo ""

# Project Structure
log "Checking Project Structure..."
check "package.json" "test -f '$PROJECT_DIR/package.json'"
check "next.config.js" "test -f '$PROJECT_DIR/next.config.js'"
check "scripts directory" "test -d '$PROJECT_DIR/scripts'"
check "logs directory" "test -d '$PROJECT_DIR/logs' || mkdir -p '$PROJECT_DIR/logs' && test -d '$PROJECT_DIR/logs'"
echo ""

# Scripts
log "Checking Pipeline Scripts..."
check "continuous-deploy.sh" "test -x '$PROJECT_DIR/scripts/continuous-deploy.sh'"
check "monitor-dashboard.sh" "test -x '$PROJECT_DIR/scripts/monitor-dashboard.sh'"
check "setup-pipeline.sh" "test -x '$PROJECT_DIR/scripts/setup-pipeline.sh'"
check "install-service.sh" "test -x '$PROJECT_DIR/scripts/install-service.sh'"
echo ""

# Environment
log "Checking Environment..."
if [ -n "$VERCEL_TOKEN" ]; then
    success "VERCEL_TOKEN is set"
    ((PASS++))
else
    warn "VERCEL_TOKEN not set (required for deployment)"
    ((FAIL++))
fi

if [ -n "$GITHUB_TOKEN" ]; then
    success "GITHUB_TOKEN is set (optional)"
    ((PASS++))
else
    warn "GITHUB_TOKEN not set (optional, for auto-commit)"
fi
echo ""

# Build capability
log "Checking Build Capability..."
cd "$PROJECT_DIR"
if npm ci > /dev/null 2>&1; then
    success "Dependencies installable"
    ((PASS++))
    
    if npm run build > /dev/null 2>&1; then
        success "Project buildable"
        ((PASS++))
    else
        error "Project build failed"
        ((FAIL++))
    fi
else
    error "Dependency installation failed"
    ((FAIL++))
fi
echo ""

# Git status
log "Checking Git Status..."
if [ -d "$PROJECT_DIR/.git" ]; then
    success "Git repository initialized"
    ((PASS++))
    
    BRANCH=$(git -C "$PROJECT_DIR" rev-parse --abbrev-ref HEAD 2>/dev/null)
    log "Current branch: $BRANCH"
else
    warn "Not a git repository (required for auto-commit)"
fi
echo ""

# Summary
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "Results: ${GREEN}$PASS passed${NC}, ${RED}$FAIL failed${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    success "All checks passed! Pipeline is ready."
    echo ""
    echo -e "${YELLOW}Next step:${NC}"
    echo ""
    echo "  ./scripts/continuous-deploy.sh monitor"
    echo ""
    exit 0
else
    error "Some checks failed. Review above."
    echo ""
    echo -e "${YELLOW}To fix:${NC}"
    echo ""
    echo "1. Set VERCEL_TOKEN:"
    echo "   export VERCEL_TOKEN='your_token_here'"
    echo ""
    echo "2. Try setup again:"
    echo "   ./scripts/setup-pipeline.sh"
    echo ""
    exit 1
fi

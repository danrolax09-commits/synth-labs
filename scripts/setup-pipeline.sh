#!/bin/bash

##############################################################################
# SETUP: Configure and verify pipeline prerequisites
##############################################################################

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPTS_DIR="$PROJECT_DIR/scripts"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}[SETUP]${NC} $1"; }
success() { echo -e "${GREEN}✓ $1${NC}"; }
error() { echo -e "${RED}✗ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }

log "Setting up Continuous Deploy Pipeline"
echo ""

##############################################################################
# 1. Check Prerequisites
##############################################################################

log "Checking prerequisites..."

# Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    success "Node.js $NODE_VERSION"
else
    error "Node.js not found. Install from https://nodejs.org/"
    exit 1
fi

# npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    success "npm $NPM_VERSION"
else
    error "npm not found"
    exit 1
fi

# Git
if command -v git &> /dev/null; then
    success "Git installed"
else
    error "Git not found"
    exit 1
fi

# curl
if command -v curl &> /dev/null; then
    success "curl installed"
else
    error "curl not found"
    exit 1
fi

echo ""

##############################################################################
# 2. Verify Project Structure
##############################################################################

log "Verifying project structure..."

if [ -f "$PROJECT_DIR/package.json" ]; then
    success "package.json found"
else
    error "package.json not found in $PROJECT_DIR"
    exit 1
fi

if [ -f "$PROJECT_DIR/next.config.js" ]; then
    success "Next.js project detected"
else
    warn "next.config.js not found - may not be Next.js"
fi

echo ""

##############################################################################
# 3. Create Logs Directory
##############################################################################

log "Creating logs directory..."
mkdir -p "$PROJECT_DIR/logs"
success "Logs directory: $PROJECT_DIR/logs"

echo ""

##############################################################################
# 4. Make Scripts Executable
##############################################################################

log "Making scripts executable..."
chmod +x "$SCRIPTS_DIR/continuous-deploy.sh"
success "Scripts are executable"

echo ""

##############################################################################
# 5. Check Environment Variables
##############################################################################

log "Checking environment variables..."

if [ -z "$VERCEL_TOKEN" ]; then
    warn "VERCEL_TOKEN not set"
    log "To enable Vercel deployment:"
    log "  export VERCEL_TOKEN='your_vercel_token_here'"
else
    success "VERCEL_TOKEN is set"
fi

if [ -z "$GITHUB_TOKEN" ]; then
    warn "GITHUB_TOKEN not set"
    log "To enable auto-commit:"
    log "  export GITHUB_TOKEN='your_github_token_here'"
else
    success "GITHUB_TOKEN is set"
fi

echo ""

##############################################################################
# 6. Verify Git Configuration
##############################################################################

log "Checking Git configuration..."

if git -C "$PROJECT_DIR" rev-parse --git-dir > /dev/null 2>&1; then
    success "Git repository found"
    
    CURRENT_BRANCH=$(git -C "$PROJECT_DIR" rev-parse --abbrev-ref HEAD)
    log "Current branch: $CURRENT_BRANCH"
    
    ORIGIN=$(git -C "$PROJECT_DIR" config --get remote.origin.url)
    log "Remote origin: $ORIGIN"
else
    warn "Not a git repository"
    log "Initialize with: git init && git remote add origin <url>"
fi

echo ""

##############################################################################
# 7. Verify Dependencies
##############################################################################

log "Verifying npm dependencies..."

if [ -d "$PROJECT_DIR/node_modules" ]; then
    success "node_modules directory exists"
else
    warn "node_modules not found - will install on first build"
fi

echo ""

##############################################################################
# 8. Create .env.local (if needed)
##############################################################################

log "Checking for environment configuration..."

if [ -f "$PROJECT_DIR/.env.local" ]; then
    success ".env.local exists"
else
    warn ".env.local not found"
    log "Creating .env.local template..."
    
    cat > "$PROJECT_DIR/.env.local.example" << 'ENV'
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Deployment
VERCEL_TOKEN=vercel_token_here
GITHUB_TOKEN=github_token_here
ENV
    
    success "Created .env.local.example"
    log "Copy and customize: cp .env.local.example .env.local"
fi

echo ""

##############################################################################
# 9. Test Dependencies
##############################################################################

log "Testing build process..."

cd "$PROJECT_DIR"

if npm ci > /dev/null 2>&1; then
    success "Dependencies installed successfully"
else
    warn "Dependency installation had issues"
fi

if npm run build > /dev/null 2>&1; then
    success "Build test passed"
else
    warn "Build test failed - may need to fix errors before deploying"
fi

echo ""

##############################################################################
# 10. Create Quick Start Guide
##############################################################################

cat > "$PROJECT_DIR/PIPELINE.md" << 'GUIDE'
# Continuous Deploy Pipeline

Auto build-deploy-test pipeline for synth-labs.

## Quick Start

### 1. Set Environment Variables
```bash
export VERCEL_TOKEN='your_vercel_token'
export GITHUB_TOKEN='your_github_token'  # Optional, for auto-commit
```

### 2. Start the Pipeline
```bash
./scripts/continuous-deploy.sh monitor
```

The pipeline will:
- ✓ Watch for file changes
- ✓ Build every 5 minutes (or on file change)
- ✓ Deploy to Vercel
- ✓ Run automated tests
- ✓ Commit changes (optional)

### 3. Monitor Status
```bash
./scripts/continuous-deploy.sh logs
./scripts/continuous-deploy.sh status
```

## Commands

```bash
# Run single cycle
./scripts/continuous-deploy.sh cycle

# Continuous monitoring (default)
./scripts/continuous-deploy.sh monitor --interval 120

# Build only
./scripts/continuous-deploy.sh build

# Deploy only
./scripts/continuous-deploy.sh deploy

# Test only
./scripts/continuous-deploy.sh test

# View logs
./scripts/continuous-deploy.sh logs

# View status
./scripts/continuous-deploy.sh status
```

## Configuration

- **Interval**: `--interval N` (default: 300s)
- **No auto-commit**: `--no-commit`
- **Environment**: Set `DEPLOY_INTERVAL` env var

## Logs Location

Logs stored in `./logs/`:
- `build-TIMESTAMP.log`
- `deploy-TIMESTAMP.log`
- `test-TIMESTAMP.log`
- `latest-deployment.txt`

## What Gets Tested

1. Homepage loads (GET /)
2. API health check (GET /api/health)
3. Stripe checkout endpoint (POST /api/checkout)
4. Static assets accessible

## Stopping the Pipeline

Press `Ctrl+C` to stop continuous monitoring.

## Troubleshooting

**Build fails:**
```bash
npm ci
npm run build
npm run lint
```

**Deploy fails:**
Check `VERCEL_TOKEN` is set correctly:
```bash
echo $VERCEL_TOKEN
```

**Tests fail:**
Check deployment URL:
```bash
cat logs/latest-deployment.txt
curl https://synth-labs-sigma.vercel.app/
```

**No changes detected:**
The pipeline monitors: `app/`, `lib/`, `public/`, `pages/`, `package.json`, `tsconfig.json`

Force a cycle:
```bash
./scripts/continuous-deploy.sh cycle
```

## Performance

- **Typical cycle time**: 2-3 minutes (build + deploy + test)
- **Check interval**: 5 minutes default (adjustable)
- **Minimal overhead**: Only runs on schedule or file change

GUIDE

success "Created PIPELINE.md"

echo ""
echo "═══════════════════════════════════════════════════════════"
log "✓ SETUP COMPLETE"
echo "═══════════════════════════════════════════════════════════"
echo ""
log "Next steps:"
log "1. Set environment variables:"
log "   export VERCEL_TOKEN='...'"
log "   export GITHUB_TOKEN='...'  (optional)"
log ""
log "2. Start the pipeline:"
log "   ./scripts/continuous-deploy.sh monitor"
log ""
log "3. View logs:"
log "   tail -f logs/build-*.log"
echo ""

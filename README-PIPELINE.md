# 🚀 Synth Labs: Continuous Deploy Pipeline

Automated CI/CD infrastructure for synth-labs. **Build, deploy, and test continuously.**

---

## 📖 Documentation Index

Start here based on what you need:

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **QUICKSTART.md** | Get running in 30 seconds | 2 min |
| **PIPELINE.md** | Complete reference guide | 10 min |
| **COMMANDS.md** | All commands & examples | 5 min |
| **SETUP_SUMMARY.md** | What was built & how it works | 8 min |

---

## ⚡ 30-Second Start

```bash
# 1. Get token from https://vercel.com/account/tokens
export VERCEL_TOKEN='vercel_...'

# 2. Start pipeline
cd /home/openclaw/.openclaw/workspace/synth-labs
./scripts/continuous-deploy.sh monitor

# 3. Done! Watch it in another terminal
./scripts/monitor-dashboard.sh
```

---

## 📦 What You Get

### 5 Production Scripts
- **continuous-deploy.sh** — Main pipeline (build → deploy → test)
- **monitor-dashboard.sh** — Real-time status dashboard  
- **setup-pipeline.sh** — Initial setup & validation
- **install-service.sh** — Systemd background service
- **verify-setup.sh** — Pre-flight system checks

### 4 Documentation Files
- **PIPELINE.md** — Full reference (9 KB)
- **QUICKSTART.md** — Quick setup (3 KB)
- **COMMANDS.md** — Command reference (6.6 KB)
- **SETUP_SUMMARY.md** — Architecture & features (8 KB)

---

## 🏗️ How It Works

```
File Change OR 5-min Timer
        ↓
    BUILD (30-60s)
    npm ci → lint → build
        ↓
    DEPLOY (1-2 min)
    Push to Vercel
        ↓
    TEST (10-30s)
    4 automated checks
        ↓
    LOG RESULTS
    
Total: ~2-3 min per cycle
```

**Monitors:** `app/`, `lib/`, `public/`, `pages/`, `package.json`, `tsconfig.json`

---

## 🎯 Common Tasks

### Start Continuous Pipeline
```bash
./scripts/continuous-deploy.sh monitor
```

### View Live Dashboard
```bash
./scripts/monitor-dashboard.sh
```

### Run Single Cycle
```bash
./scripts/continuous-deploy.sh cycle
```

### Watch Build Logs
```bash
tail -f logs/build-*.log
```

### Custom Interval (2 minutes)
```bash
./scripts/continuous-deploy.sh monitor --interval 120
```

### Install as Background Service
```bash
sudo ./scripts/install-service.sh
sudo systemctl start synth-labs-pipeline
```

---

## 📊 Test Coverage

Each cycle automatically tests:
1. Homepage loads (GET /)
2. API health (GET /api/health)
3. Stripe checkout (POST /api/checkout)
4. Static assets load

Tests run against your live deployment.

---

## 💾 Logs & Output

All logs saved to `logs/` with timestamps:

```
logs/
├── build-2024-01-15_14-23-45.log      ← Build & lint output
├── deploy-2024-01-15_14-25-30.log     ← Deployment status
├── test-2024-01-15_14-28-15.log       ← Test results
└── latest-deployment.txt                ← Current URL
```

View latest deployment:
```bash
cat logs/latest-deployment.txt
```

---

## 🔑 Configuration

### Required: Vercel Token
```bash
export VERCEL_TOKEN='vercel_...'
# Get from: https://vercel.com/account/tokens
```

### Optional: GitHub Token (Auto-Commit)
```bash
export GITHUB_TOKEN='ghp_...'
# Get from: https://github.com/settings/tokens
# Enables auto-commit of changes to main branch
```

### Optional: Custom Interval
```bash
export DEPLOY_INTERVAL=180  # 3 minutes (default: 300s)
```

---

## ✅ System Status

```
15/15 checks passed ✓

✓ Node.js installed
✓ npm available
✓ Git configured
✓ All scripts executable
✓ Project builds successfully
⚠ VERCEL_TOKEN not yet set (required)
⚠ GITHUB_TOKEN not set (optional)
```

Run verification anytime:
```bash
./scripts/verify-setup.sh
```

---

## 🔧 Troubleshooting

### Build Fails
```bash
npm ci
npm run lint
npm run build
```

### Scripts Not Executable
```bash
chmod +x scripts/*.sh
```

### Check Deployment
```bash
cat logs/latest-deployment.txt
curl https://synth-labs-sigma.vercel.app/
```

### Full Diagnostic
```bash
./scripts/verify-setup.sh
```

---

## 📚 Learn More

| Need | Resource |
|------|----------|
| 30-second setup | → QUICKSTART.md |
| Full reference | → PIPELINE.md |
| All commands | → COMMANDS.md |
| Architecture | → SETUP_SUMMARY.md |

---

## 🚀 Ready to Deploy?

```bash
export VERCEL_TOKEN='your_token'
./scripts/continuous-deploy.sh monitor
```

Monitor in another terminal:
```bash
./scripts/monitor-dashboard.sh
```

Edit your code and watch it deploy automatically! 🎉

---

## ℹ️ Key Features

✅ **File Change Detection** — Deploys immediately when code changes  
✅ **Interval-Based** — Also runs every 5 minutes  
✅ **Full Test Suite** — 4 automated checks per cycle  
✅ **Persistent Logs** — Complete history with timestamps  
✅ **Auto-Commit** — Optional GitHub integration  
✅ **Background Service** — Optional systemd integration  
✅ **Dashboard** — Real-time monitoring  
✅ **Fast Cycle** — ~2-3 minutes build → deploy → test  

---

## 📁 File Structure

```
/home/openclaw/.openclaw/workspace/synth-labs/
├── scripts/
│   ├── continuous-deploy.sh    ← Main pipeline
│   ├── monitor-dashboard.sh    ← Status dashboard
│   ├── setup-pipeline.sh       ← Setup script
│   ├── install-service.sh      ← Service installer
│   └── verify-setup.sh         ← Health check
├── logs/                       ← Auto-created
│   ├── build-*.log
│   ├── deploy-*.log
│   ├── test-*.log
│   └── latest-deployment.txt
├── PIPELINE.md                 ← Full docs
├── QUICKSTART.md               ← Quick setup
├── COMMANDS.md                 ← Command ref
├── SETUP_SUMMARY.md            ← Architecture
└── README-PIPELINE.md          ← This file
```

---

## 🎯 Next Steps

1. Read **QUICKSTART.md** for instant setup
2. Set your `VERCEL_TOKEN`
3. Run `./scripts/continuous-deploy.sh monitor`
4. Open another terminal and run `./scripts/monitor-dashboard.sh`
5. Edit code and watch it deploy!

---

Happy deploying! 🚀

# 🚀 Pipeline Quick Start

## 30-Second Setup

### Step 1: Get Your Vercel Token
```bash
# Go to https://vercel.com/account/tokens
# Create a new token
# Copy it
```

### Step 2: Set Token
```bash
export VERCEL_TOKEN='your_token_here'
```

### Step 3: Start Pipeline
```bash
cd /home/openclaw/.openclaw/workspace/synth-labs
./scripts/continuous-deploy.sh monitor
```

✅ **Done!** Pipeline is now running.

---

## What's Happening?

The pipeline is:
- 📁 Watching your code files for changes
- ⏰ Running every 5 minutes (or instantly when files change)
- 🔨 Building your Next.js app
- 🚀 Deploying to Vercel
- ✅ Running 4 automated tests
- 💾 Logging everything

---

## Monitor Progress

### Terminal 2 (Live Dashboard)
```bash
cd /home/openclaw/.openclaw/workspace/synth-labs
./scripts/monitor-dashboard.sh
```

Shows:
- ✅ Current status (Build/Deploy/Test)
- 📊 How many cycles completed
- 🌐 Latest deployment URL
- 📝 Last 5 log lines
- ⌨️ Quick commands

Refreshes every 5 seconds.

---

## View Logs

### Real-Time Build Log
```bash
tail -f /home/openclaw/.openclaw/workspace/synth-labs/logs/build-*.log
```

### All Recent Logs
```bash
ls -lt /home/openclaw/.openclaw/workspace/synth-labs/logs/
```

### Latest Deployment URL
```bash
cat /home/openclaw/.openclaw/workspace/synth-labs/logs/latest-deployment.txt
```

---

## Manual Commands

### Run Single Cycle
```bash
./scripts/continuous-deploy.sh cycle
```

### Just Build
```bash
./scripts/continuous-deploy.sh build
```

### Check Status
```bash
./scripts/continuous-deploy.sh status
```

### Get Help
```bash
./scripts/continuous-deploy.sh help
```

---

## Stop Pipeline

Press `Ctrl+C` in the terminal running `monitor`.

---

## Optional: GitHub Auto-Commit

If you want the pipeline to auto-commit changes:

1. Get GitHub token: https://github.com/settings/tokens
2. Set it:
```bash
export GITHUB_TOKEN='ghp_...'
```

Changes now auto-commit during deployment!

---

## Optional: Background Service

Run pipeline as a systemd service (survives reboot):

```bash
# Install service (requires sudo)
sudo ./scripts/install-service.sh

# Edit config and add tokens
nano .env.pipeline

# Start it
sudo systemctl start synth-labs-pipeline

# Monitor it
sudo journalctl -u synth-labs-pipeline -f
```

---

## Troubleshooting

### "No such file or directory"
Make sure you're in the right directory:
```bash
cd /home/openclaw/.openclaw/workspace/synth-labs
```

### "VERCEL_TOKEN not set"
Set your token:
```bash
export VERCEL_TOKEN='vercel_...'
```

### Scripts not executable
Fix permissions:
```bash
chmod +x ./scripts/*.sh
```

### Build fails
Check the build log:
```bash
tail -n 50 logs/build-*.log
```

Or build manually:
```bash
npm ci
npm run build
```

---

## Full Documentation

See `PIPELINE.md` for complete reference.

---

## Need Help?

**Command reference:**
```bash
./scripts/continuous-deploy.sh help
```

**Setup check:**
```bash
./scripts/verify-setup.sh
```

**Dashboard:**
```bash
./scripts/monitor-dashboard.sh
```

---

That's it! Happy deploying! 🎉

# 🚀 Continuous Build → Deploy → Test Pipeline

Automated CI/CD for synth-labs. Builds, deploys to Vercel, and runs tests continuously.

---

## Quick Start (30 seconds)

### 1️⃣ Set Your Tokens
```bash
export VERCEL_TOKEN='your_vercel_token_here'
export GITHUB_TOKEN='your_github_token_here'  # Optional
```

### 2️⃣ Start Pipeline
```bash
cd synth-labs
./scripts/continuous-deploy.sh monitor
```

**That's it!** The pipeline now:
- ✅ Watches for file changes
- ✅ Builds every 5 minutes
- ✅ Deploys to Vercel
- ✅ Runs automated tests
- ✅ Commits changes (if GITHUB_TOKEN set)

---

## Commands

### Main Pipeline
```bash
# Continuous monitoring (watches files, runs on interval)
./scripts/continuous-deploy.sh monitor

# Run single cycle
./scripts/continuous-deploy.sh cycle

# Run with custom interval (every 2 minutes)
./scripts/continuous-deploy.sh monitor --interval 120
```

### Individual Steps
```bash
# Build only
./scripts/continuous-deploy.sh build

# Deploy only
./scripts/continuous-deploy.sh deploy

# Test only
./scripts/continuous-deploy.sh test
```

### Status & Logs
```bash
# Live monitoring dashboard
./scripts/monitor-dashboard.sh

# View logs
./scripts/continuous-deploy.sh logs

# View pipeline status
./scripts/continuous-deploy.sh status

# Follow build logs
tail -f logs/build-*.log
```

---

## Architecture

### 3-Stage Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   BUILD     │────→│   DEPLOY    │────→│    TEST     │
│             │     │             │     │             │
│ • Lint      │     │ • Vercel    │     │ • Homepage  │
│ • Install   │     │ • Git push  │     │ • API calls │
│ • Compile   │     │             │     │ • Stripe    │
└─────────────┘     └─────────────┘     └─────────────┘
       ↓                    ↓                    ↓
    logs/             logs/                logs/
   build-*.log      deploy-*.log         test-*.log
```

### Continuous Monitoring

```
File Change?  →  Run Cycle  →  5 min elapsed?  →  Run Cycle
     ↓                ↓              ↓
  (immediate)    (build+deploy+test)    (continue watch)
```

---

## Configuration

### Environment Variables

```bash
# REQUIRED: Vercel deployment token
# Get from: https://vercel.com/account/tokens
export VERCEL_TOKEN='vercel_...'

# OPTIONAL: GitHub token for auto-commit
# Get from: https://github.com/settings/tokens
export GITHUB_TOKEN='ghp_...'

# OPTIONAL: Custom cycle interval (seconds)
export DEPLOY_INTERVAL=300  # 5 minutes (default)
```

### Systemd Service (Optional)

Run as a background service:

```bash
# Install service (requires sudo)
sudo ./scripts/install-service.sh

# Edit config
nano .env.pipeline

# Start service
sudo systemctl start synth-labs-pipeline

# View logs
sudo journalctl -u synth-labs-pipeline -f

# Auto-start on reboot
sudo systemctl enable synth-labs-pipeline
```

---

## What Gets Tested

### Automated Tests

1. **Homepage Load**
   - `GET /` returns 200 OK
   - HTML renders

2. **API Health**
   - `GET /api/health` responds
   - Server is ready

3. **Stripe Integration**
   - `POST /api/checkout` accepts requests
   - Creates valid checkout sessions

4. **Static Assets**
   - CSS, JS, images load correctly
   - Build artifacts are served

### Test Output

```
[15:32:01] Test 1: GET / (Homepage)
✓ Homepage returns 200 OK

[15:32:02] Test 2: GET /api/health
✓ API health check: 200

[15:32:03] Test 3: POST /api/checkout (Stripe integration)
✓ Stripe endpoint responding

[15:32:04] Test 4: Checking static assets
✓ Static assets accessible

[15:32:05] Test suite complete
```

---

## Logs

### Location

All logs saved to `./logs/` with timestamps:

```
logs/
├── build-2024-01-15_14-23-45.log      # Build output
├── deploy-2024-01-15_14-25-30.log     # Deployment output
├── test-2024-01-15_14-28-15.log       # Test results
└── latest-deployment.txt               # Latest deployment URL
```

### View Logs

```bash
# Watch build in real-time
tail -f logs/build-*.log

# View last deployment
cat logs/latest-deployment.txt

# See all logs with timestamps
ls -lt logs/

# View specific cycle
cat logs/test-2024-01-15_14-28-15.log
```

---

## Monitoring Dashboard

Real-time status display:

```bash
./scripts/monitor-dashboard.sh
```

Shows:
- ✅ Current pipeline status (Build/Deploy/Test)
- 📊 Metrics (cycles, last run, current time)
- 🌐 Deployment URL
- 📝 Last 5 lines of build log
- 📁 Recent files
- ⌨️ Quick commands

Refresh every 5 seconds (adjustable):
```bash
./scripts/monitor-dashboard.sh 2    # Refresh every 2 seconds
./scripts/monitor-dashboard.sh 10   # Refresh every 10 seconds
```

---

## Performance

| Metric | Time |
|--------|------|
| Build | 30-60s |
| Deploy | 1-2 min |
| Tests | 10-30s |
| **Total Cycle** | **2-3 min** |
| Check Interval | 5 min (default) |

*Times vary based on project size and network.*

---

## Troubleshooting

### Build Fails

Check for errors:
```bash
cd synth-labs
npm ci
npm run lint
npm run build
```

Review log:
```bash
tail -n 50 logs/build-*.log
```

### Deploy Fails

Verify token:
```bash
echo $VERCEL_TOKEN
# Should output: vercel_...
```

Manual test:
```bash
npx vercel deploy --prod --token=$VERCEL_TOKEN --confirm
```

### Tests Fail

Check deployment:
```bash
cat logs/latest-deployment.txt
# Visit the URL in a browser
```

Manual test:
```bash
curl https://synth-labs-sigma.vercel.app/
```

### No Changes Detected

Pipeline monitors:
- `app/`
- `lib/`
- `public/`
- `pages/`
- `package.json`
- `tsconfig.json`

Force a cycle:
```bash
./scripts/continuous-deploy.sh cycle
```

### Service Won't Start

Check logs:
```bash
sudo journalctl -u synth-labs-pipeline -n 50
```

Verify config:
```bash
cat .env.pipeline
# Check VERCEL_TOKEN is set
```

---

## Advanced Usage

### Custom Intervals

Run every 2 minutes:
```bash
./scripts/continuous-deploy.sh monitor --interval 120
```

Or via environment:
```bash
DEPLOY_INTERVAL=120 ./scripts/continuous-deploy.sh monitor
```

### Disable Auto-Commit

```bash
./scripts/continuous-deploy.sh monitor --no-commit
```

### Check Specific Status

```bash
./scripts/continuous-deploy.sh status
./scripts/continuous-deploy.sh logs
```

### Integrate with systemd

```bash
sudo ./scripts/install-service.sh
sudo systemctl start synth-labs-pipeline
sudo systemctl status synth-labs-pipeline
sudo journalctl -u synth-labs-pipeline -f
```

---

## Integration with Git

The pipeline automatically:

1. **Commits changes** (if `GITHUB_TOKEN` set)
2. **Pushes to `main` branch**
3. **Tracks deployment history** in logs

Commit format:
```
Auto-deploy: 2024-01-15 14:28:15
```

---

## CI/CD vs Pipeline

| Aspect | CI/CD (GitHub) | Pipeline (Local) |
|--------|---|---|
| Trigger | Git push | File change / interval |
| Speed | Slower (queued) | Fast (immediate) |
| Cost | Free tier limited | Local only |
| Control | Cloud | Full control |
| Use case | Shared team | Personal development |

**Recommendation:** Use Pipeline for rapid local iteration, CI/CD for production gates.

---

## Security Notes

⚠️ **Token Safety:**
- Never commit tokens to git
- Use `.env` files (in `.gitignore`)
- Rotate tokens regularly
- For shared machines, use systemd service with restricted permissions

Protected:
```bash
echo "VERCEL_TOKEN=..." > .env.pipeline
echo ".env.pipeline" >> .gitignore
```

---

## Examples

### Example 1: Rapid Development
```bash
# Terminal 1: Watch code changes
./scripts/continuous-deploy.sh monitor --interval 60

# Terminal 2: View live updates
./scripts/monitor-dashboard.sh
```

### Example 2: Deployment Check
```bash
# Check last deployment
./scripts/continuous-deploy.sh status

# View deployment URL
cat logs/latest-deployment.txt

# Test manually
curl https://synth-labs-sigma.vercel.app/
```

### Example 3: Background Service
```bash
# Install as systemd service
sudo ./scripts/install-service.sh

# Start and forget
sudo systemctl start synth-labs-pipeline

# Monitor from another terminal
sudo journalctl -u synth-labs-pipeline -f
```

---

## Project Layout

```
synth-labs/
├── scripts/
│   ├── continuous-deploy.sh    ← Main pipeline
│   ├── setup-pipeline.sh       ← First-time setup
│   ├── install-service.sh      ← Systemd service
│   └── monitor-dashboard.sh    ← Live dashboard
├── logs/
│   ├── build-*.log
│   ├── deploy-*.log
│   ├── test-*.log
│   └── latest-deployment.txt
├── app/                        ← Monitored for changes
├── pages/                      ← Monitored for changes
├── public/                     ← Monitored for changes
├── .env.pipeline               ← Service config
├── .env.local                  ← Local secrets
└── PIPELINE.md                 ← This file
```

---

## Getting Help

```bash
./scripts/continuous-deploy.sh help
./scripts/monitor-dashboard.sh --help
./scripts/setup-pipeline.sh
```

---

## Summary

✅ **Set tokens** → **Run pipeline** → **Deploy continuously**

```bash
export VERCEL_TOKEN='...'
export GITHUB_TOKEN='...'
./scripts/continuous-deploy.sh monitor
```

Happy deploying! 🚀

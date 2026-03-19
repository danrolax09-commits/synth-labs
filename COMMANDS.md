# Pipeline Command Reference

All commands run from: `/home/openclaw/.openclaw/workspace/synth-labs/`

---

## Main Pipeline

### Start Continuous Pipeline
```bash
./scripts/continuous-deploy.sh monitor
```
- Watches files and 5-minute interval
- Builds, deploys, tests continuously
- Press Ctrl+C to stop

### Custom Interval
```bash
./scripts/continuous-deploy.sh monitor --interval 120
```
Run cycle every 120 seconds (default: 300s)

### No Auto-Commit
```bash
./scripts/continuous-deploy.sh monitor --no-commit
```
Disable automatic GitHub commits

### Run Single Cycle
```bash
./scripts/continuous-deploy.sh cycle
```
Build, deploy, and test once (no watching)

---

## Individual Steps

### Build Only
```bash
./scripts/continuous-deploy.sh build
```
Lint and compile Next.js

### Deploy Only
```bash
./scripts/continuous-deploy.sh deploy
```
Push to Vercel

### Test Only
```bash
./scripts/continuous-deploy.sh test
```
Run 4 automated test checks

---

## Status & Monitoring

### Live Dashboard
```bash
./scripts/monitor-dashboard.sh
```
Real-time status with refresh every 5 seconds

### Custom Refresh Rate
```bash
./scripts/monitor-dashboard.sh 2    # Every 2 seconds
./scripts/monitor-dashboard.sh 10   # Every 10 seconds
```

### View Pipeline Status
```bash
./scripts/continuous-deploy.sh status
```
Show latest deployment and log locations

### View Recent Logs
```bash
./scripts/continuous-deploy.sh logs
```
List 10 most recent log files

### Watch Build in Real-Time
```bash
tail -f logs/build-*.log
```

### Watch Deploy in Real-Time
```bash
tail -f logs/deploy-*.log
```

### Watch Tests in Real-Time
```bash
tail -f logs/test-*.log
```

---

## Help & Setup

### Pipeline Help
```bash
./scripts/continuous-deploy.sh help
```
Show all available commands

### Dashboard Help
```bash
./scripts/monitor-dashboard.sh --help
```

### Verify Setup
```bash
./scripts/verify-setup.sh
```
Run 15-point system check

### Initial Setup
```bash
./scripts/setup-pipeline.sh
```
Verify prerequisites and create directories

---

## Systemd Service (Background)

### Install as Service
```bash
sudo ./scripts/install-service.sh
```
Create systemd service unit

### Start Service
```bash
sudo systemctl start synth-labs-pipeline
```

### Stop Service
```bash
sudo systemctl stop synth-labs-pipeline
```

### Service Status
```bash
sudo systemctl status synth-labs-pipeline
```

### Auto-Start on Reboot
```bash
sudo systemctl enable synth-labs-pipeline
```

### Watch Service Logs
```bash
sudo journalctl -u synth-labs-pipeline -f
```

### Disable Service
```bash
sudo systemctl disable synth-labs-pipeline
```

---

## Configuration

### Set Vercel Token (Required)
```bash
export VERCEL_TOKEN='vercel_...'
```
Get from: https://vercel.com/account/tokens

### Set GitHub Token (Optional)
```bash
export GITHUB_TOKEN='ghp_...'
```
Get from: https://github.com/settings/tokens
Enables auto-commit of changes

### Set Custom Interval
```bash
export DEPLOY_INTERVAL=180  # 3 minutes
```

### View Current Configuration
```bash
echo $VERCEL_TOKEN
echo $GITHUB_TOKEN
echo $DEPLOY_INTERVAL
```

---

## Manual Build & Test

### Build from Scratch
```bash
npm ci
npm run lint
npm run build
npm start
```

### Test Build Locally
```bash
npm run build
npm run start
```
Then visit: http://localhost:3000

### Manual Vercel Deploy
```bash
npx vercel deploy --prod --confirm
```

### Manual Test
```bash
curl https://synth-labs-sigma.vercel.app/
```

---

## Log Management

### View All Logs
```bash
ls -lt logs/
```

### Show Latest Deployment URL
```bash
cat logs/latest-deployment.txt
```

### View Specific Cycle
```bash
cat logs/test-2024-01-15_14-28-15.log
```

### Count Build Cycles
```bash
ls -1 logs/test-*.log | wc -l
```

### Total Log Size
```bash
du -sh logs/
```

### Clean Old Logs (Keep Last 10)
```bash
ls -1 logs/build-*.log | head -n -10 | xargs rm -f
ls -1 logs/deploy-*.log | head -n -10 | xargs rm -f
ls -1 logs/test-*.log | head -n -10 | xargs rm -f
```

---

## Git Operations

### Check Git Status
```bash
git status
```

### View Deployment Commits
```bash
git log --oneline | head -10
```

### Amend Last Commit
```bash
git add .
git commit --amend --no-edit
```

### Push Latest Commit
```bash
git push origin main
```

---

## Troubleshooting

### Make Scripts Executable
```bash
chmod +x scripts/*.sh
```

### Check Node Version
```bash
node -v
npm -v
```

### Verify Project Structure
```bash
ls -la | grep -E "package.json|next.config|app|pages"
```

### Test npm Access
```bash
npm list | head -20
```

### Test Vercel Token
```bash
curl -H "Authorization: Bearer $VERCEL_TOKEN" \
  https://api.vercel.com/v9/projects
```

### Check Latest Error
```bash
tail -n 100 logs/build-*.log | grep -i error
```

### Run Full Diagnostic
```bash
./scripts/verify-setup.sh
```

---

## Common Workflows

### Quick Test Cycle
```bash
./scripts/continuous-deploy.sh cycle
```

### Continuous Development
```bash
# Terminal 1
./scripts/continuous-deploy.sh monitor

# Terminal 2
./scripts/monitor-dashboard.sh
```

### Install as Background Service
```bash
sudo ./scripts/install-service.sh
nano .env.pipeline  # Add tokens
sudo systemctl start synth-labs-pipeline
```

### Debug Build Failure
```bash
npm ci
npm run lint
npm run build    # See error
```

### Check Deployment Health
```bash
./scripts/continuous-deploy.sh test
```

### Manual Full Cycle
```bash
./scripts/continuous-deploy.sh build && \
./scripts/continuous-deploy.sh deploy && \
./scripts/continuous-deploy.sh test
```

---

## Environment Setup (Linux/Mac)

### Persistent Tokens (Add to ~/.bashrc or ~/.zshrc)
```bash
export VERCEL_TOKEN='vercel_...'
export GITHUB_TOKEN='ghp_...'
```

Then reload:
```bash
source ~/.bashrc    # or ~/.zshrc
```

### Check Tokens Are Set
```bash
echo "VERCEL: $VERCEL_TOKEN"
echo "GITHUB: $GITHUB_TOKEN"
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start pipeline | `./scripts/continuous-deploy.sh monitor` |
| View dashboard | `./scripts/monitor-dashboard.sh` |
| Run single cycle | `./scripts/continuous-deploy.sh cycle` |
| Check status | `./scripts/continuous-deploy.sh status` |
| View logs | `tail -f logs/build-*.log` |
| Verify setup | `./scripts/verify-setup.sh` |
| Install service | `sudo ./scripts/install-service.sh` |
| Set token | `export VERCEL_TOKEN='...'` |
| Get help | `./scripts/continuous-deploy.sh help` |

---

## More Information

- **Full guide:** See `PIPELINE.md`
- **Quick start:** See `QUICKSTART.md`
- **Setup summary:** See `SETUP_SUMMARY.md`

---

**Ready to deploy?**

```bash
export VERCEL_TOKEN='your_token'
./scripts/continuous-deploy.sh monitor
```

🚀

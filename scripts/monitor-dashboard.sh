#!/bin/bash

##############################################################################
# DASHBOARD: Real-time monitoring of pipeline status
##############################################################################

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_DIR="$PROJECT_DIR/logs"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
WHITE='\033[1;37m'
GRAY='\033[0;37m'
NC='\033[0m'

##############################################################################
# HELPERS
##############################################################################

clear_screen() {
    clear
}

format_time() {
    local seconds=$1
    if [ "$seconds" -lt 60 ]; then
        echo "${seconds}s"
    elif [ "$seconds" -lt 3600 ]; then
        echo "$((seconds / 60))m $((seconds % 60))s"
    else
        echo "$((seconds / 3600))h $((($seconds % 3600) / 60))m"
    fi
}

format_size() {
    local bytes=$1
    if [ "$bytes" -lt 1024 ]; then
        echo "${bytes}B"
    elif [ "$bytes" -lt 1048576 ]; then
        echo "$((bytes / 1024))KB"
    else
        echo "$((bytes / 1048576))MB"
    fi
}

get_status_color() {
    local status=$1
    case "$status" in
        "PASSED") echo -e "${GREEN}✓${NC}" ;;
        "FAILED") echo -e "${RED}✗${NC}" ;;
        "RUNNING") echo -e "${YELLOW}⟳${NC}" ;;
        "PENDING") echo -e "${GRAY}○${NC}" ;;
        *) echo -e "${GRAY}?${NC}" ;;
    esac
}

##############################################################################
# DATA COLLECTION
##############################################################################

get_latest_build() {
    find "$LOG_DIR" -name "build-*.log" -type f | sort -r | head -1
}

get_latest_deploy() {
    find "$LOG_DIR" -name "deploy-*.log" -type f | sort -r | head -1
}

get_latest_test() {
    find "$LOG_DIR" -name "test-*.log" -type f | sort -r | head -1
}

get_build_status() {
    local log=$(get_latest_build)
    if [ -z "$log" ]; then
        echo "PENDING"
        return
    fi
    
    if grep -q "Build complete" "$log"; then
        echo "PASSED"
    elif grep -q "error" "$log" || grep -q "Error" "$log"; then
        echo "FAILED"
    else
        echo "RUNNING"
    fi
}

get_deploy_status() {
    local log=$(get_latest_deploy)
    if [ -z "$log" ]; then
        echo "PENDING"
        return
    fi
    
    if grep -q "Deployment complete\|Already deployed" "$log"; then
        echo "PASSED"
    elif grep -q "error\|Error\|failed\|Failed" "$log"; then
        echo "FAILED"
    else
        echo "RUNNING"
    fi
}

get_test_status() {
    local log=$(get_latest_test)
    if [ -z "$log" ]; then
        echo "PENDING"
        return
    fi
    
    if grep -q "Test suite complete" "$log"; then
        echo "PASSED"
    elif grep -q "error\|Error\|failed\|Failed" "$log"; then
        echo "FAILED"
    else
        echo "RUNNING"
    fi
}

get_last_cycle_time() {
    local log=$(get_latest_test)
    if [ -z "$log" ]; then
        echo "—"
        return
    fi
    
    local mtime=$(stat -f%m "$log" 2>/dev/null || stat -c%Y "$log" 2>/dev/null)
    local now=$(date +%s)
    local diff=$((now - mtime))
    format_time "$diff"
}

get_cycle_count() {
    local count=$(find "$LOG_DIR" -name "test-*.log" -type f | wc -l)
    echo "$count"
}

get_deployment_url() {
    if [ -f "$LOG_DIR/latest-deployment.txt" ]; then
        cat "$LOG_DIR/latest-deployment.txt"
    else
        echo "Not yet deployed"
    fi
}

##############################################################################
# RENDER DASHBOARD
##############################################################################

render_header() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}${WHITE}        SYNTH LABS CONTINUOUS DEPLOY PIPELINE MONITOR       ${NC}${CYAN}║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

render_pipeline_status() {
    local build_status=$(get_build_status)
    local deploy_status=$(get_deploy_status)
    local test_status=$(get_test_status)
    
    echo -e "${MAGENTA}PIPELINE STATUS${NC}"
    echo "─────────────────────────────────────────────────────────────"
    
    local build_icon=$(get_status_color "$build_status")
    local deploy_icon=$(get_status_color "$deploy_status")
    local test_icon=$(get_status_color "$test_status")
    
    echo -e "  Build:  $build_icon  ${WHITE}$build_status${NC}"
    echo -e "  Deploy: $deploy_icon  ${WHITE}$deploy_status${NC}"
    echo -e "  Test:   $test_icon  ${WHITE}$test_status${NC}"
    echo ""
}

render_metrics() {
    echo -e "${MAGENTA}METRICS${NC}"
    echo "─────────────────────────────────────────────────────────────"
    echo -e "  Cycles completed:  ${CYAN}$(get_cycle_count)${NC}"
    echo -e "  Last cycle:        ${CYAN}$(get_last_cycle_time)${NC} ago"
    echo -e "  Current time:      ${CYAN}$(date '+%H:%M:%S')${NC}"
    echo ""
}

render_deployment() {
    echo -e "${MAGENTA}DEPLOYMENT${NC}"
    echo "─────────────────────────────────────────────────────────────"
    echo -e "  URL: ${CYAN}$(get_deployment_url)${NC}"
    echo ""
}

render_latest_logs() {
    echo -e "${MAGENTA}LATEST BUILD LOG (Last 5 lines)${NC}"
    echo "─────────────────────────────────────────────────────────────"
    
    local latest=$(get_latest_build)
    if [ -n "$latest" ]; then
        tail -n 5 "$latest" | sed 's/^/  /'
    else
        echo "  (No logs yet)"
    fi
    echo ""
}

render_file_info() {
    echo -e "${MAGENTA}RECENT FILES${NC}"
    echo "─────────────────────────────────────────────────────────────"
    
    if [ -d "$LOG_DIR" ] && [ "$(ls -A $LOG_DIR)" ]; then
        ls -lt "$LOG_DIR" | head -5 | tail -n +2 | while read line; do
            local size=$(echo "$line" | awk '{print $5}')
            local name=$(echo "$line" | awk '{print $NF}')
            printf "  %-30s %s\n" "$name" "$(format_size $size)"
        done
    else
        echo "  (No logs yet)"
    fi
    echo ""
}

render_commands() {
    echo -e "${MAGENTA}QUICK COMMANDS${NC}"
    echo "─────────────────────────────────────────────────────────────"
    echo -e "  ${GRAY}View full logs:${NC}     tail -f $LOG_DIR/build-*.log"
    echo -e "  ${GRAY}Run single cycle:${NC}   ./scripts/continuous-deploy.sh cycle"
    echo -e "  ${GRAY}Stop monitoring:${NC}    Press Ctrl+C or kill process"
    echo -e "  ${GRAY}Check service status:${NC} systemctl status synth-labs-pipeline"
    echo ""
}

render_footer() {
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GRAY}Last updated: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo -e "${GRAY}Refresh: $(date) — Press Ctrl+C to exit${NC}"
    echo ""
}

##############################################################################
# MAIN LOOP
##############################################################################

main() {
    local refresh_interval="${1:-5}"
    
    while true; do
        clear_screen
        render_header
        render_pipeline_status
        render_metrics
        render_deployment
        render_latest_logs
        render_file_info
        render_commands
        render_footer
        
        sleep "$refresh_interval"
    done
}

##############################################################################
# CLI
##############################################################################

case "${1:-}" in
    --help|help|-h)
        echo "Dashboard: Real-time pipeline monitoring"
        echo ""
        echo "Usage: $0 [interval]"
        echo ""
        echo "Examples:"
        echo "  $0           # Refresh every 5 seconds (default)"
        echo "  $0 2         # Refresh every 2 seconds"
        echo "  $0 10        # Refresh every 10 seconds"
        exit 0
        ;;
esac

main "${1:-5}"

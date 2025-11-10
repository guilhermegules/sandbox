#!/bin/bash

LOG_DIR="monitoring-system"
mkdir -p $LOG_DIR

sudo grep -E "fail(ed)?|error|denied|unauthorized" /var/log/syslog | awk '{print $1, $2, $3, $5, $6, $7}' > $LOG_DIR/monitoring-logs.txt


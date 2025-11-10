#!/bin/bash

LOG_DIR="monitoring-system"
mkdir -p $LOG_DIR

function logs_monitor() {
	sudo grep -E "fail(ed)?|error|denied|unauthorized" /var/log/syslog | awk '{print $1, $2, $3, $5, $6, $7}' > $LOG_DIR/monitoring-logs.txt
	sudo grep -E "fail(ed)?|error|denied|unauthorized" /var/log/auth.log | awk '{print $1, $2, $3, $5, $6, $7}' > $LOG_DIR/monitoring-logs-auth.txt
}

function network_monitor() {
	if ping -c 1 8.8.8.8 > /dev/null; then
		echo "$(date): Online" >> $LOG_DIR/monitoring-network.txt
	else
		echo "$(date): Offline" >> $LOG_DIR/monitoring-network.txt
	fi

	if curl -s --head https://www.alura.com.br/ | grep "HTTP/2 200" > /dev/null; then
		echo "$(date): Connected with Alura" >> $LOG_DIR/monitoring-network.txt
	else 
		echo "$(date): Alura Offline" >> $LOG_DIR/monitoring-network.txt
	fi
}

function disk_monitor() {
	echo "$(date)" >> $LOG_DIR/disk-monitoring.txt
	df -h | awk '$5+0 > 50 {print $1 " is with " $5 " of usage."}' >> $LOG_DIR/disk-monitoring.txt
	echo "Disk usage on the home directory" >> $LOG_DIR/disk-monitoring.txt
	du -sh /home/guilherme.moreira >> $LOG_DIR/disk-monitoring.txt
}

function hardware_monitor() {
	echo "$(date)" >> $LOG_DIR/hardware-monitoring.txt
	free -h | grep Mem | awk '{print "RAM mem. Total: " $2 ", Usage: " $3 ", Free: " $4}' >> $LOG_DIR/hardware-monitoring.txt
	top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print "CPU usage: " 100 - $1 "%"}' >> $LOG_DIR/hardware-monitoring.txt
	echo "I/O operations" >> $LOG_DIR/hardware-monitoring.txt
	iostat | grep -E "Device|^nvme|^sdb|^sdc" | awk '{print $1, $2, $3, $4}' >> $LOG_DIR/hardware-monitoring.txt
}

function main() {
	logs_monitor
	network_monitor
	disk_monitor
	hardware_monitor
}

main

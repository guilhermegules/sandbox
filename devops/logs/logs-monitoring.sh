#!/bin/bash

LOG_DIR="./"

echo "Checking files in the directory $LOG_DIR"

# IFS = Internal Field Separator
find $LOG_DIR -name "*.log" -print0 | while IFS= read -r -d '' file; do

	echo "$file found, and will be processed..."

	grep "ERROR" $file > "${file}.filtered"
	grep "SENSITIVE_DATA" $file >> "${file}.filtered"
	sed -i 's/User password is .*/User password is REDACTED/g' "${file}.filtered"
	sed -i 's/User password reset request with token .*/User password reset request with token REDACTED/g' "${file}.filtered"
        sed -i 's/API key leaked: .*/API key leaked: REDACTED/g' "${file}.filtered"
        sed -i 's/User credit card last four digits: .*/User credit card last four digits: REDACTED/g' "${file}.filtered"
        sed -i 's/User session initiated with token: .*/User session initiated with token: REDACTED/g' "${file}.filtered"

	sort "${file}.filtered" -o "${file}.filtered"

	uniq "${file}.filtered" > "${file}.unique"

	words=$(wc -w < "${file}.unique")
	lines=$(wc -l < "${file}.unique")
	filename=$(basename "${file}.unique")

	echo "File: ${filename}" >> "log_stats.txt"
	echo "Lines: ${lines}" >> "log_stats.txt"
	echo "Words: ${words}" >> "log_stats.txt"
	echo "---------------------------------------" >> "log_stats.txt"

	echo "$file processed."
done

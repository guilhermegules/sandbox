package com.example.quartz.job;

import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicInteger;

@DisallowConcurrentExecution
@PersistJobDataAfterExecution
public class InventoryReportJob implements Job {

    private static final Logger log = LoggerFactory.getLogger(InventoryReportJob.class);
    public static final AtomicInteger EXECUTION_COUNT = new AtomicInteger(0);

    @Override
    public void execute(JobExecutionContext context) {
        JobDataMap dataMap = context.getMergedJobDataMap();
        String reportType = dataMap.getString("reportType");
        int count = EXECUTION_COUNT.incrementAndGet();

        log.info("Executing InventoryReportJob #{} for reportType='{}' at fireTime={}",
                count, reportType, context.getFireTime());
    }
}

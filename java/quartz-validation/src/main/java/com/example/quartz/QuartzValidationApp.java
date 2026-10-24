package com.example.quartz;

import com.example.quartz.job.InventoryReportJob;
import com.example.quartz.scheduler.QuartzSchedulerManager;

public class QuartzValidationApp {

    public static void main(String[] args) throws Exception {
        System.out.println("=== Quartz Enterprise Scheduler Validation Showcase ===");

        try (QuartzSchedulerManager manager = new QuartzSchedulerManager()) {
            manager.start();
            System.out.println("\n[1] Scheduler started successfully.");

            // Schedule a recurring job that fires every 500ms for 3 repetitions (4 executions total)
            System.out.println("[2] Scheduling SimpleTrigger job (fire 4 times at 500ms intervals)...");
            manager.scheduleIntervalJob("rapidInventoryJob", "reports", "HOURLY_INVENTORY", 500, 3);

            // Wait 2.5 seconds to let the jobs execute
            Thread.sleep(2500);

            System.out.println("\n[3] Execution Results:");
            System.out.printf("  Total Job Executions: %d%n", InventoryReportJob.EXECUTION_COUNT.get());
            System.out.printf("  Listener ToBeExecuted notifications: %d%n", manager.getAuditJobListener().getToBeExecutedCount());
            System.out.printf("  Listener WasExecuted notifications: %d%n", manager.getAuditJobListener().getWasExecutedCount());

            System.out.println("\n[4] Shutting down Quartz gracefully...");
        }
        System.out.println("=== Quartz Showcase Completed ===");
    }
}

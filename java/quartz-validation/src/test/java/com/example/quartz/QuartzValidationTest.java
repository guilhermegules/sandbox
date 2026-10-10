package com.example.quartz;

import com.example.quartz.job.InventoryReportJob;
import com.example.quartz.scheduler.QuartzSchedulerManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.quartz.JobKey;

import static org.assertj.core.api.Assertions.assertThat;

class QuartzValidationTest {

    private QuartzSchedulerManager manager;

    @BeforeEach
    void setUp() throws Exception {
        InventoryReportJob.EXECUTION_COUNT.set(0);
        manager = new QuartzSchedulerManager();
        manager.start();
    }

    @AfterEach
    void tearDown() throws Exception {
        if (manager != null) {
            manager.close();
        }
    }

    @Test
    @DisplayName("Quartz should schedule and fire jobs using SimpleTrigger and record listener metrics")
    void shouldExecuteSimpleTriggerJob() throws Exception {
        // Schedule job to fire immediately, then 2 repeats at 100ms intervals (3 total)
        manager.scheduleIntervalJob("testSimpleJob", "testGroup", "DAILY_SUMMARY", 100, 2);

        // Wait for executions to finish
        Thread.sleep(600);

        assertThat(InventoryReportJob.EXECUTION_COUNT.get()).isGreaterThanOrEqualTo(3);
        assertThat(manager.getAuditJobListener().getToBeExecutedCount()).isGreaterThanOrEqualTo(3);
        assertThat(manager.getAuditJobListener().getWasExecutedCount()).isGreaterThanOrEqualTo(3);
    }

    @Test
    @DisplayName("Quartz scheduler should allow job pause, resume, and check metadata")
    void shouldManageJobLifecycle() throws Exception {
        manager.scheduleIntervalJob("pausableJob", "testGroup", "PAUSE_TEST", 200, 10);

        JobKey key = new JobKey("pausableJob", "testGroup");
        assertThat(manager.getScheduler().checkExists(key)).isTrue();

        manager.getScheduler().pauseJob(key);
        int countBeforePause = InventoryReportJob.EXECUTION_COUNT.get();

        Thread.sleep(300);
        // While paused, no new executions should occur
        assertThat(InventoryReportJob.EXECUTION_COUNT.get()).isEqualTo(countBeforePause);

        manager.getScheduler().resumeJob(key);
        Thread.sleep(400);
        // After resuming, execution increments
        assertThat(InventoryReportJob.EXECUTION_COUNT.get()).isGreaterThan(countBeforePause);
    }
}

package com.example.quartz.scheduler;

import com.example.quartz.job.InventoryReportJob;
import com.example.quartz.listener.AuditJobListener;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.EverythingMatcher;

import java.util.Properties;

public class QuartzSchedulerManager implements AutoCloseable {

    private final Scheduler scheduler;
    private final AuditJobListener auditJobListener;

    public QuartzSchedulerManager() throws SchedulerException {
        Properties properties = new Properties();
        properties.put("org.quartz.scheduler.instanceName", "ValidationScheduler");
        properties.put("org.quartz.threadPool.threadCount", "5");
        properties.put("org.quartz.jobStore.class", "org.quartz.simpl.RAMJobStore");

        StdSchedulerFactory factory = new StdSchedulerFactory(properties);
        this.scheduler = factory.getScheduler();
        this.auditJobListener = new AuditJobListener();
        this.scheduler.getListenerManager().addJobListener(auditJobListener, EverythingMatcher.allJobs());
    }

    public void start() throws SchedulerException {
        scheduler.start();
    }

    public void scheduleIntervalJob(String jobName, String group, String reportType, int intervalMs, int repeatCount) throws SchedulerException {
        JobDetail jobDetail = JobBuilder.newJob(InventoryReportJob.class)
                .withIdentity(jobName, group)
                .usingJobData("reportType", reportType)
                .build();

        SimpleTrigger trigger = TriggerBuilder.newTrigger()
                .withIdentity(jobName + "Trigger", group)
                .startNow()
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInMilliseconds(intervalMs)
                        .withRepeatCount(repeatCount))
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }

    public void scheduleCronJob(String jobName, String group, String cronExpression) throws SchedulerException {
        JobDetail jobDetail = JobBuilder.newJob(InventoryReportJob.class)
                .withIdentity(jobName, group)
                .usingJobData("reportType", "CRON_SCHEDULED")
                .build();

        CronTrigger trigger = TriggerBuilder.newTrigger()
                .withIdentity(jobName + "CronTrigger", group)
                .withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }

    public Scheduler getScheduler() {
        return scheduler;
    }

    public AuditJobListener getAuditJobListener() {
        return auditJobListener;
    }

    @Override
    public void close() throws Exception {
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown(true);
        }
    }
}

package com.example.quartz.listener;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicInteger;

public class AuditJobListener implements JobListener {

    private static final Logger log = LoggerFactory.getLogger(AuditJobListener.class);
    private final AtomicInteger toBeExecutedCount = new AtomicInteger(0);
    private final AtomicInteger wasExecutedCount = new AtomicInteger(0);

    @Override
    public String getName() {
        return "AuditJobListener";
    }

    @Override
    public void jobToBeExecuted(JobExecutionContext context) {
        toBeExecutedCount.incrementAndGet();
        log.info("[Audit] Job {} is about to be executed", context.getJobDetail().getKey());
    }

    @Override
    public void jobExecutionVetoed(JobExecutionContext context) {
        log.warn("[Audit] Job {} execution was vetoed", context.getJobDetail().getKey());
    }

    @Override
    public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
        wasExecutedCount.incrementAndGet();
        log.info("[Audit] Job {} finished execution. Success={}", context.getJobDetail().getKey(), jobException == null);
    }

    public int getToBeExecutedCount() {
        return toBeExecutedCount.get();
    }

    public int getWasExecutedCount() {
        return wasExecutedCount.get();
    }
}

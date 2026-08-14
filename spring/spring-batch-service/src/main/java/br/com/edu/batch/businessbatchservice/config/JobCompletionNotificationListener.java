package br.com.edu.batch.businessbatchservice.config;

import br.com.edu.batch.businessbatchservice.domain.person.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.jdbc.core.DataClassRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

  private static final Logger LOGGER =
      LoggerFactory.getLogger(JobCompletionNotificationListener.class);
  private final JdbcTemplate template;

  public JobCompletionNotificationListener(JdbcTemplate template) {
    this.template = template;
  }

  @Override
  public void afterJob(@NonNull JobExecution jobExecution) {
    if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
      LOGGER.info("!!! JOB FINISHED! Time to verify the results");

      template
          .query("SELECT first_name, last_name FROM people", new DataClassRowMapper<>(Person.class))
          .forEach(person -> LOGGER.info("Found <{{}}> in the database.", person));
    }
  }
}

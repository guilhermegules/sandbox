package br.com.edu.batch.businessbatchservice.domain.person;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.lang.NonNull;

public class PersonItemProcessor implements ItemProcessor<Person, Person> {

  private static final Logger LOGGER = LoggerFactory.getLogger(PersonItemProcessor.class);

  @Override
  public Person process(@NonNull final Person person) {
    final var firstName = person.firstName().toUpperCase();
    final var lastName = person.firstName().toUpperCase();
    final var transformedPerson = new Person(firstName, lastName);

    LOGGER.info(String.format("Converting (%s) into (%s)", person, transformedPerson));

    return transformedPerson;
  }
}

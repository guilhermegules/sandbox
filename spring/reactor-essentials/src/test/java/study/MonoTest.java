package study;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.reactivestreams.Subscription;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@Slf4j
/*
 * Reactive streams
 * 1. Async
 * 2. Non-blocking
 * 3. Backpressure
 *
 * Publisher - Cold <- subscribe (Subscriber)
 * Subscription is created
 * Publisher call onSubscribe with subscription
 *
 * Subscription -> (request N)
 * Publisher -> onNext
 * Until:
 * 1. Publisher sends all the objects requested.
 * 2. Publisher sends all the objects it has. (onComplete) subscriber and subscription will be canceled
 * 3. There is an error. (onError) -> subscriber and subscription will be canceled
 * */
public class MonoTest {

  @Test
  public void monoSubsTest() {
    String name = "Guilherme Gules";
    var mono = Mono.just(name).log();

    StepVerifier.create(mono)
        .expectNext(name)
        .verifyComplete();
  }

  @Test
  public void monoSubsConsumerTest() {
    String name = "Guilherme Gules";
    var mono = Mono.just(name).log();

    mono.subscribe(s -> System.out.println("Value" + s));
    StepVerifier.create(mono)
        .expectNext(name)
        .verifyComplete();
  }

  @Test
  public void monoSubsConsumerErrorTest() {
    String name = "Guilherme Gules";
    var mono = Mono.just(name).map(s -> {
      throw new RuntimeException("Testing mono with error");
    });

    mono.subscribe(
        s -> System.out.println("Value" + s),
        e -> System.out.println("Something happened"));
    StepVerifier.create(mono)
        .expectError(RuntimeException.class)
        .verify();
  }

  @Test
  public void monoSubsConsumerCompleteTest() {
    String name = "Guilherme Gules";
    var mono = Mono.just(name)
        .log()
        .map(String::toLowerCase);

    mono.subscribe(
        s -> System.out.println("Value" + s),
        Throwable::printStackTrace,
        () -> {
          System.out.println("Complete");
        });
    StepVerifier.create(mono)
        .expectNext(name.toLowerCase())
        .verifyComplete();
  }

  @Test
  public void monoSubsConsumerSubscriptionTest() {
    String name = "Guilherme Gules";
    var mono = Mono.just(name)
        .log()
        .map(String::toLowerCase);

    mono.subscribe(
        s -> System.out.println("Value" + s),
        Throwable::printStackTrace,
        () -> {
          System.out.println("Complete");
        },
        subscription -> subscription.request(5));

    StepVerifier.create(mono)
        .expectNext(name.toLowerCase())
        .verifyComplete();
  }

  @Test
  public void monoDoOnMethodsTest() {
    String name = "Guilherme Gules";
    var mono = Mono.just(name)
        .log()
        .map(String::toLowerCase)
        .doOnSubscribe(subscription -> {
          System.out.println("Subscribed: " + subscription);
        })
        .doOnRequest(longNumber -> System.out.println("Request received " + longNumber))
        .doOnNext(s -> System.out.println("next " + s))
        .flatMap((s) -> Mono.empty())
        .doOnNext(s -> System.out.println("next " + s))
        .doOnSuccess(s -> System.out.println("success " + s))
        .doOnError(e -> System.out.println("Error " + e));

    mono.subscribe(
        s -> System.out.println("Value" + s),
        Throwable::printStackTrace,
        () -> {
          System.out.println("Complete");
        });
    StepVerifier.create(mono)
        .expectNext(name.toLowerCase())
        .verifyComplete();
  }

  @Test
  public void monoDoOnErrorMethodsTest() {
    var mono = Mono.error(new IllegalArgumentException(("test")))
        .doOnError(e -> MonoTest.log.error("Error message: {}", e.getMessage()))
        .doOnNext(v -> log.info("Executing"))
        .log();

    StepVerifier.create(mono)
        .expectError(IllegalArgumentException.class)
        .verify();
  }

  @Test
  public void monoDoOnErrorResumeMethodsTest() {
    var mono = Mono.error(new IllegalArgumentException(("test")))
        .doOnError(e -> MonoTest.log.error("Error message: {}", e.getMessage()))
        .onErrorResume(v -> {
          log.info("Do on error resume");
          return Mono.just("Simple data");
        })
        .log();

    StepVerifier.create(mono)
        .expectNext("Simple data")
        .expectComplete()
        .verify();
  }

  @Test
  public void monoDoOnErrorReturnMethodsTest() {
    var mono = Mono.error(new IllegalArgumentException(("test")))
        .doOnError(e -> MonoTest.log.error("Error message: {}", e.getMessage()))
        .onErrorReturn("Simple data")
        .log();

    StepVerifier.create(mono)
        .expectNext("Simple data")
        .expectComplete()
        .verify();
  }
}

package study;

import java.time.Duration;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;
import reactor.core.publisher.BaseSubscriber;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

@Slf4j
public class FluxTest {

  @Test
  public void fluxSubscriber() {
    var fluxString = Flux.just("Guilherme", "Gules", "Moreira").log();

    StepVerifier.create(fluxString)
        .expectNext("Guilherme", "Gules", "Moreira")
        .verifyComplete();
  }

  @Test
  public void fluxSubscriberNumber() {
    var fluxString = Flux.range(1, 5).log();

    StepVerifier.create(fluxString)
        .expectNext(1, 2, 3, 4, 5)
        .verifyComplete();
  }

  @Test
  public void fluxSubscriberListNumber() {
    var fluxString = Flux.fromIterable(List.of(1, 2, 3, 4, 5)).log();

    StepVerifier.create(fluxString)
        .expectNext(1, 2, 3, 4, 5)
        .verifyComplete();
  }

  @Test
  public void fluxSubscriberNumberError() {
    var fluxString = Flux.range(1, 5)
        .map(v -> {
          if (v == 4) {
            throw new RuntimeException();
          }
          return v;
        })
        .log();

    fluxString.subscribe(v -> log.info("{}", v), Throwable::printStackTrace,
        () -> log.info("Complete"));

    StepVerifier.create(fluxString)
        .expectNext(1, 2, 3)
        .expectError(RuntimeException.class)
        .verify();
  }

  @Test
  public void fluxSubscriberNumberErrorWithBackpressure() {
    var fluxString = Flux.range(1, 5)
        .map(v -> {
          if (v == 4) {
            throw new RuntimeException();
          }
          return v;
        })
        .log();

    fluxString.subscribe(
        v -> log.info("{}", v),
        Throwable::printStackTrace,
        () -> log.info("Complete"),
        subscription -> subscription.request(3));

    StepVerifier.create(fluxString)
        .expectNext(1, 2, 3);
  }

  @Test
  public void fluxSubscriberUglyBackpressure() {
    var fluxString = Flux.range(1, 10)
        .log();

    fluxString.subscribe(new Subscriber<Integer>() {
      private int count = 0;
      private Subscription subscription;
      private final int requestCount = 2;

      @Override
      public void onSubscribe(Subscription subscription) {
        this.subscription = subscription;
        this.subscription.request(requestCount);
      }

      @Override
      public void onNext(Integer integer) {
        count++;
        if (count == 2) {
          this.count = 0;
          subscription.request(requestCount);
        }
      }

      @Override
      public void onError(Throwable throwable) {

      }

      @Override
      public void onComplete() {

      }
    });

    StepVerifier.create(fluxString)
        .expectNext(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).verifyComplete();
  }

  @Test
  public void fluxSubscriberNotSoUglyBackpressure() {
    var fluxString = Flux.range(1, 10)
        .log();

    fluxString.subscribe(new BaseSubscriber<Integer>() {
      private int count = 0;
      private final int requestCount = 2;

      @Override
      protected void hookOnSubscribe(Subscription subscription) {
        request(requestCount);
      }

      @Override
      protected void hookOnNext(Integer value) {
        count++;
        if (count == 2) {
          this.count = 0;
          request(requestCount);
        }
      }
    });

    StepVerifier.create(fluxString)
        .expectNext(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).verifyComplete();
  }

  @Test
  public void fluxSubscribeInterval() throws InterruptedException {
    var interval = Flux.interval(Duration.ofMillis(100)).take(10).log();

    interval.subscribe(i -> log.info("{}", i));

    Thread.sleep(1000);
  }

  @Test
  public void fluxSubscribeInterval2() throws InterruptedException {
    StepVerifier.withVirtualTime(this::createInterval).expectSubscription()
        .expectNoEvent(Duration.ofDays(1))
        .thenAwait(Duration.ofDays(2)).expectNext(0L).expectNext(1L).thenCancel().verify();
  }

  @Test
  public void fluxSubscriberPrettyBackpressure() {
    var flux = Flux.range(1, 10).log().limitRate(3);

    flux.subscribe(n -> log.info("{}", n));

    StepVerifier.create(flux).expectNext(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).verifyComplete();
  }

  @Test
  public void connectableFlux() {
    var connectableFlux = Flux.range(1, 10).log().delayElements(Duration.ofMillis(100)).publish();

    StepVerifier.create(connectableFlux).then(connectableFlux::connect)
        .thenConsumeWhile(n -> n <= 5)
        .expectNext(6, 7, 8, 9, 10).expectComplete().verify();
  }

  @Test
  public void connectableFluxAutoConnect() {
    var connectableFlux = Flux.range(1, 5).log().delayElements(Duration.ofMillis(100)).publish()
        .autoConnect(2);

    StepVerifier.create(connectableFlux).then(connectableFlux::subscribe)
        .expectNext(1, 2, 3, 4, 5).expectComplete().verify();
  }

  private Flux<Long> createInterval() {
    return Flux.interval(Duration.ofDays(1)).take(10).log();
  }
}

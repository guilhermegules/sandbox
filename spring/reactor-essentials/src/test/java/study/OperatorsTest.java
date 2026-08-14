package study;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.atomic.AtomicLong;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;
import reactor.test.StepVerifier;

@Slf4j
public class OperatorsTest {

  @Test
  public void subscribeOnSimple() {
    var flux = Flux.range(1, 4)
        .map(i -> {
          log.info("Map 1 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        })
        .subscribeOn(Schedulers.single())
        .map(i -> {
          log.info("Map 2 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        });

    StepVerifier.create(flux).expectSubscription().expectNext(1, 2, 3, 4).verifyComplete();
  }

  @Test
  public void publishOnSimple() {
    var flux = Flux.range(1, 4)
        .map(i -> {
          log.info("Map 1 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        })
        .publishOn(Schedulers.boundedElastic())
        .map(i -> {
          log.info("Map 2 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        });

    StepVerifier.create(flux).expectSubscription().expectNext(1, 2, 3, 4).verifyComplete();
  }

  @Test
  public void multipleSubscribeOnSimple() {
    // Only the first scheduler will be used for the future subscriptions
    var flux = Flux.range(1, 4)
        .subscribeOn(Schedulers.single())
        .map(i -> {
          log.info("Map 1 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        })
        .subscribeOn(Schedulers.boundedElastic())
        .map(i -> {
          log.info("Map 2 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        });

    StepVerifier.create(flux).expectSubscription().expectNext(1, 2, 3, 4).verifyComplete();
  }

  @Test
  public void multiplePublishOnSimple() {
    var flux = Flux.range(1, 4)
        .publishOn(Schedulers.single())
        .map(i -> {
          log.info("Map 1 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        })
        .publishOn(Schedulers.boundedElastic())
        .map(i -> {
          log.info("Map 2 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        });

    StepVerifier.create(flux).expectSubscription().expectNext(1, 2, 3, 4).verifyComplete();
  }

  @Test
  public void multiplePublishOnAndSubscribeOn() {
    // publishOn has precedence over subscribeOn
    var flux = Flux.range(1, 4)
        .publishOn(Schedulers.single())
        .map(i -> {
          log.info("Map 1 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        })
        .subscribeOn(Schedulers.boundedElastic())
        .map(i -> {
          log.info("Map 2 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        });

    StepVerifier.create(flux).expectSubscription().expectNext(1, 2, 3, 4).verifyComplete();
  }

  @Test
  public void multiplePublishOnAndSubscribeOn2() {
    var flux = Flux.range(1, 4)
        .subscribeOn(Schedulers.boundedElastic())
        .map(i -> {
          log.info("Map 1 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        })
        .publishOn(Schedulers.single())
        .map(i -> {
          log.info("Map 2 - {}, Thread: {}", i, Thread.currentThread().getName());
          return i;
        });

    StepVerifier.create(flux).expectSubscription().expectNext(1, 2, 3, 4).verifyComplete();
  }

  @Test
  public void subscribeOnIO() {
    var list = Mono.fromCallable(() -> Files.readAllLines(Path.of("text-file.txt"))).log()
        .subscribeOn(Schedulers.boundedElastic());

    StepVerifier.create(list).expectSubscription().thenConsumeWhile(l -> {
      Assertions.assertFalse(l.isEmpty());
      log.info("{}", l.size());
      return true;
    }).verifyComplete();
  }

  @Test
  public void switchIfEmptyTest() {
    var value = emptyFlux().switchIfEmpty(Flux.just("Value"));

    StepVerifier.create(value).expectSubscription().expectNext("Value").expectComplete();
  }

  @Test
  public void deferOperatorTest() throws Exception {
    var defer = Mono.defer(() -> Mono.just(System.currentTimeMillis()));
    var just = Mono.just(System.currentTimeMillis());

    defer.subscribe(v -> log.info("defer: {}", v));
    just.subscribe(v -> log.info("just: {}", v));
    Thread.sleep(100);
    defer.subscribe(v -> log.info("defer: {}", v));
    just.subscribe(v -> log.info("just: {}", v));
    Thread.sleep(100);
    defer.subscribe(v -> log.info("defer: {}", v));
    just.subscribe(v -> log.info("just: {}", v));
    Thread.sleep(100);
    defer.subscribe(v -> log.info("defer: {}", v));
    just.subscribe(v -> log.info("just: {}", v));

    AtomicLong atomicLong = new AtomicLong();
    defer.subscribe(atomicLong::set);

    Assertions.assertTrue(atomicLong.get() > 0);
  }

  private Flux<Object> emptyFlux() {
    return Flux.empty();
  }
}

def greet(name: str) -> str:
    return f"Hello, {name}!"


print(greet("Ada"))
print(greet("Bob"))


# parameters with defaults and keyword args
def power(base: float, exponent: int = 2) -> float:
    return base ** exponent


print(power(3))          # uses default exponent
print(power(3, 3))       # positional
print(power(exponent=4, base=2))  # keyword args, any order


# *args collects extra positional args, **kwargs extra keyword args
def total(*args: int) -> int:
    return sum(args)

print(total(1, 2, 3, 4))

def describe(**kwargs: str) -> str:
    parts = [f"{key}={value}" for key, value in kwargs.items()]
    return ", ".join(parts)


print(describe(name="Ada", role="dev", level="senior"))

# functions are first-class: can be stored, passed, returned
def apply_twice(func, value):
    return func(func(value))

def add_one(x: int) -> int:
    return x + 1

print(apply_twice(add_one, 5))

# lambdas are small anonymous functions
square = lambda x: x * x
print(square(6))
print(list(map(lambda x: x * 2, [1, 2, 3])))
print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))

# closures capture outer variables
def make_counter():
    count = 0

    def increment() -> int:
        nonlocal count
        count += 1
        return count

    return increment


counter = make_counter()
print(counter(), counter(), counter())


# recursion
def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)


print(factorial(5))

# EXERCISES

def max_of_two(a: float, b: float) -> float:
    return a if a > b else b


assert max_of_two(3, 7) == 7
assert max_of_two(5, 5) == 5


def is_palindrome(text: str) -> bool:
    cleaned = text.lower().replace(" ", "")
    return cleaned == cleaned[::-1]


assert is_palindrome("racecar") is True
assert is_palindrome("A man a plan a canal Panama") is True
assert is_palindrome("hello") is False


def celsius_to_fahrenheit(c: float) -> float:
    return c * 9 / 5 + 32


assert celsius_to_fahrenheit(0) == 32
assert celsius_to_fahrenheit(100) == 212


def count_words(sentence: str) -> dict:
    counts = {}
    for word in sentence.split():
        counts[word] = counts.get(word, 0) + 1
    return counts


assert count_words("a b a") == {"a": 2, "b": 1}

print("functions exercises pass!")

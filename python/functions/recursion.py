def countdown(n: int) -> None:
    if n <= 0:  # base case
        print("done!")
        return
    print(n)
    countdown(n - 1)  # recursive case

countdown(3)

def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 5 * 4 * 3 * 2 * 1

def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


print([fibonacci(i) for i in range(10)])

def sum_nested(data) -> int:
    total = 0
    for item in data:
        if isinstance(item, list):
            total += sum_nested(item)  # recurse into the list
        else:
            total += item
    return total


print(sum_nested([1, [2, [3, 4]], 5]))

tree = [
    {"name": "src", "children": [{"name": "main.py"}, {"name": "utils.py"}]},
    {"name": "tests", "children": [{"name": "test_main.py"}]},
]

def collect_paths(nodes, path=""):
    paths = []
    for node in nodes:
        if not isinstance(node, dict):
            continue
        current = f"{path}/{node['name']}"
        paths.append(current)
        paths.extend(collect_paths(node.get("children", []), current))
    return paths

for p in collect_paths(tree):
    print(p)

try:
    def infinite(n: int) -> int:
        return infinite(n + 1)

    infinite(0)
except RecursionError:
    print("RecursionError: exceeded recursion limit")


# iterative vs recursive: same result, different approach
def factorial_iterative(n: int) -> int:
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

assert factorial(5) == factorial_iterative(5)

# memoization avoids recomputing in recursive fibonacci
cache = {}

def fibonacci_fast(n: int) -> int:
    if n in cache:
        return cache[n]
    if n <= 1:
        result = n
    else:
        result = fibonacci_fast(n - 1) + fibonacci_fast(n - 2)
    cache[n] = result
    return result


print([fibonacci_fast(i) for i in range(20)])

# EXERCISES

def sum_to(n: int) -> int:
    if n <= 0:
        return 0
    return n + sum_to(n - 1)


assert sum_to(5) == 15
assert sum_to(0) == 0


def count_digits(n: int) -> int:
    if n < 10:
        return 1
    return 1 + count_digits(n // 10)


assert count_digits(12345) == 5
assert count_digits(7) == 1


def reverse_string(text: str) -> str:
    if len(text) <= 1:
        return text
    return reverse_string(text[1:]) + text[0]


assert reverse_string("hello") == "olleh"
assert reverse_string("a") == "a"


def is_palindrome(text: str) -> bool:
    if len(text) <= 1:
        return True
    if text[0] != text[-1]:
        return False
    return is_palindrome(text[1:-1])

assert is_palindrome("racecar") is True
assert is_palindrome("hello") is False

def gcd(a: int, b: int) -> int:
    if b == 0:
        return a
    return gcd(b, a % b)

assert gcd(48, 18) == 6
assert gcd(17, 13) == 1

def flatten(data: list) -> list:
    result = []
    for item in data:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result


assert flatten([1, [2, [3, 4]], 5]) == [1, 2, 3, 4, 5]

print("recursion exercises pass!")

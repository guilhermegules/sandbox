temperature = 25
if temperature > 30:
    status = "hot"
elif temperature > 15:
    status = "mild"
else:
    status = "cold"
print(status)

# comparisons and logical operators
print(1 < 2, 2 <= 2, 3 > 5, 5 != 5)
print(True and False, True or False, not True)
print(0 < temperature < 100)  # chained comparison

for i in range(5):
    print(i, end=" ")
print()

for i in range(2, 10, 2):  # start, stop, step
    print(i, end=" ")
print()

# for loop with enumerate
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(index, fruit, end=" | ")
print()

count = 0
while count < 3:
    count += 1
print("count:", count)

# break / continue
for i in range(10):
    if i % 2 == 0:
        continue
    if i > 7:
        break
    print(i, end=" ")
print()

limit = 20
verdict = "big" if limit > 10 else "small"
print(verdict)

# EXERCISES

def even_or_odd(n: int) -> str:
    if n % 2 == 0: return "even"
    return "odd"

assert even_or_odd(2) == "even"
assert even_or_odd(3) == "odd"

def sum_up_to(n: int) -> int:
    total = 0
    for v in range(n):
        total += v
    return total

assert sum_up_to(5) == 10
assert sum_up_to(0) == 0

def count_vowels(word: str) -> int:
    vowels = ["a", "e", "i", "o", "u"]
    letters = 0

    for w in word:
        if vowels.count(w) > 0:
            letters += 1

    return letters

assert count_vowels("hello") == 2
assert count_vowels("sky") == 0

print("control flow exercises pass!")

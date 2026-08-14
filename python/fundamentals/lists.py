# lists

fruits = ["apple", "banana", "cherry"]
print(fruits[0], fruits[-1])      # index, negative index
print(fruits[1:3])                # slicing
print(fruits[:2], fruits[1:])     # slice shortcuts
print(len(fruits))

# lists are mutable
fruits[0] = "avocado"
fruits.append("date")
fruits.insert(1, "blueberry")
print(fruits)
print(fruits.pop())               # removes last, returns it
print(fruits.remove("banana"))    # removes first match

# membership and sorting
print("cherry" in fruits, "kiwi" in fruits)
nums = [3, 1, 2]
print(sorted(nums))               # returns new list
print(nums)
nums.sort()                       # sorts in place
print(nums)

# iterate and build new lists
words = ["hello", "world"]
loud = [w.upper() for w in words]
print(loud)

# list comprehension with a condition
evens = [n for n in range(10) if n % 2 == 0]
print(evens)

# EXERCISES

def double_all(nums: list[int]) -> list[int]:
    return [num * 2 for num in nums]

assert double_all([1, 2, 3]) == [2, 4, 6]

def keep_even(nums: list[int]) -> list[int]:
    return [num for num in nums if num % 2 == 0]

assert keep_even([1, 2, 3, 4, 5, 6]) == [2, 4, 6]

def last_item(items: list) -> object:
    if len(items) == 0: return None
    return items[-1]

assert last_item(["a", "b", "c"]) == "c"
assert last_item([]) is None

print("lists exercises pass!")

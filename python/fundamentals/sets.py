# sets

unique = {1, 2, 2, 3, 3, 3}   # duplicates are dropped
print(unique)

# sets are unordered and unindexed: no [0], no slicing
unique.add(4)
unique.discard(2)             # remove, no error if missing
unique.remove(3)              # remove, error if missing
print(unique)

# membership is fast
print(1 in unique, 99 in unique)

# set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a & b)      # intersection: in both
print(a | b)      # union: in either
print(a - b)      # difference: in a but not b
print(a ^ b)      # symmetric difference: in one but not both

print(a.issubset({1, 2, 3, 4, 5}))
print(a.isdisjoint({7, 8}))

# build a set from an iterable to remove duplicates
words = ["a", "b", "a", "c", "b"]
print(set(words))
print(len(set(words)))   # count unique words

# EXERCISES

def common(a: set, b: set) -> set:
    return a.intersection(b)

assert common({1, 2, 3}, {2, 3, 4}) == {2, 3}

def unique_count(text: str) -> int:
    return len(set([t for t in text]))

assert unique_count("hello") == 4
assert unique_count("") == 0

def evens_of(nums: list[int]) -> set:
    return set([n for n in nums if n % 2 == 0])

assert evens_of([1, 2, 3, 4, 5, 6]) == {2, 4, 6}

print("sets exercises pass!")

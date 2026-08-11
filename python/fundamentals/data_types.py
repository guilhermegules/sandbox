# data types

# built-in types
name = "Ada"        # str
age = 36            # int
pi = 3.14159        # float
active = True       # bool
nickname = None     # NoneType

print(type(name))
print(type(age))
print(type(pi))
print(type(active))
print(type(nickname))

# arithmetic types mix: int + float -> float
print(10 / 3)   # true division, always float
print(10 // 3)  # floor division -> int
print(10 % 3)   # remainder
print(2 ** 3)   # power

# conversions
number = int("123")
text = str(123)
floored = int(3.7)
truthy = bool(1)
print(number, text, floored, truthy)

# f-strings
who = "Ada"
year = 1815
print(f"{who} was born in {year}")
print(f"{pi:.2f}")  # format: 2 decimals

# booleans and None are falsy/truthy
print(bool(0), bool(""), bool(None), bool([]))
print(bool(1), bool("hi"), bool([0]))


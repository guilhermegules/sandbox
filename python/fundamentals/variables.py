# variables

# simple assignment
name = "Ada"
age = 36
pi = 3.14159
active = True
nickname = None

# reassignment: a variable can change type
age = "thirty-six"
print("age is now:", age, type(age))

# multiple assignment
first, second = 1, 2
print(first, second)

# same value to several names
a = b = c = 0
print(a, b, c)

# swapping without a temp variable
x, y = 10, 20
x, y = y, x
print(x, y)

# naming: snake_case, lowercase, no reserved words
user_count = 3
_total = 1.5  # underscore prefix: conventionally "private"


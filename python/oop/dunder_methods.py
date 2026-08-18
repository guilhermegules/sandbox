# dunder (magic) methods: they power operators and built-ins

class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    # representation for humans
    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

    # unambiguous representation for debugging
    def __repr__(self) -> str:
        return f"Point(x={self.x}, y={self.y})"

    # equality: defines ==
    def __eq__(self, other) -> bool:
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    # addition: defines +
    def __add__(self, other: "Point") -> "Point":
        return Point(self.x + other.x, self.y + other.y)

    # less-than: defines <
    def __lt__(self, other: "Point") -> bool:
        return self.x < other.x

    # length: defines len()
    def __len__(self) -> int:
        return 2


p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)

print(str(p1))          # __str__
print(repr(p1))         # __repr__
print(p1 == p2)         # __eq__
print(p1 == p3)         # __eq__
print(p1 + p3)          # __add__
print(p1 < p3)          # __lt__
print(len(p1))          # __len__


# __getitem__ and __setitem__ power subscripting
class Vector:
    def __init__(self, items: list[int]):
        self.items = items

    def __getitem__(self, index: int) -> int:
        return self.items[index]

    def __setitem__(self, index: int, value: int) -> None:
        self.items[index] = value

    def __len__(self) -> int:
        return len(self.items)

    def __repr__(self) -> str:
        return f"Vector({self.items})"


v = Vector([10, 20, 30])
print(v[0], v[-1])
v[1] = 99
print(v)
print(len(v))


# __call__ lets you call an instance like a function
class Adder:
    def __init__(self, base: int):
        self.base = base

    def __call__(self, value: int) -> int:
        return self.base + value


add5 = Adder(5)
print(add5(3))
print(add5(10))


# __enter__ / __exit__ power the `with` statement
class Timer:
    def __enter__(self):
        print("starting timer")
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> None:
        print("stopping timer")


with Timer() as timer:
    print("work happening")


# EXERCISES

class Money:
    def __init__(self, amount: float):
        self.amount = amount

    def __add__(self, other: "Money") -> "Money":
        return Money(self.amount + other.amount)

    def __eq__(self, other) -> bool:
        if not isinstance(other, Money):
            return NotImplemented
        return self.amount == other.amount

    def __repr__(self) -> str:
        return f"Money({self.amount})"


assert (Money(10) + Money(5)).amount == 15
assert Money(10) == Money(10)
assert Money(10) != Money(11)

class Book:
    def __init__(self, title: str, pages: int):
        self.title = title
        self.pages = pages

    def __len__(self) -> int:
        return self.pages

book = Book("Python 101", 250)
assert len(book) == 250

print("dunder methods exercises pass!")

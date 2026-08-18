class Dog:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def bark(self) -> str:
        return f"{self.name} says Woof!"

    def human_years(self) -> int:
        return self.age * 7


rex = Dog("Rex", 3)
print(rex.name, rex.age)
print(rex.bark())
print(rex.human_years())

luna = Dog("Luna", 1)
luna.age = 2  # mutable
print(luna.name, luna.age)
print(rex.name, rex.age)  # Rex unchanged


class Counter:
    total = 0

    def __init__(self):
        Counter.total += 1


a = Counter()
b = Counter()
print("instances created:", Counter.total)

class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def distance_to_origin(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __repr__(self) -> str:
        return f"Point({self.x}, {self.y})"


p = Point(3, 4)
print(p, p.distance_to_origin())

class Math:
    pi = 3.14159

    @classmethod
    def description(cls) -> str:
        return f"constants: pi={cls.pi}"

    @staticmethod
    def clamp(value: float, low: float, high: float) -> float:
        return max(low, min(value, high))


print(Math.description())
print(Math.clamp(15, 0, 10))
print(Math.clamp(-5, 0, 10))

class Rectangle:
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)


r = Rectangle(3, 4)
assert r.area() == 12
assert r.perimeter() == 14

class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> None:
        self.balance += amount

    def withdraw(self, amount: float) -> bool:
        if amount > self.balance:
            return False
        self.balance -= amount
        return True


account = BankAccount("Ada", 100)
account.deposit(50)
assert account.balance == 150
assert account.withdraw(200) is False
assert account.withdraw(40) is True
assert account.balance == 110

print("classes basics exercises pass!")

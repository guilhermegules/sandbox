class Animal:
    def __init__(self, name: str):
        self.name = name

    def speak(self) -> str:
        return "..."


class Dog(Animal):
    def speak(self) -> str:
        return "Woof!"


class Cat(Animal):
    def speak(self) -> str:
        return "Meow!"


animals = [Dog("Rex"), Cat("Luna"), Animal("mystery")]
for animal in animals:
    print(f"{animal.name}: {animal.speak()}")  # polymorphism

class Vehicle:
    def __init__(self, wheels: int, make: str):
        self.wheels = wheels
        self.make = make

    def info(self) -> str:
        return f"Vehicle with {self.wheels} wheels"


class Car(Vehicle):
    def __init__(self, make: str, seats: int):
        super().__init__(4, make)
        self.seats = seats

    def info(self) -> str:
        return f"{self.make} car with {self.seats} seats"


car = Car("Toyota", 5)
print(car.wheels, car.seats)
print(car.info())
print(isinstance(car, Vehicle), isinstance(car, Car))


class Logging:
    def log(self, msg: str) -> None:
        print(f"[log] {msg}")

class Electronic:
    def __init__(self, power: int):
        self.power = power


class SmartDevice(Electronic, Logging):
    def __init__(self, power: int):
        super().__init__(power)

device = SmartDevice(100)
device.log(f"power is {device.power}")
print(SmartDevice.mro())


# composition over inheritance: has-a instead of is-a
class Engine:
    def start(self) -> str:
        return "engine started"

class Car2:
    def __init__(self):
        self.engine = Engine()

    def go(self) -> str:
        return self.engine.start()

print(Car2().go())

# EXERCISES

class Shape:
    def area(self) -> float:
        raise NotImplementedError

class Square(Shape):
    def __init__(self, side: float):
        self.side = side

    def area(self) -> float:
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height

    def area(self) -> float:
        return 0.5 * self.base * self.height

assert Square(3).area() == 9
assert Triangle(4, 5).area() == 10

class Bird:
    def fly(self) -> str:
        return "flying"

class Penguin(Bird):
    def fly(self) -> str:
        return "sorry, can't fly"

assert Bird().fly() == "flying"
assert Penguin().fly() == "sorry, can't fly"

print("inheritance exercises pass!")

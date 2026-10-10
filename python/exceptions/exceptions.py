print("=== Basic try-except ===")

try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

print("\n=== Handling Multiple Exceptions ===")

def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Division by zero")
        return None
    except TypeError:
        print("Error: Invalid types for division")
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide("10", 2))

print("\n=== try-except-else-finally ===")

def read_number(value):
    try:
        num = int(value)
    except ValueError:
        print(f"Could not convert '{value}' to integer")
    else:
        print(f"Successfully converted to: {num}")
    finally:
        print("This always executes")

read_number("42")
read_number("abc")

print("\n=== Common Built-in Exceptions ===")

# TypeError
try:
    result = "hello" + 5
except TypeError as e:
    print(f"TypeError: {e}")

# IndexError
try:
    my_list = [1, 2, 3]
    print(my_list[10])
except IndexError as e:
    print(f"IndexError: {e}")

# KeyError
try:
    my_dict = {"name": "Alice"}
    print(my_dict["age"])
except KeyError as e:
    print(f"KeyError: {e}")

# FileNotFoundError
try:
    open("nonexistent_file.txt")
except FileNotFoundError as e:
    print(f"FileNotFoundError: {e}")

# AttributeError
try:
    my_list = [1, 2, 3]
    my_list.append_item(4)
except AttributeError as e:
    print(f"AttributeError: {e}")

# ValueError
try:
    int("not_a_number")
except ValueError as e:
    print(f"ValueError: {e}")

print("\n=== Raising Exceptions ===")

def set_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0 or age > 150:
        raise ValueError("Age must be between 0 and 150")
    return age

try:
    set_age(25)
    print("Age 25 is valid")
    set_age(-5)
except (TypeError, ValueError) as e:
    print(f"Error: {e}")

print("\n=== Custom Exceptions ===")

class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Cannot withdraw ${amount}. Balance is only ${balance}"
        )

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

account = BankAccount(100)
try:
    account.withdraw(50)
    print(f"Balance after withdrawal: ${account.balance}")
    account.withdraw(100)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"Tried to withdraw: ${e.amount}")
    print(f"Current balance: ${e.balance}")

print("\n=== Exception Chaining ===")

def process_data(data):
    try:
        return int(data)
    except ValueError as e:
        raise RuntimeError("Failed to process data") from e

try:
    result = process_data("not_a_number")
except RuntimeError as e:
    print(f"RuntimeError: {e}")
    print(f"Original cause: {e.__cause__}")

print("\n=== Context Manager Exception Handling ===")

class DatabaseConnection:
    def __enter__(self):
        print("Opening database connection")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing database connection")
        if exc_type is not None:
            print(f"Exception occurred: {exc_val}")
        return False

    def query(self, sql):
        if "DROP" in sql.upper():
            raise ValueError("DROP operations not allowed")
        return f"Executing: {sql}"

with DatabaseConnection() as db:
    db.query("SELECT * FROM users")

print("\nWith error handling:")
with DatabaseConnection() as db:
    try:
        db.query("DROP TABLE users")
    except ValueError as e:
        print(f"Caught in main: {e}")

print("\n=== Assertions ===")

def calculate_discount(price, discount_percent):
    assert 0 <= discount_percent <= 100, "Discount must be between 0 and 100"
    assert price >= 0, "Price must be non-negative"
    return price * (1 - discount_percent / 100)

print(f"Discounted price: ${calculate_discount(100, 20)}")

try:
    calculate_discount(100, 150)
except AssertionError as e:
    print(f"AssertionError: {e}")

print("\n=== Logging Exceptions ===")

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def risky_operation():
    try:
        result = 10 / 0
    except ZeroDivisionError:
        logger.error("Division by zero occurred", exc_info=True)
        raise

try:
    risky_operation()
except ZeroDivisionError:
    print("Exception was logged and re-raised")

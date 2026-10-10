class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def __repr__(self):
        return f"User(name={self.name!r}, email={self.email!r})"


class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __repr__(self):
        return f"Product(name={self.name!r}, price={self.price!r})"


class Order:
    def __init__(self, user, items=None):
        self.user = user
        self.items = items or []

    def add_item(self, product, quantity=1):
        self.items.append({"product": product, "quantity": quantity})

    def total(self):
        return sum(item["product"].price * item["quantity"] for item in self.items)
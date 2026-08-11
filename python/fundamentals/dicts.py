# dicts

person = {"name": "Ada", "age": 36, "active": True}
print(person["name"])             # access by key
print(person.get("city", "unknown"))  # safe access with default

# dicts are mutable
person["city"] = "London"         # add / update
del person["active"]              # remove a key
print(person)

# iteration
for key in person:
    print(key, end=" ")
print()

for key, value in person.items():
    print(f"{key}={value}", end=" ")
print()

print(person.keys())
print(person.values())

# membership checks keys
print("name" in person, "London" in person)

# dict comprehension
squares = {n: n * n for n in range(4)}
print(squares)

# nested dicts
team = {"ada": {"role": "dev", "level": 5}, "bob": {"role": "qa", "level": 3}}
print(team["ada"]["role"])

# EXERCISES

def get_name(data: dict) -> str:
    return data.get("name", "unknown")

assert get_name({"name": "Ada"}) == "Ada"
assert get_name({}) == "unknown"

def with_size(data: dict) -> dict:
    data["size"] = 10
    return data

result = with_size({"name": "bag"})
assert result["size"] == 10


def to_doubles(nums: list[int]) -> dict:
    values = dict()
    for index, num in enumerate(nums):
        values[index + 1] = num * 2
    return values

assert to_doubles([1, 2, 3]) == {1: 2, 2: 4, 3: 6}

print("dicts exercises pass!")

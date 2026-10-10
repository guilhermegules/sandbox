from mypackage.submodule.process import calculate
from mypackage.models import User

result = calculate(a = 2, b = 3)
user = User("John doe", "test@test.com")

print(result)
print(user)
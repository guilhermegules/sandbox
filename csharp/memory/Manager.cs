namespace memory;

public class Manager
{
  private List<Employee> _employees = new List<Employee>();

  public void HireEmployee(int id, string name)
  {
    var employee = new Employee(id, name);
    _employees.Add(employee);
    Console.WriteLine($"✅ Hired new employee: {name}");
  }

  public void DismissAllEmployees()
  {
    Console.WriteLine("\n⚠️ Dismissing all employees...");
    _employees.Clear();
  }

  public List<Employee> GetEmployees()
  {
    return _employees;
  }
}

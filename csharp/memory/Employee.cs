namespace memory;

public class Employee
{
  public string Name { get; set; }
  public int Id { get; set; }

  public Employee(int id, string name)
  {
    Id = id;
    Name = name;
  }

  public void Work()
  {
    Console.WriteLine($"{Name} is working...");
  }

  // Finalizer — called when the object is collected by GC
  ~Employee()
  {
    Console.WriteLine($"🧹 Employee object {Name} was collected by the Garbage Collector.");
  }
}

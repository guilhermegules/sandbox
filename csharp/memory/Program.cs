namespace memory;

class Program
{
    static void Main()
    {
      Console.WriteLine("=== 🧠 Memory Management ===\n");
      
      // Stack and Heap demo
      int number = 42; // stored on the Stack
      string text = "Hello World"; // reference on Stack, object on Heap
      
      Console.WriteLine($"Stack example: number = {number}");
      Console.WriteLine($"Heap example: text = \"{text}\"");

      Console.WriteLine("\n--- Creating Manager and Employees ---");
      
      CreateEmployees();

      Console.WriteLine("\nForcing Garbage Collection...");
      GC.Collect();
      GC.WaitForPendingFinalizers();

      Console.WriteLine("\n✅ Program finished. Press any key to exit.");
      Console.ReadKey();
    }
    
    static void CreateEmployees()
    {
      var manager = new Manager();
      manager.HireEmployee(1, "Alice");
      manager.HireEmployee(2, "Bob");
      manager.HireEmployee(3, "Charlie");

      // Employees are stored on the Heap, and their references
      // are in the List inside Manager.

      manager.DismissAllEmployees();

      // After this line, the Employee objects are no longer referenced.
      // They become eligible for garbage collection.

      manager = null; // Now Manager itself becomes collectible.
    }
}

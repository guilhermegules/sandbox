using System.Collections;

namespace collections;

class Program
{
    static void Main()
    {
      // List
      var fruits = new List<string>
      {
        "Apple", "Banana", "Cherry",
        "Mango"
      };
      Console.WriteLine("List:");
      fruits.ForEach(f => Console.WriteLine($" - {f}"));
      
      // Dictionary
      var prices = new Dictionary<string, double>
      {
        ["Apple"] = 1.99,
        ["Banana"] = 0.99,
        ["Cherry"] = 2.49
      };
      Console.WriteLine("\nDictionary:");
      foreach (var p in prices)
      {
        Console.WriteLine($" - {p.Key}: ${p.Value}");
      }
      
      // Queue
      var tasks = new Queue<string>();
      tasks.Enqueue("Task 1");
      tasks.Enqueue("Task 2");
      Console.WriteLine($"\nQueue: Dequeued → {tasks.Dequeue()}");
      
      // Stack
      var stack = new Stack<string>();
      stack.Push("Undo 1");
      stack.Push("Undo 2");
      Console.WriteLine($"\nStack: Popped → {stack.Pop()}");
      
      // SortedList
      var scores = new SortedList<string, int>
      {
        ["Bob"] = 75,
        ["Alice"] = 90,
        ["Charlie"] = 85
      };
      Console.WriteLine("\nSortedList:");
      foreach (var s in scores)
      {
        Console.WriteLine($" - {s.Key}: {s.Value}");
      }
      
      // ArrayList
      var list = new ArrayList { "Text", 42, true }; // Legacy
      Console.WriteLine("\nArrayList:");
      foreach (var item in list) Console.WriteLine($" - {item}");

      // Hashtable
      var table = new Hashtable { ["Id"] = 1, ["Name"] = "Guilherme" };
      Console.WriteLine("\nHashtable:");
      foreach (DictionaryEntry e in table)
      {
        Console.WriteLine($" - {e.Key}: {e.Value}");
      }
      
      // Iterator Example
      Console.WriteLine("\nIterator (yield return):");
      foreach (var n in GenerateNumbers()) Console.WriteLine($" - {n}");
    }
    
    private static IEnumerable<int> GenerateNumbers()
    {
      for (var i = 1; i <= 3; i++)
      {
        yield return i;
      }
    }
}

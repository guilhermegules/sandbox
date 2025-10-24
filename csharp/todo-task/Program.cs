using todo_task;

enum Operation
{
    Add = 1,
    Remove = 2,
    Search = 3,
    List = 4,
    Exit = 0
}

class Program
{
    static void Add(List<TodoTask> tasks, int nextId)
    {
        Console.Write("Enter task description: ");
        var desc = Console.ReadLine() ?? throw new ArgumentNullException("Console.ReadLine()");
        tasks.Add(new TodoTask(nextId++, desc));
        Console.WriteLine("Task added!");
    }

    static void Remove(List<TodoTask> tasks)
    {
        Console.Write("Enter task Id to remove: ");
        if (!int.TryParse(Console.ReadLine(), out var removeId)) return;
        
        var taskToRemove = tasks.FirstOrDefault(t => t.Id == removeId);
                        
        if (taskToRemove != null)
        {
            tasks.Remove(taskToRemove);
            Console.WriteLine("Task removed!");
            return;
        }
                       
        Console.WriteLine("Task not found!");
    }

    static void Search(List<TodoTask> tasks)
    {
        Console.Write("Enter search keyword: ");
        var keyword = Console.ReadLine() ?? string.Empty;
        
        var foundTasks = tasks
            .Where(t => t.Description.Contains(keyword, StringComparison.OrdinalIgnoreCase));
        
        Console.WriteLine("Search results:");
        
        foreach (var t in foundTasks)
        {
            Console.WriteLine(t);
        }
    }

    private static void PrintAllTasks(List<TodoTask> tasks)
    {
        Console.WriteLine("All tasks:");
        foreach (var t in tasks)
        {
            Console.WriteLine(t);
        }
    }
    
    static void Main()
    {
        var tasks = new List<TodoTask>();
        var nextId = 1;

        while (true)
        {
            Console.WriteLine("\nTodo List Manager");
            Console.WriteLine("1. Add Task");
            Console.WriteLine("2. Remove Task");
            Console.WriteLine("3. Search Task");
            Console.WriteLine("4. List All Tasks");
            Console.WriteLine("0. Exit");
            Console.Write("Choose an option: ");

            var option = Console.ReadLine() ?? throw new InvalidOperationException();

            switch (option)
            {
                case "1":
                    Add(tasks, nextId);
                    break;
                case "2":
                    Remove(tasks);
                    break;
                case "3":
                    Search(tasks);
                    break;
                case "4":
                    PrintAllTasks(tasks);
                    break;
                case "0":
                    Console.WriteLine("Exited!");
                    return;
                default:
                    Console.WriteLine("Invalid option.");
                    break;
            }
        }
    }
}

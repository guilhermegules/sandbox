namespace file_manager;

class Program
{
    static void Main(string[] args)
    {
      var filePath = "data.txt";

      using (var writer = new StreamWriter(filePath))
      {
        writer.WriteLine("Hello world!");
        writer.WriteLine("This is an example of write with System.IO");
        writer.WriteLine(DateTime.Now);
      }
      
      Console.WriteLine("Data written in data.txt!");

      using (var reader = new StreamReader(filePath))
      {
        Console.WriteLine("\nFile content:");
        var line = "";

        while ((line = reader.ReadLine()) != null)
        {
          Console.WriteLine(line);
        }
      }

      if (File.Exists(filePath))
      {
        var newPath = "data-backup.txt";
        
        File.Move(filePath, newPath, true);
        Console.WriteLine($"\nFile moved to: {newPath}");

        var info = new FileInfo(newPath);
        Console.WriteLine($"Size: {info.Length} bytes");
      }
    }
}

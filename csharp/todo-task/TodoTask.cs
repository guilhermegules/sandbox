namespace todo_task;

public class TodoTask(int id, string description)
{
    public int Id { get; set; } = id;
    public string Description { get; set; } = description;

    public override string ToString()
    {
        return $"{Id} - {Description}";
    }
}
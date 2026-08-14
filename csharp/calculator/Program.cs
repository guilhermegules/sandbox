static class Calculator
{
    public static int Add(int number1, int number2)
    {
        return number1 + number2;
    }

    public static int Sub(int number1, int number2)
    {
        return number1 - number2;
    }
    
    public static int Multiply(int number1, int number2)
    {
        return number1 * number2;
    }
    
    public static float Divide(float number1, float number2)
    {
        return number1 / number2;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(Calculator.Add(3, 4));
        Console.WriteLine(Calculator.Sub(5, 4));
        Console.WriteLine(Calculator.Multiply(5, 4));
        Console.WriteLine(Calculator.Divide(5, 4));
    }
}

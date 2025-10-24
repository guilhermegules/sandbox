class Program
{
    public static void Main()
    {
        Console.WriteLine(Factorial(5));
    }

    private static int Factorial(int number)
    {
        if (number == 0) return 1;
        return number * Factorial(number - 1);
    }
}
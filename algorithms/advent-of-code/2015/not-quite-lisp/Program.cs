void ReadFile()
{
    var filePath = "/home/guilherme/workspace/not-quite-lisp/not-quite-lisp-data.txt";
    var lines = File.ReadAllLines(filePath);
    var floor = 0;
    var position = 0;
    var isPositionSet = false;

    foreach (var line in lines)
    {
        var chars = line.Select(l => l.ToString()).ToArray();
        foreach (var character in chars)
        {
            if (!isPositionSet)
            {
                position++;
            }
            
            switch (character)
            {
                case "(":
                    floor++;
                    break;
                case ")":
                    floor--;
                    break;
            }

            if (floor == -1)
            {
                isPositionSet = true;
            }
        }
    }
    
    Console.WriteLine("Floor: " + floor + ", Position: " + position + "");
}

ReadFile();
/*
Example

steps = 8 path = [DDUUUUDD]

The hiker first enters a valley 2 units deep. Then they climb out and up onto a mountain 2
units high. Finally, the hiker returns to sea level and ends the hike.

Function Description

Complete the countingValleys function in the editor below.

countingValleys has the following parameter(s):

    int steps: the number of steps on the hike
    string path: a string describing the path

Returns

    int: the number of valleys traversed

Input Format

The first line contains an integer steps, the number of steps in the hike.
The second line contains a single string path, of characters that describe the path.

Constraints

- 2 <= steś <= 1000000
- path[i] contains {U, D}

Sample Input

8
UDDDUDUU

Sample Output

1

Explanation

If we represent _ as sea level, a step up as /, and a step down as \, the hike can be drawn as:

_/\      _
   \    /
    \/\/

The hiker enters and leaves one valley.

*/
function countingValleys(steps, path) {
    const min = 2;
    const max = 1000000;
    const UPHILL = "U";
    const DOWNHILL = "D";
    const pathList = [...path];
    
    let isInValley = false;
    let valleys = 0;
    
    if(
        path.length >= min &&
        path.length <= max && 
        steps >= min &&
        steps <= max
    ) {
        pathList
        .map(step => step === UPHILL ? 1 : -1)
        .reduce((prevPath, nextPath) => {
            if(prevPath < 0 && !isInValley) {
                isInValley = true;
            }
            
            if((prevPath + nextPath) === 0 && isInValley) {
                valleys++;
                isInValley = false;
            }
            
            return prevPath + nextPath;
        })
    }
   
    return valleys;
}

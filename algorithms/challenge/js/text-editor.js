/**
 * L: move to the left
 * R: move to the right
 * B: remove the character on the left of the cursor
 */
function textEditor(commands) {
    const left = [];
    const right = [];

    for (const command of commands) {
        if (command === "L") {
            if (left.length > 0) {
                right.push(left.pop());
            }
        } else if (command === "R") {
            if (right.length > 0) {
                left.push(right.pop());
            }
        } else if (command === "B") {
            if (left.length > 0) {
                left.pop();
            }
        } else {
            left.push(command);
        }
    }

    return left.join("") + right.reverse().join("");
}

console.log(textEditor("abcLdeRfgB"));
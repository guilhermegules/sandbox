function generateParenthesis(n: number): string[] {
    const result: string[] = [];

    const checkParenthesis = (parenthesis: string, open: number, close: number) => {
        if (parenthesis.length === 2 * n) {
            result.push(parenthesis);
            return;
        }

        if (open < n) {
            checkParenthesis(parenthesis + "(", open + 1, close);
        }

        if (close < open) {
            checkParenthesis(parenthesis + ")", open, close + 1);
        }
    }

    checkParenthesis("", 0, 0);

    return result;
}

function generateParenthesis2(n: number): string[] {
    const result: string[] = [];
    const stack = [{ parenthesis: "", open: 0, close: 0 }];

    while (stack.length) {
        const { parenthesis, open, close } = stack.pop() ?? {};

        if (parenthesis?.length === 2 * n) {
            result.push(parenthesis);
            continue;
        }

        if (Number(open) < n) {
            stack.push({ parenthesis: parenthesis + "(", open: open! + 1, close: close! });
        }

        if (Number(close) < Number(open)) {
            stack.push({ parenthesis: parenthesis + ")", open: open!, close: close! + 1 });
        }
    }

    return result.toReversed();
}

console.log(generateParenthesis(3));
console.log(generateParenthesis2(3));
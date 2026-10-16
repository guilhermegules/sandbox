type Graph<T> = Map<T, T[]>;

function recursiveDfs<T>(graph: Graph<T>, current: T, visited = new Set<T>()): T[] {
    visited.add(current);
    const traversalOrder = [current];

    const neighbors = graph.get(current) || [];

    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            traversalOrder.push(...recursiveDfs(graph, neighbor, visited));
        }
    }

    return traversalOrder;
}

function dfs<T>(graph: Graph<T>, start: T): T[] {
    const visited = new Set<T>();
    const stack: T[] = [start];
    const traversalOrder: T[] = [];

    while (stack.length > 0) {
        const current = stack.pop()!;

        if (!visited.has(current)) {
            visited.add(current);
            traversalOrder.push(current);

            const neighbors = graph.get(current) || [];

            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }

    return traversalOrder;
}

const graph: Graph<string> = new Map([
    ['A', ['B', 'C']],
    ['B', ['A', 'D', 'E']],
    ['C', ['A', 'F']],
    ['D', ['B']],
    ['E', ['B']],
    ['F', ['C']]
]);

console.log("DFS: ", dfs(graph, "F"));
console.log("Recursive DFS: ", recursiveDfs(graph, "F"));
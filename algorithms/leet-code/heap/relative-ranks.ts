function findRelativeRanks(score: number[]): string[] {
    const placements = new Map<number, number>();

    score.forEach((s, i) => {
        placements.set(s, i);
    });

    const placementOrdered = new Map<number, string>();

    [...placements]
        .sort(([a], [b]) => b - a)
        .forEach(([_, originalIndex], index) => {
            if (index === 0) {
                placementOrdered.set(originalIndex, "Gold Medal");
                return;
            }

            if (index === 1) {
                placementOrdered.set(originalIndex, "Silver Medal");
                return;
            }

            if (index === 2) {
                placementOrdered.set(originalIndex, "Bronze Medal");
                return;
            }

            placementOrdered.set(originalIndex, `${index + 1}`);
        });

    return [...placementOrdered].sort(([a], [b]) => a - b).map(([_, v]) => v);
};

function findRelativeRanks2(score: number[]): string[] {
    const n = score.length;

    const athletes = score.map((s, i) => [s, i] as [number, number]).toSorted(([a], [b]) => b - a);

    const result: string[] = new Array(n);

    for (let i = 0; i < n; i++) {
        const originalIndex = athletes[i][1];

        if (i === 0) result[originalIndex] = "Gold Medal";
        else if (i === 1) result[originalIndex] = "Silver Medal";
        else if (i === 2) result[originalIndex] = "Bronze Medal";
        else result[originalIndex] = (i + 1).toString();
    }

    return result;
}


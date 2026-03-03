const locations = [
  { id: "A", x: 10, y: 20 },
  { id: "B", x: 1, y: 2 },
  { id: "C", x: 5, y: 5 },
  { id: "D", x: 1, y: 1 }
];

const center = { x: 0, y: 0 };

function getClosest(points, target, k) {
    return points.map(p => {
        const distanceX = Math.pow(p.x - target.x, 2);
        const distanceY = Math.pow(p.y - target.y, 2);
        const distance = Math.sqrt(distanceX + distanceY);
        return { ...p, distance }
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
}

console.log(getClosest(locations, center, 2));
const access = [
  { in: 1, out: 4 },
  { in: 2, out: 5 },
  { in: 10, out: 15 },
  { in: 3, out: 10 },
];

function checkAccess(access) {
  let events = [];

  access.forEach((a) => {
    events.push({ time: a.in, type: 1 });
    events.push({ time: a.out, type: -1 });
  });

  events.sort((a, b) => a.time - b.time || a.type);

  let maxCurrentAccess = 0;
  let currentAccess = 0;

  for (let event of events) {
    currentAccess += event.type;
    if (currentAccess > maxCurrentAccess) {
        maxCurrentAccess = currentAccess;
    }
  }

  return maxCurrentAccess;
}

console.log(checkAccess(access));

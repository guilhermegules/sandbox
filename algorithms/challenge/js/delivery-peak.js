function deliveryPeak(trips) {
  const events = [];

  trips.forEach((trip) => {
    events.push({ trip: trip.start, type: 1 });
    events.push({ trip: trip.end, type: -1 });
  });

  events.sort((a, b) => a.trip - b.trip || a.type);

  let deliveryPeak = 0;
  let currentTrip = 0;

  for (const { type } of events) {
    currentTrip += type;
    if (currentTrip > deliveryPeak) {
        deliveryPeak = currentTrip;
    }
  }

  return deliveryPeak;
}

const trips = [
  { start: 10, end: 12 },
  { start: 11, end: 13 },
  { start: 12, end: 15 },
];

console.log(deliveryPeak(trips));

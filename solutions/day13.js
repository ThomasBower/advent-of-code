'use strict'

const parse = input => {
  const [timestamp, ids] = input.split('\n')
  return [Number(timestamp), ids.split(',').map(id => parseInt(id))];
}

const absmod = (a, n) => {
  while (a < 0) {
      a += n;
  }
  return a % n;
}

const part1 = input => {
  const [timestamp, buses] = parse(input);
  const filteredBuses = buses.filter(bus => !Number.isNaN(bus));
  const nextStops = filteredBuses.map(b => absmod(b - timestamp, b))
  return Math.min(...nextStops)
    * filteredBuses[nextStops.indexOf(Math.min(...nextStops))];
}

const part2 = input => {
  const buses = parse(input)[1].map((id, i) => ({ id, i }))
    .filter(bus => !Number.isNaN(bus.id))
    .sort((b1, b2) => b2.id - b1.id)
    .map(bus => ({
      id: bus.id,
      offset: absmod(bus.id - bus.i, bus.id)
    }));
  let timestamp = buses[0].id;
  let offset = buses[0].offset;
  for (let i = 1; i < buses.length; i++) {
      const bus = buses[i];
      while (offset % bus.id !== bus.offset) {
          offset += timestamp;
      }
      timestamp *= bus.id;
  }
  return offset;
}

module.exports = { part1, part2 }

'use strict'

const total = 2020;

const part1 = data => {
  const entries = data.split('\n')
    .map(n => parseInt(n));

  const seen = new Set();
  for (const entry of entries) {
    const addend = total - entry;
    if (seen.has(addend)) {
      return entry * addend;
    }
    seen.add(entry);
  }
  return -1;
}

const part2 = data => {
  let left, right;
  const entries = data.split('\n')
    .map(n => parseInt(n)).sort((a, b) => a - b);

  for (let i = 0; i < entries.length - 2; i++) {
    left = i + 1;
    right = entries.length - 1;
    while (left < right) {
      const sum = entries[i] + entries[right] + entries[left];
      if (sum === total) {
        return entries[i] * entries[right] * entries[left];
      } else if (sum < total) {
        left++;
      } else {
        right--;
      }
    }
  }
  return -1;
}

module.exports = { part1, part2 }

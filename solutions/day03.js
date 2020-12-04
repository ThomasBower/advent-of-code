'use strict'

const treesHit = (input, down, across) => {
  const rows = input.split('\n'), tree = '#';
  let treesHit = 0;
  for (let y = 0, x = 0; y < rows.length; y += down, x += across) {
    if (rows[y][x % rows[y].length] === tree) {
      treesHit++;
    }
  }
  return treesHit;
}

const part1 = input => treesHit(input, 1, 3)

const part2 = input => [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]
  .reduce((product, [down, across]) => product * treesHit(input, down, across), 1);

module.exports = { part1, part2 }

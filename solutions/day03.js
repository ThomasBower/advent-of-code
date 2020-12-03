'use strict'

const tree = '#';

const treesHit = (input, down, across) => {
  const rows = input.split('\n');
  let treesHit = 0;
  for (let x = 0, y = 0; x < rows.length; x += down, y += across) {
    if (rows[x][y % rows[x].length] === tree) {
      treesHit++;
    }
  }
  return treesHit;
}

const part1 = input => treesHit(input, 1, 3)

const part2 = input => [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]
  .reduce((product, [down, across]) => product * treesHit(input, down, across), 1);

module.exports = { part1, part2 }

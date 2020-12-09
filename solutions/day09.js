'use strict'

const parse = input => input.split('\n').map(line => Number(line));
const windowSize = 25;

const findInvalid = nums => {
  for (let i = windowSize; i < nums.length; i++) {
    let sums = nums.slice(i - windowSize, i)
      .map((n1, j) => nums.slice(i - windowSize + j + 1, i)
        .map(n2 => n1 + n2)).flat();
    if (!sums.includes(nums[i])) {
      return nums[i];
    }
  }
  return -1;
}

const part1 = input => findInvalid(parse(input));

const part2 = input => {
  const nums = parse(input), target = findInvalid(nums);
  let left = 0, right = 0, sum = nums[0];
  while (right < nums.length && left < nums.length) {
    if (sum === target) {
      const range = nums.slice(left, right + 1);
      return Math.min(...range) + Math.max(...range);
    } else if (sum < target) {
      right++;
      sum += nums[right];
    } else {
      sum -= nums[left];
      left++;
    }
  }
  return -1;
}

module.exports = { part1, part2 }

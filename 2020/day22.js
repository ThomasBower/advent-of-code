'use strict'

const parse = input => input.split('\n\n')
  .map(player => player.split('\n').slice(1).map(line => Number(line)));

const score = cards => cards.reduce((p, c, i) => p + (cards.length - i) * c, 0);

const combat = (player1, player2, recursive = true) => {
  const previouslySeen = new Set();
  while (player1.length && player2.length) {
    const state = [player1, player2].map(arr => arr.toString()).join('|');
    if (previouslySeen.has(state)) {
      return { winner: 1, cards: player1 };
    }
    previouslySeen.add(state);

    const choice1 = player1.shift();
    const choice2 = player2.shift();

    let winner;
    if(recursive && player1.length >= choice1 && player2.length >= choice2) {
      const { winner: player } = combat(player1.slice(0, choice1),
        player2.slice(0, choice2));
      winner = player;
    } else {
      winner = choice1 > choice2 ? 1 : 2;
    }

    winner === 1 ? player1.push(choice1, choice2)
      : player2.push(choice2, choice1);
  }
  return {
    winner: player1.length ? 1 : 2,
    cards: player1.length ? player1 : player2
  };
}

const part1 = input => (([player1, player2]) =>
  score(combat(player1, player2, false).cards))(parse(input));

const part2 = input => (([player1, player2]) =>
  score(combat(player1, player2).cards))(parse(input));

module.exports = { part1, part2 }

function play(initialPos1, initialPos2) {

    let isplayer1Turn = true;
    let scores = [0, 0];
    let pos = [initialPos1, initialPos2];
    let dice = 1;
    let diceRollCount = 0;
    const goal = 1000;
    while (scores[0] < goal && scores[1] < goal) {
        const i = isplayer1Turn ? 0 : 1;
        pos[i] += dice + (dice + 1) + (dice + 2)
        dice += 3;
        diceRollCount += 3;
        pos[i] = pos[i] % 10;
        pos[i] = pos[i] == 0 ? 10 : pos[i];
        scores[i] += pos[i];
        isplayer1Turn = !isplayer1Turn;
    }
    console.log(diceRollCount, scores);

    return scores.filter(x => x < goal)[0] * diceRollCount;
}

function play2(initialPos1, initialPos2) {

    let isplayer1Turn = true;
    let scores = [0, 0];
    let pos = [initialPos1, initialPos2];
    let dice = 1;
    let diceRollCount = 0;
    const goal = 1000;
    while (scores[0] < goal && scores[1] < goal) {
        const i = isplayer1Turn ? 0 : 1;
        pos[i] += dice + (dice + 1) + (dice + 2)
        dice += 3;
        diceRollCount += 3;
        pos[i] = pos[i] % 10;
        pos[i] = pos[i] == 0 ? 10 : pos[i];
        scores[i] += pos[i];
        isplayer1Turn = !isplayer1Turn;
    }
    console.log(diceRollCount, scores);

    return scores.filter(x => x < goal)[0] * diceRollCount;
}

console.log(play(7, 6));
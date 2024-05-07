const calculatePoints = (matchData) => {
  const playerPoints = {};

  matchData.forEach((ball) => {
    const {
      batter,
      bowler,
      batsman_run,
      extras_run,
      total_run,
      isWicketDelivery,
      player_out,
      kind,
      fielders_involved,
    } = ball;

    // Batting points
    if (batter && batsman_run) {
      if (!playerPoints[batter]) {
        playerPoints[batter] = 0;
      }
      playerPoints[batter] += batsman_run;

      if (batsman_run === 4) {
        playerPoints[batter] += 1;
      } else if (batsman_run === 6) {
        playerPoints[batter] += 2;
      }

      if (batsman_run >= 30) {
        playerPoints[batter] += 4;
      }

      if (batsman_run >= 50) {
        playerPoints[batter] += 8;
      }

      if (batsman_run >= 100) {
        playerPoints[batter] += 16;
      }

      if (isWicketDelivery && kind === "caught") {
        playerPoints[batter] -= 2;
      }
    }

    // Bowling points
    if (bowler && isWicketDelivery) {
      if (!playerPoints[bowler]) {
        playerPoints[bowler] = 0;
      }
      playerPoints[bowler] += 25;

      if (kind === "lbw" || kind === "bowled") {
        playerPoints[bowler] += 8;
      }

      // Wicket-taking bonus
      const wicketCount = Object.values(playerPoints).filter(
        (points) => points >= 25
      ).length;
      if (wicketCount === 3) {
        playerPoints[bowler] += 4;
      } else if (wicketCount === 4) {
        playerPoints[bowler] += 8;
      } else if (wicketCount === 5) {
        playerPoints[bowler] += 16;
      }

      // Maiden over
      if (total_run === 0 && extras_run === 0) {
        playerPoints[bowler] += 12;
      }
    }

    // Fielding points
    if (isWicketDelivery && kind === "caught") {
      const fielder = fielders_involved;
      if (!playerPoints[fielder]) {
        playerPoints[fielder] = 0;
      }
      playerPoints[fielder] += 8;

      // Catch bonus
      const catchCount = Object.values(playerPoints).filter(
        (points) => points >= 8 && points < 25
      ).length;
      if (catchCount === 3) {
        playerPoints[fielder] += 4;
      }
    }

    if (isWicketDelivery && kind === "stumped") {
      const wicketKeeper = fielders_involved;
      if (!playerPoints[wicketKeeper]) {
        playerPoints[wicketKeeper] = 0;
      }
      playerPoints[wicketKeeper] += 12;
    }

    if (kind === "run out") {
      fielders_involved.forEach((fielder) => {
        if (!playerPoints[fielder]) {
          playerPoints[fielder] = 0;
        }
        playerPoints[fielder] += 6;
      });
    }
  });

  return playerPoints;
};

module.exports = calculatePoints;

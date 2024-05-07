const validateTeam = (players, captain, viceCaptain) => {
  // Check for 11 players
  if (players.length !== 11) {
    return false;
  }

  // Check for player types and count
  const playerTypes = {
    WK: 0,
    BAT: 0,
    AR: 0,
    BWL: 0,
  };

  players.forEach((player) => {
    const role = player.Role.toUpperCase();
    switch (role) {
      case "WICKETKEEPER":
        playerTypes.WK++;
        break;
      case "BATTER":
        playerTypes.BAT++;
        break;
      case "ALL-ROUNDER":
        playerTypes.AR++;
        break;
      case "BOWLER":
        playerTypes.BWL++;
        break;
      default:
        // Invalid role
        return false;
    }
  });

  // Check player count within limits
  if (
    playerTypes.WK < 1 ||
    playerTypes.WK > 8 ||
    playerTypes.BAT < 1 ||
    playerTypes.BAT > 8 ||
    playerTypes.AR < 1 ||
    playerTypes.AR > 8 ||
    playerTypes.BWL < 1 ||
    playerTypes.BWL > 8
  ) {
    return false;
  }

  // Check if captain and vice-captain are in the players list
  if (
    !players.some((player) => player.Player === captain) ||
    !players.some((player) => player.Player === viceCaptain)
  ) {
    return false;
  }

  return true;
};

module.exports = validateTeam;

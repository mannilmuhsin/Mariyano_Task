const TeamEntry = require("../models/teamEntry");
const validateTeam = require("../utils/validateTeam");
const parseData = require("../utils/parseData");
const calculatePoints = require("../utils/calculatePoints");

exports.addTeamEntry = async (req, res) => {
  try {
    const { teamName, players, captain, viceCaptain } = req.body;

    // Validate team entry
    const isValid = validateTeam(players, captain, viceCaptain);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid team selection" });
    }

    // Create new team entry
    const teamEntry = new TeamEntry({
      teamName,
      players,
      captain,
      viceCaptain,
    });

    await teamEntry.save();
    res.status(201).json({ message: "Team entry added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.processMatchResult = async (req, res) => {
  try {
    // Parse match data
    const matchData = parseData("data/match.json");

    // Calculate points for each player
    const playerPoints = calculatePoints(matchData);

    console.log(playerPoints);
    // Update team entries with calculated points
    const teamEntries = await TeamEntry.find();
    teamEntries.forEach(async (entry) => {
      let totalPoints = 0;
      entry.players.forEach((player) => {
        const points = playerPoints[player.Player] || 0;
        if (player === entry.captain) {
          totalPoints += points * 2;
        } else if (player === entry.viceCaptain) {
          totalPoints += points * 1.5;
        } else {
          totalPoints += points;
        }
      });
      console.log(totalPoints);
      entry.totalPoints = totalPoints;
      await entry.save();
    });

    res.status(200).json({ message: "Match results processed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewTeamsResult = async (req, res) => {
  try {
    // Get all team entries with their total points
    const teamEntries = await TeamEntry.find().sort({ totalPoints: -1 });

    // Find the top score
    const topScore = teamEntries[0].totalPoints;

    // Find the winning teams
    const winningTeams = teamEntries.filter(
      (entry) => entry.totalPoints === topScore
    );

    res.status(200).json({ winningTeams, teamEntries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.post('/add-team', teamController.addTeamEntry);
router.post('/process-result', teamController.processMatchResult);
router.get('/team-result', teamController.viewTeamsResult);

module.exports = router;
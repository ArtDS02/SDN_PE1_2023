const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const questionController = require('../controllers/questionController');
const cors = require("cors");

// Apply CORS middleware to the entire router
router.use(cors());

// Define routes
router.get('/', questionController.getAllQuestions);
router.post('/',authenticateToken, questionController.createQuestion);
router.put('/', questionController.NotSupportCase);
router.delete('/', questionController.NotSupportCase);

router.get('/:id/', questionController.getQuestionById);
router.post('/:id/',questionController.NotSupportCase);
router.put('/:id/',authenticateToken, questionController.updateQuestionById);
router.delete('/:id/',authenticateToken, questionController.deleteQuestionById);

module.exports = router;

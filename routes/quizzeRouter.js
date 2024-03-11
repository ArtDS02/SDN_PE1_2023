const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const QuizController = require('../controllers/QuizController');
const cors = require("cors");

// Apply CORS middleware to the entire router
router.use(cors());

// Define routes
router.get('/', QuizController.getQuyiz);
router.post('/',authenticateToken, QuizController.addQuiz);
router.put('/',authenticateToken, QuizController.NotSupportCase);
router.delete('/',authenticateToken, QuizController.NotSupportCase);

router.get('/:id/', QuizController.getQuyizById);
router.post('/:id/',authenticateToken, QuizController.NotSupportCase);
router.put('/:id/',authenticateToken, QuizController.UpdateQuyizById);
router.delete('/:id/',authenticateToken, QuizController.DeleteQuyizById);

router.get('/:id/populate', QuizController.getMatchQuestion);


module.exports = router;

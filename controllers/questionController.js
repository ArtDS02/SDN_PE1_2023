const Question = require('../models/Question');

const createQuestion = async (req, res) => {
    const { text, options, correctAnswerIndex } = req.body;

    try {
        const question = new Question({
            text,
            options,
            correctAnswerIndex
        });

        await question.save();

        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getQuestionById = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found', id });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateQuestionById = async (req, res) => {
    const { id } = req.params;
    const { text, options, correctAnswerIndex } = req.body;

    try {
        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.text = text;
        question.options = options;
        question.correctAnswerIndex = correctAnswerIndex;

        await question.save();

        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteQuestionById = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findByIdAndDelete(id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const NotSupportCase = async (req, res) => {

    try {
        res.status(200).json({ message: 'Not Available NoW' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestionById,
    deleteQuestionById,
    NotSupportCase
};

const jwt = require('jsonwebtoken');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

const addQuiz = async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        // Tìm các câu hỏi trong bảng Question dựa trên các ID được cung cấp
        const foundQuestions = await Question.find({ _id: { $in: questions } });

        // Tạo một mảng chứa các câu hỏi đã tìm được
        const foundQuestionsIds = foundQuestions.map(question => question._id.toString());

        // Tạo một mảng để lưu trữ ID của các câu hỏi không tìm thấy
        const notFoundQuestionsIds = questions.filter(questionId => !foundQuestionsIds.includes(questionId));

        // Kiểm tra nếu có các câu hỏi không tìm thấy, thông báo cho người dùng
        if (notFoundQuestionsIds.length > 0) {
            console.log(`Some questions are not found: ${notFoundQuestionsIds}`);
        }

        // Tạo mới một đối tượng quiz với các thông tin như title, description và các câu hỏi đã tìm được
        const quiz = new Quiz({
            title,
            description,
            questions: foundQuestions // Gán các câu hỏi đã tìm được cho trường questions của đối tượng quiz
        });

        // Lưu đối tượng quiz vào cơ sở dữ liệu
        await quiz.save();

        // Trả về đối tượng quiz đã được lưu
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getQuyiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuyizById = async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await Quiz.findById(id).populate('questions');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateQuyizById = async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DeleteQuyizById = async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await Quiz.findByIdAndDelete(id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const NotSupportCase = async (req, res) => {
    try {
        res.json({ message: 'This Method Is Not Available Now' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

const getMatchQuestion = async (req, res) => {
    const { id } = req.params;
    try {

        // Tìm kiếm quiz với id được cung cấp
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found', id });
        }

        // Tìm kiếm tất cả các câu hỏi trong quiz
        const questions = await Question.find({ _id: { $in: quiz.questions } });

        // Lọc ra các câu hỏi có từ khóa "capital"
        const capitalQuestions = questions.filter(question => {
            return question.text.toLowerCase().includes('capital');
        });

        res.json(capitalQuestions);
    } catch (error) {
        res.status(500).json({ message: error.message, id });
    }
};



module.exports = {
    addQuiz,
    getQuyiz,
    getQuyizById,
    UpdateQuyizById,
    DeleteQuyizById,
    NotSupportCase,
    getMatchQuestion
};

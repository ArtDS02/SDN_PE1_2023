const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: {
    type: [String], // Mảng các lựa chọn
    required: true
  },
  correctAnswerIndex: {
    type: Number, // Chỉ mục của câu trả lời đúng trong mảng lựa chọn
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const quizzeRoutes = require('./routes/quizzeRouter');
const questionRouter = require('./routes/questionRouter');


const app = express();

mongoose.connect('mongodb://localhost:27017/SimpleQuiz', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});


app.use(express.json());
app.use(bodyParser.json());

app.use('/quizz', quizzeRoutes);
app.use('/question', questionRouter);
app.use('/user', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

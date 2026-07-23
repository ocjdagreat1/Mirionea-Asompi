import Question from "../models/question.js";

// Get all questions
export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().sort({ prize: 1 });

        res.status(200).json({
            success: true,
            count: questions.length,
            questions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create question
export const createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);

        res.status(201).json({
            success: true,
            question
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update question
export const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        res.status(200).json({
            success: true,
            question
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete question
export const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        await question.deleteOne();

        res.status(200).json({
            success: true,
            message: "Question deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
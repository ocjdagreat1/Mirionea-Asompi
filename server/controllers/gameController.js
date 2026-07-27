import Game from "../models/game.js";
import Question from "../models/question.js";
import prizeLadder from "../utils/prizeLadder.js";

// Start a new game
export const startGame = async (req, res) => {
    try {

        const selectedQuestions = [];

        for (const level of prizeLadder) {

            const question = await Question.aggregate([
                {
                    $match: {
                        difficulty: level.difficulty,
                        prize: level.prize
                    }
                },
                {
                    $sample: {
                        size: 1
                    }
                }
            ]);

            if (question.length === 0) {
                return res.status(400).json({
                    message: `No question found for ₦${level.prize}`
                });
            }

            selectedQuestions.push(question[0]);
        }

        const game = await Game.create({
            user: req.user.id,
            questions: selectedQuestions.map(q => q._id),
            currentQuestion: 0,
            score: 0,
            amountWon: 0,
            completed: false,
            gameStatus: "playing"
        });

        const firstQuestion = {
            _id: selectedQuestions[0]._id,
            question: selectedQuestions[0].question,
            options: selectedQuestions[0].options,
            prize: selectedQuestions[0].prize,
            difficulty: selectedQuestions[0].difficulty
        };

        res.status(201).json({
            success: true,
            gameId: game._id,
            question: firstQuestion
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
//submit answer
export const submitAnswer = async (req, res) => {

  const { gameId, answerIndex } = req.body;

  try {

    const game = await Game.findById(gameId);

    if (!game)
      return res.status(404).json({ message: "Game not found" });

    const questionId = game.questions[game.currentQuestion];

    const question = await Question.findById(questionId);

    const isCorrect = question.correctAnswer === answerIndex;
    const correctAnswer = question.correctAnswer;

    game.answers.push({
      questionId,
      selectedAnswer: answerIndex,
      isCorrect,
    });

    if (!isCorrect) {
      game.completed = true;
      game.gameStatus = "lost";
      await game.save();

      return res.json({
        success: false,
        message: "Wrong Answer",
        amountWon: game.amountWon,
        correctAnswer,
      });
    }

    game.score += 1;
    game.amountWon = question.prize;
    game.currentQuestion += 1;

    if (game.currentQuestion === 15) {
      game.completed = true;
      game.gameStatus = "won";
      await game.save();

      return res.json({
        success: true,
        winner: true,
        amountWon: game.amountWon,
         correctAnswer,
      });
    }

    await game.save();

    const nextQuestion = await Question.findById(
      game.questions[game.currentQuestion]
    );

    res.json({
      success: true,
      nextQuestion,
      amountWon: game.amountWon,
       correctAnswer,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

};

//walk away

export const walkAway = async (req, res) => {

  const { gameId } = req.body;

  const game = await Game.findById(gameId);

  game.completed = true;
  game.gameStatus = "quit";

  await game.save();

  res.json({
    success: true,
    amountWon: game.amountWon,
    message: "You walked away safely!",
  });

};

//game  history
export const gameHistory = async (req, res) => {

  const games = await Game.find({
    user: req.user.id,
  }).sort({
    createdAt: -1,
  });

  res.json(games);

};

/*50 50 implementation*/
export const useFiftyFifty = async (req, res) => {
  try {
    const { gameId } = req.body;

    // Find the game
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    // Ensure the game is still active
    if (game.completed || game.gameStatus !== "playing") {
      return res.status(400).json({
        success: false,
        message: "This game has already ended",
      });
    }

    // Check if the lifeline has already been used
    if (!game.lifelines.fiftyFifty) {
      return res.status(400).json({
        success: false,
        message: "50:50 lifeline has already been used",
      });
    }

    // Get the current question
    const question = await Question.findById(
      game.questions[game.currentQuestion]
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const correctIndex = question.correctAnswer;

    // Get indexes of all wrong answers
    const wrongIndexes = [0, 1, 2, 3].filter(
      (index) => index !== correctIndex
    );

    // Shuffle wrong answers
    for (let i = wrongIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrongIndexes[i], wrongIndexes[j]] = [
        wrongIndexes[j],
        wrongIndexes[i],
      ];
    }

    // Keep one wrong answer
    const randomWrong = wrongIndexes[0];

    // Remaining answers (sorted)
    const remainingIndexes = [correctIndex, randomWrong].sort(
      (a, b) => a - b
    );

    // Mark lifeline as used
    game.lifelines.fiftyFifty = false;
    await game.save();

    return res.status(200).json({
      success: true,
      message: "50:50 activated",
      remainingIndexes,
    });

  } catch (error) {
    console.error("50:50 Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*ask the audience logic*/
export const askAudience = async (req, res) => {
  try {
    const { gameId } = req.body;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    if (game.completed || game.gameStatus !== "playing") {
      return res.status(400).json({
        success: false,
        message: "This game has ended",
      });
    }

    if (!game.lifelines.askAudience) {
      return res.status(400).json({
        success: false,
        message: "Ask the Audience has already been used",
      });
    }

    const question = await Question.findById(
      game.questions[game.currentQuestion]
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const correct = question.correctAnswer;

    let correctPercentage;

    switch (question.difficulty) {
      case "easy":
        correctPercentage = Math.floor(Math.random() * 21) + 70;
        break;

      case "medium":
        correctPercentage = Math.floor(Math.random() * 21) + 50;
        break;

      default:
        correctPercentage = Math.floor(Math.random() * 16) + 35;
    }

    const remaining = 100 - correctPercentage;

    let a = Math.floor(Math.random() * (remaining + 1));
    let b = Math.floor(Math.random() * (remaining - a + 1));
    let c = Math.floor(Math.random() * (remaining - a - b + 1));
    let d = remaining - a - b - c;

    const wrongVotes = [a, b, c, d];

    wrongVotes.splice(correct, 1);

    const poll = [];

    let wrongIndex = 0;

    for (let i = 0; i < 4; i++) {
      if (i === correct) {
        poll.push(correctPercentage);
      } else {
        poll.push(wrongVotes[wrongIndex]);
        wrongIndex++;
      }
    }

    game.lifelines.askAudience = false;

    await game.save();

    res.json({
      success: true,
      poll,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*phone a friend  logic*/
export const phoneFriend = async (req, res) => {
  try {
    const { gameId } = req.body;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    if (game.completed || game.gameStatus !== "playing") {
      return res.status(400).json({
        success: false,
        message: "This game has already ended",
      });
    }

    if (!game.lifelines.phoneFriend) {
      return res.status(400).json({
        success: false,
        message: "Phone a Friend has already been used",
      });
    }

    const question = await Question.findById(
      game.questions[game.currentQuestion]
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const correctIndex = question.correctAnswer;

    // Friend's confidence depends on difficulty
    let chance;

    switch (question.difficulty) {
      case "easy":
        chance = 95;
        break;

      case "medium":
        chance = 75;
        break;

      default:
        chance = 55;
    }

    let suggestedIndex;

    if (Math.random() * 100 < chance) {
      suggestedIndex = correctIndex;
    } else {
      const wrongIndexes = [0, 1, 2, 3].filter(
        (i) => i !== correctIndex
      );

      suggestedIndex =
        wrongIndexes[Math.floor(Math.random() * wrongIndexes.length)];
    }

    const letters = ["A", "B", "C", "D"];

    const messages = [
      `I'm quite confident it's ${letters[suggestedIndex]}.`,
      `I'd go with ${letters[suggestedIndex]}.`,
      `Hmm... I think it's ${letters[suggestedIndex]}.`,
      `If I had to choose, I'd say ${letters[suggestedIndex]}.`,
      `I'm fairly sure the answer is ${letters[suggestedIndex]}.`,
    ];

    const message =
      messages[Math.floor(Math.random() * messages.length)];

    game.lifelines.phoneFriend = false;
    await game.save();
const confidence =
  question.difficulty === "easy"
    ? Math.floor(Math.random() * 6) + 90
    : question.difficulty === "medium"
    ? Math.floor(Math.random() * 16) + 70
    : Math.floor(Math.random() * 21) + 50;

res.json({
  success: true,
  answer: letters[suggestedIndex],
  confidence,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
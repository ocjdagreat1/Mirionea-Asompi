import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Question from "../models/question.js";

dotenv.config();
await connectDB();

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Transfer Machine Language",
      "Home Tool Markup Language",
      "Hyperlink Transfer Markup Language"
    ],
    correctAnswer: 0,
    prize: 500,
    difficulty: "easy",
    category: "Technology"
  },
  {
    question: "Which company developed JavaScript?",
    options: [
      "Microsoft",
      "Netscape",
      "Google",
      "Apple"
    ],
    correctAnswer: 1,
    prize: 1000,
    difficulty: "easy",
    category: "Technology"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: 1,
    prize: 2000,
    difficulty: "easy",
    category: "Science"
  },
  {
    question: "What is the capital city of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    correctAnswer: 2,
    prize: 4000,
    difficulty: "easy",
    category: "Geography"
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    prize: 10000,
    difficulty: "easy",
    category: "Geography"
  },
  {
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "Python", "CSS", "Java"],
    correctAnswer: 2,
    prize: 20000,
    difficulty: "medium",
    category: "Technology"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctAnswer: 2,
    prize: 40000,
    difficulty: "medium",
    category: "Geography"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain"
    ],
    correctAnswer: 0,
    prize: 80000,
    difficulty: "medium",
    category: "Literature"
  },
  {
    question: "Which data structure follows the First In, First Out (FIFO) principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: 1,
    prize: 160000,
    difficulty: "medium",
    category: "Technology"
  },
  {
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    prize: 320000,
    difficulty: "medium",
    category: "Mathematics"
  },
  {
    question: "Who developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Nikola Tesla",
      "Galileo Galilei"
    ],
    correctAnswer: 1,
    prize: 640000,
    difficulty: "hard",
    category: "Science"
  },
  {
    question: "Which country is home to the Great Pyramid of Giza?",
    options: ["Greece", "Mexico", "Egypt", "India"],
    correctAnswer: 2,
    prize: 1250000,
    difficulty: "hard",
    category: "History"
  },
  {
    question: "In JavaScript, which keyword is used to declare a constant?",
    options: ["var", "let", "const", "static"],
    correctAnswer: 2,
    prize:2500000 ,
    difficulty: "hard",
    category: "Technology"
  },
  {
    question: "Which gas makes up about 78% of Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 1,
    prize: 5000000,
    difficulty: "hard",
    category: "Science"
  },
  {
    question: "Which sorting algorithm has an average time complexity of O(n log n)?",
    options: [
      "Bubble Sort",
      "Insertion Sort",
      "Merge Sort",
      "Selection Sort"
    ],
    correctAnswer: 2,
    prize: 10000000,
    difficulty: "hard",
    category: "Technology"
  }
];

const seed = async () => {
  try {
    await Question.deleteMany();
    await Question.insertMany(questions);
    console.log("Questions seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
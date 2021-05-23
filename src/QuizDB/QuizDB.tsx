import { v4 as uuidv4 } from "uuid";

export type Options = {
  id: string;
  text: string;
  isRight: boolean;
};

export type Questions = {
  id: string;
  question: string;
  points: number;
  negativePoints: number;
  options: Options[];
};

export type Quiz = {
  id: string;
  topic: string;
  description: string;
  playTime: number;
  image: string;
  questions: Questions[];
};

export type QuizDatabase = Quiz[];

export const quizdatabase: QuizDatabase = [
  {
    id: uuidv4(),
    topic: "Friends",
    description: "Let's play Cricket Quiz !",
    playTime: 3,
    image: "https://i.ibb.co/Xt5V8zW/download.jpg",
    questions: [
      {
        id: uuidv4(),
        question: "Wankhede stadium is located in?",
        points: 10,
        negativePoints: -1,
        options: [
          {
            id: uuidv4(),
            text: "Mumbai",
            isRight: true,
          },
          {
            id: uuidv4(),
            text: "delhi",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "Pune",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "Bangalore",
            isRight: false,
          },
        ],
      },
      {
        id: uuidv4(),
        question: "cricketer to win three top ICC honours in the same year?",
        points: 10,
        negativePoints: -1,
        options: [
          {
            id: uuidv4(),
            text: "Sachin Tendulkar",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "Ajinkya Rahane",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "M.S Dhoni",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "Virat Kohli",
            isRight: true,
          },
        ],
      },
    ],
  },
  // second
  {
    id: uuidv4(),
    topic: "Politics Quiz",
    description: "let's play politics quiz!",
    playTime: 3,
    image: "https://i.ibb.co/Xt5V8zW/download.jpg",
    questions: [
      {
        id: uuidv4(),
        question:
          "What is the minimum age to be appointed as the Chief Minister of a state?",
        points: 10,
        negativePoints: -1,
        options: [
          {
            id: uuidv4(),
            text: "20 year",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "25 year",
            isRight: true,
          },
          {
            id: uuidv4(),
            text: "30 year",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "35 year",
            isRight: false,
          },
        ],
      },
      {
        id: uuidv4(),
        question: "Who is first woman president?",
        points: 10,
        negativePoints: -1,
        options: [
          {
            id: uuidv4(),
            text: "Indira Gandhi.",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "Pratibha Patil",
            isRight: true,
          },
          {
            id: uuidv4(),
            text: "Sheila Dikshit.",
            isRight: false,
          },
          {
            id: uuidv4(),
            text: "Supriya Sule.",
            isRight: false,
          },
        ],
      },
    ],
  },
];

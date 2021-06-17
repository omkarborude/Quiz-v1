import { v4 as uuidv4 } from "uuid";

export type Options = {
  _id: string;
  text: string;
  isRight: boolean;
};

export type Questions = {
  _id: string;
  question: string;
  points: number;
  negativePoints: number;
  options: Options[];
};

export type Quiz = {
  _id: string;
  topic: string;
  description: string;
  playTime: number;
  image: string;
  questions: Questions[];
};

export type QuizDatabase = Quiz[];

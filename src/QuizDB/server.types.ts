export type quizOptions = {
  _id: string;
  text: string;
  isRight: Boolean;
};

export type quizquestion = {
  _id: string;
  question: string;
  points: Number;
  options: quizOptions[];
};

export type quizQuestions = {
  _id: string;
  topic: string;
  description: string;
  image: string;
  questions: quizquestion[];
};

export type ServerData = {
  questionlist: quizQuestions[];
};
export type serverErrorMessage = {
  errorMessage: string;
};

type scores = {
  _id: string;
  userId: string;
  username: string;
  quiz: string;
  score: Number;
  createdAt: string;
  updatedAt: string;
  __v: Number;
};
// for get scores : scores
export type ServerScores = {
  scores: scores[];
};

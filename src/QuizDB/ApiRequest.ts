import axios, { AxiosError } from "axios";

import { ServerData, serverErrorMessage, ServerScores } from "./server.types";

export async function ApiDataRequest(): Promise<
  ServerData | serverErrorMessage
> {
  try {
    const response = await axios.get<ServerData>(
      `https://neogquizbackend.omkarborude8354.repl.co/quiz/getquiz`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<serverErrorMessage>;
      if (serverError && serverError.response) return serverError.response.data;
    }
    return { errorMessage: "server down" };
  }
}

export async function ApiScoresRequest(): Promise<ServerScores | undefined> {
  try {
    const response = await axios.get<ServerScores>(
      `https://neogquizbackend.omkarborude8354.repl.co/score/getallscore`
    );
    return response.data;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

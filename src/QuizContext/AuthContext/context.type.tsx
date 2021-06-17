export type LoginData = {
  token: string;
  username: string;
  userId: string;
} | null;

export type UserState = {
  username: string;
  password: string;
  email: string;
};
export type AuthenticationContextType = {
  isUserLogin: boolean;
  loginData: LoginData;
  loginUser: (email: string, password: string) => void;
  signUpUser: (username: string, email: string, password: string) => any;
  logOutUser: () => void;
};

export type User = {
  id: number;
  username: string;
  email: string;
  image: string;
  isAdmin?: boolean;
  info: string;
};

export type State = {
  appSlice: AppSliceState;
};

export type AppSliceState = {
  darkMode: boolean;
  user: User;
  isOpend: boolean;
  signup: boolean | null;
  loading: boolean;
};

export interface UserCheckAction {
  type: 'FETCH_USER_CHECK';
  payload: {
    userId: string;
    isAuthenticated: boolean;
  };
}

export type Game = {
  id: number;
  gamename: string;
  genre: string;
  description: string;
  image: string;
};

export type MessageType = {
  id: number;
  text: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  User: User;
};

export type Entrie = {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Entries = Entrie[];

export type AppState = {
  session : Session
};

export type Session = {
  user?: User;
  connectedAt: number;
  admin: boolean;
};

export type User = {
  name: string;
  email: string;
  profileIcon: string;
};

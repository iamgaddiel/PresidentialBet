export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  state: string;
}

export type UserContextType = {
  user: User;
  registerUser: (user: User) => User;
  getUser: (id: string) => string;
  loginUser: (email: string, password: string) => User;
};

export type Candidate = {
  name: string;
  age: number;
  party: string;
  description: string;
};

export type UserCollectionType = {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  expand: {};
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  phone: string;
  state: string;
  updated: string;
  username: string;
  verified: boolean;
};

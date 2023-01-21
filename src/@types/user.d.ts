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
  getUserFromDB: (id: string) => string;
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
  hasSelected: boolean;
  selected_candidate: string;
  wallet_balance: number
};

export type CandidateType = {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  expand?: {};
  party: string;
  partyLogo: string;
  party_initials: string;
  updated: string;
  image: string;
  fullname: string;
  id: string;
  odds: number;
  votes: number;
};


export type StakeCollectionType = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  user: string;
  payout: string;
  candidate: string;
  stake: number;
  odd: number;
};

export type StakeDataType = {
  stake: number
  candidate: string
  payout: number
  user: string
}


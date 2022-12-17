import { atom } from "recoil";
import { UserCollectionType } from "./@types/user";
import { USERS_COLLECTION } from "./collections";

export type userAtomType = {
  key: string;
  default: UserCollectionType;
};

export const userAtom = atom({
  key: USERS_COLLECTION,
  default: {
    avatar: "",
    collectionId: "",
    collectionName: "",
    created: "",
    email: "",
    emailVisibility: false,
    expand: {},
    firstName: "",
    gender: "",
    id: "",
    lastName: "",
    phone: "",
    state: "",
    updated: "",
    username: "",
    verified: false,
  },
});

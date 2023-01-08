import { Storage, Drivers } from "@ionic/storage";
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { atom } from "recoil";
import { UserCollectionType } from "./@types/user";
import { CANDIDATES_COLLECTION, CANDIDATE_DETAILS, SELECTED_CANDIDATE_ID, USERS_COLLECTION } from "./keys";


export const storage = new Storage({
  name: '__presidentialBet',
  driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
})


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
    hasSelected: false,
  },
});

export const selectedCandidateAtom = atom({
  key: SELECTED_CANDIDATE_ID,
  default: ''
})

export const candidatesAtom = atom({
  key: CANDIDATES_COLLECTION,
  default: []
})

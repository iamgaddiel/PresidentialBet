import { Candidate, User } from "./user"

export type Transaction = {
    user: User,
    amount: string
    candidate: Candidate
    toWin: string
}
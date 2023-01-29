import Pocketbase from "pocketbase";
import {
  ACCOUNTS_COLLECTION,
  CANDIDATES_COLLECTION,
  PS_TEST_SB_KY,
  TRANSACTION_COLLECTION,
  USER,
  USERS_COLLECTION,
  WALLET_COLLECTION,
} from "../keys";
import { RegistrationFormType } from "../@types/forms";
import { useRecoilState } from "recoil";
import { storage, userAtom } from "../atom";
import useSettings from "./useSetting";
import { useEffect } from "react";
import useHttp from "./useHttp";

type BankAccountInputType = {
  bank: string;
  account_name: string;
  account_number: string;
  bvn: string;
};

const useAuth = () => {
  const { pbBaseUrl } = useSettings();
  const { _post, _get } = useHttp();
  const pb = new Pocketbase(pbBaseUrl);
  const [authUser, setAuthUser] = useRecoilState(userAtom);

  useEffect(() => {
    storage.create();
  }, []);

  const authenticateUser = async (email: string, password: string) => {
    try {
      const authData = await pb
        .collection(USERS_COLLECTION)
        .authWithPassword(email, password);
      return authData;
    } catch (err) {
      return err;
    }
  };

  const sendEmailVerification = async (email: string) => {
    return await pb.collection(USERS_COLLECTION).requestVerification(email);
  };

  const createUser = async (data: RegistrationFormType) => {
    try {
      return await pb.collection(USERS_COLLECTION).create(data);
    } catch (err: any) {
      return err;
    }
  };

  const getUserFromDB = async (id: string) => {
    const expand = `${CANDIDATES_COLLECTION}`;
    try {
      return await pb.collection(USERS_COLLECTION).getOne(id, { expand });
    } catch (err) {
      return err;
    }
  };

  const storeUser = async (user: any) => {
    await storage.set(USER, user);
  };

  async function clearStoredUser () {
    console.log("clearing")
    storage.remove(USER)
  }


  const getStoredUser = async () => {
    try {
      const user = await storage.get(USER);
      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const deleteStoredUser = async () => {
    await storage.clear()
  }

  
  const verifyBvn = async (data: BankAccountInputType) => {
    try {
      const req = JSON.stringify({
        ...data,
        bank_code: "044",
      });
      const url = "https://api.paystack.co/bvn/match";
      const headers = {
        Authorization: `Bearer ${PS_TEST_SB_KY}`,
      };
      const res = await _post(url, req, headers);
      return res;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const verifyUserAccount = async (account_number: string) => {
    // const url = `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`;
    try {
      const bank_code = "058";
      const url = `https://api.paystack.co/bank/resolve`;
      const headers = { Authorization: `Bearer ${PS_TEST_SB_KY}` };
      const params = { account_number, bank_code };
      const res = await _get(url, headers, params);
      return res;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const logoutUser = async () => {
    pb.authStore.clear();
  };

  const resetPassword = (collection: string, email: string) => {
    pb.collection(collection).requestPasswordReset(email)
    return true
  }

  return {
    pb,
    authenticateUser,
    sendEmailVerification,
    createUser,
    getUserFromDB,
    logoutUser,
    setAuthUser,
    authUser,
    storeUser,
    getStoredUser,
    verifyBvn,
    verifyUserAccount,
    resetPassword,
    deleteStoredUser,
    clearStoredUser
  };
};

export default useAuth;

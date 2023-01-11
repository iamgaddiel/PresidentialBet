import { CapacitorHttp, HttpResponse } from "@capacitor/core";

const useHttp = () => {
  const _get = async (url: string, headers?: {}, params?: {}) => {
    const options = {
      url,
      headers: { "Content-Type": "Application/json", ...headers },
      params
    };
  
    try {
      const res: HttpResponse = await CapacitorHttp.get(options);
      return res;
    } catch (err: any) {
      throw new Error(err);
    }

  };

  // const _getWithParams = async (url: string, params: {}, headers: {}) => {};

  const _post = async (url: string, data: {}, headers?: {}) => {
    const options = {
      url,
      headers: { "Content-Type": "Application/json", ...headers },
      data,
    };

    try {
      const res: HttpResponse = await CapacitorHttp.post(options);
      return res;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const _put = async () => {};

  const _delete = async () => {};

  return {
    _get,
    // _getWithParams,
    _post,
    _put,
    _delete,
  };
};

export default useHttp;

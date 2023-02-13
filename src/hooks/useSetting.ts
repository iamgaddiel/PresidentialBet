import { useState } from "react";


const useSettings = () => {

  const DEBUG = false

  const [pbBaseUrl, _] = useState(DEBUG ? 'http://127.0.0.1:8090' : 'https://presidential-game.pockethost.io')
  // My Test Flutterwave : Progress Flutterwave
  // const FLUTTERWAVE_PK_KEY = DEBUG ? "FLWPUBK_TEST-e4020148ae955208545a7b6f3e0424e6-X" : "FLWPUBK-4241d36b0720c0c52ec501c60a4d105c-X"
  
  // My Test Flutterwave |Fingerprint Public Key
  const FLUTTERWAVE_PK_KEY = DEBUG ? "FLWPUBK_TEST-e4020148ae955208545a7b6f3e0424e6-X" : "FLWPUBK-38897a4fab2b8de14ed65a03c5767645-X"
  



  return {
    pbBaseUrl,
    FLUTTERWAVE_PK_KEY,
    DEBUG
  };
};

export default useSettings;

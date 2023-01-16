import { useState } from "react";


const useSettings = () => {

  const DEBUG = false

  const [pbBaseUrl, _] = useState(DEBUG ? 'http://127.0.0.1:8090' : 'https://presidential-game.pockethost.io')

  // const FLUTTERWAVE_PK_KEY = DEBUG ? "FLWPUBK_TEST-e4020148ae955208545a7b6f3e0424e6-X" : "FLWPUBK-c6d3da304edade592df099e23328ff15-X"
  const FLUTTERWAVE_PK_KEY = "FLWPUBK_TEST-e4020148ae955208545a7b6f3e0424e6-X"



  return {
    pbBaseUrl,
    FLUTTERWAVE_PK_KEY,
    DEBUG
  };
};

export default useSettings;

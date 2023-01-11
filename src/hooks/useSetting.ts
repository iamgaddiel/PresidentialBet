import { useState } from "react";


const useSettings = () => {
  
  const DEBUG = true

  const [pbBaseUrl, _] = useState(DEBUG ? 'http://127.0.0.1:8090' : 'https://presidentialbet.pockethost.io')

  return {
    pbBaseUrl,
    DEBUG
  };
}; 

export default useSettings;

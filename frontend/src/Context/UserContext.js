import { createContext, useState } from 'react';

export const UserContext = createContext({
  showSectionCreation: "",
  setUserName: () => {
    // EMPTY
  }
});


export const useUserContext = () => {
  const [username, setUserName] = useState("");


  return {
    username, setUserName
  };
};

import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

//Firebase Config
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user)
    });
    return () => unsubscribe
  }, []);

  if (user === false) return <p>Loading...</p>;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

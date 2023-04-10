import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirectActiveUser = ( user , path) => {
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate(path);
  }, [user]);
};

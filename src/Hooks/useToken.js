import { useEffect, useState } from "react";
import axiosPrivet from "./axiosPrivet";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const [tokenLoading, setTokenLoading] = useState(true);

  const email = user?.email || user?.user?.email;
  const name = user?.displayName || user?.user?.displayName;
  const currentUser = { name: name, email: email, status: "active" };
  // console.log(user, currentUser);
  useEffect(() => {
    (async () => {
      if (email && name) {
        const { data } = await axiosPrivet.put(`user/login`, currentUser);
        // console.log(data);
        if (data?.token) {
          localStorage.setItem("accessToken", data?.token);
          setToken(data?.token);
          setTokenLoading(false);
        } else {
          setTokenLoading(false);
        }
      }
      if (!user) {
        setTokenLoading(false);
      }
    })();
  }, [user, currentUser, email, name]);

  return [token, tokenLoading, setTokenLoading];
};

export default useToken;

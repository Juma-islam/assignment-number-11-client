import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRoles = () => {
  const fetchAxios = useAxios();
  const { firebaseUser } = useAuth();
  const { data: logInUser } = useQuery({
    queryKey: ["role", firebaseUser?.email],
    queryFn: async () => {
      const res = await fetchAxios.get(`/users?email=${firebaseUser.email}`);
      return res.data;
    },
  });
  const user = logInUser;
  return user;
};

export default useRoles;

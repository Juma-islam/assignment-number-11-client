import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRoles = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const { data: logInUser } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  const users = logInUser;
  return users;
};

export default useRoles;

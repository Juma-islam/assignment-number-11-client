import React from "react";

import ManagerApprovalPending from "../../components/ManagerApprovalPending/ManagerApprovalPending";
import useRoles from "../../hooks/useRoles";

const ManageProducts = () => {
  const user = useRoles();

  if ((user?.role === "manager") & (user?.status === "pending"))
    return <ManagerApprovalPending></ManagerApprovalPending>;

  return <div>ManageProducts</div>;
};

export default ManageProducts;

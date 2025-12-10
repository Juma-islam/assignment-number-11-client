import React from 'react'
import useRoles from '../../hooks/useRoles'
import ManagerApprovalPending from '../ManagerApprovalPending/ManagerApprovalPending'


const ApprovedOrders = () => {

    const user = useRoles()

    if (user?.role === "manager" & user?.status === "pending") return <ManagerApprovalPending></ManagerApprovalPending>

    return (
        <div>ApprovedOrders</div>
    )
}

export default ApprovedOrders
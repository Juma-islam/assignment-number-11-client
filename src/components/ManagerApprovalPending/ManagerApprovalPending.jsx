import React from 'react'
import { useNavigate } from 'react-router'

const ManagerApprovalPending = () => {
    const navigate = useNavigate()
    
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
                <h2 className="text-3xl font-semibold text-yellow-500">Approval Pending</h2>
                <p className="text-lg text-gray-700">Your account is under review by the admin. Please wait until it is approved.</p>
                <button
                    className="btn btn-primary hover:bg-primary/90 mt-4"
                    onClick={() => navigate('/dashboard')}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    )
}

export default ManagerApprovalPending
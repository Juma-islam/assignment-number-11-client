

import { useLocation, useNavigate } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useAuth from '../hooks/useAuth'



const PrivateRouter = ({ children }) => {
    const { firebaseUser, loading } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    if (loading) return <LoadingSpinner />

    if (firebaseUser && firebaseUser.email) {
        return children
    }

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40"></div>

            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
                    <h2 className="text-xl font-semibold mb-3">Login Required</h2>
                    <p className="text-gray-600 mb-5">
                        You must log in to access this page.
                    </p>
                    <div className="flex justify-center gap-4">

                        <button onClick={() => navigate(-1)} className="btn btn-primary text-white rounded-md hover:bg-primary/90">
                            Go Back
                        </button>

                        <button onClick={() => navigate("/login", { state: location.pathname , replace: true })} className="btn btn-secondary text-white rounded-md hover:bg-secondary/90">
                         Go to Login
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivateRouter

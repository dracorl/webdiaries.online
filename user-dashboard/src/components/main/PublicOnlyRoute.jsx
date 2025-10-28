// src/components/ProtectedRoute.jsx
import {Navigate, Outlet} from "react-router-dom"
import {isLoggedIn} from "../../utils/authUtils"

const PublicOnlyRoute = ({children}) => {
  const isAuthenticated = isLoggedIn()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children ? children : <Outlet />
}

export default PublicOnlyRoute

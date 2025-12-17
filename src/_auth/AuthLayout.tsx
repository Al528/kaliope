import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="flex flex-1 justify-center items-center min-h-screen py-10">
      <Outlet />
    </div>
  )
}

export default AuthLayout
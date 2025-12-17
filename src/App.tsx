import { Routes, Route } from "react-router-dom"
import RootLayout from "./_root/RootLayout"
import { Create, Explore, Home } from "./_root/pages"
import AuthLayout from "./_auth/AuthLayout"
import SignupForm from "./_auth/forms/SignupForm"
import SigninForm from "./_auth/forms/SigninForm"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./_root/pages/Profile"

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/sign-in" element={<SigninForm />} />
      </Route>
    </Routes>
  )
}

export default App

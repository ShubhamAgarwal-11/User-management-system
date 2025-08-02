import { useState } from 'react'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import LoginPage from './component/login'
import RegisterPage from './component/register'
import UserProfileManagerHorizontal from './component/profile'
import OtpVerification from './component/verifyOTP' 

function App() {

   const appRouter = createBrowserRouter([
    {
      path : '/',
      element : <LoginPage/>
    },
    {
      path : '/register',
      element : <RegisterPage/>
    },
    {
      path : '/profile',
      element : <UserProfileManagerHorizontal/>
    },
    {
      path : "/verify-otp",
      element : <OtpVerification/>
    }
    
   ])

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster/>
    </>
  )
}

export default App

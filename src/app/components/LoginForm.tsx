
import { useState  } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { login, selectLogin, signup } from "../userSlice";
import type { RootState } from "../store";
function LoginForm() {
   const [email, setEmail] = useState<string>("")
  const loginInfo = useAppSelector((state:RootState) => selectLogin(state))

  const dispatch = useAppDispatch()
  const signInHandler = ():void => {
    dispatch(signup(email))
  }
  const logInHandler = ():void => {
    dispatch(login(email))
  }
    return (
    <div className="w-full max-w-md">
      <div 
    
      
        className="bg-white rounded-2xl shadow-xl overflow-hidden animate__animated animate__fadeIn"
      >
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-indigo-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-center mb-8">Enter your email to continue</p>
          
          <div className="mb-6">
            <div className="relative">
              <input 
                type="email" 
                name="email"
                 value={email} onChange={(e) => setEmail(e.target.value)}  
                placeholder="your@email.com" 
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" 
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <button 
          
            onClick={signInHandler}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
          >
             I don't have any acount: Sign up 
          </button>
          <button 
          
            onClick={logInHandler}
            className="w-full my-4 bg-gradient-to-r from-amber-400 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
          >
            I have already an acount: login
          </button>
        </div>
        
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-gray-600 text-sm">
          
          </p>
        </div>
      </div>
    </div>
    )
}

export default LoginForm;
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLogin } from "../userSlice";
import Image from "next/image";

function Header() {
 
 const loginInfo = useSelector(state => selectLogin(state))
 const dispatch = useDispatch()
const logOutHandler = ()=>{
dispatch(logout())
}
if(loginInfo.userInfo.islogin){
return (   <header className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

      <div className="flex items-center">
         <Image
      src="/next.svg"
      alt="Picture"
        width={150}
        height={150}
        priority
        style={{ width: '150px', height: 'auto' }} 
    />
      </div>
      
  
      <div className="flex items-center space-x-4">
    
        <span className="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-bold  bg-gradient-to-r from-amber-200 to-indigo-100  text-blue-800">
        email : {loginInfo.userInfo.email}
        </span>
        
 
        <button onClick={logOutHandler} className="text-sm text-gray-500 transition duration-200 hover:text-red-700 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  </header> );
}else{
return (   <header className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

      <div className="flex items-start">
         <Image
      src="/next.svg"
      alt="Picture"
        width={150}
        height={150}
    />
      </div>
      
  
    </div>
  </header> );

}
    
}

export default Header;
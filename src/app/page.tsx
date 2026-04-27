'use client'

import StatusFilter from "./components/StatusFilter";
import TodoFooter from "./components/TodoFooter";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import LoginForm from "./components/LoginForm";
import { selectLogin, setUserFromStorage } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useLayoutEffect } from "react";
import type { RootState } from "./store";
function Home() {
   const dispatch = useDispatch();


  const loginInfo = useSelector((state: RootState) => selectLogin(state))

  let content: React.ReactNode
  if (loginInfo.userInfo.islogin) {
    content = <div className="w-full max-w-6xl"><div className="text-center mb-8"><h1 className="text-3xl font-bold text-primary mb-2">To-Do Manager</h1><p className="text-dark/80">Organize your day with ease</p></div> <TodoInput /><StatusFilter /><TodoList /><TodoFooter /> </div>
  } else {
    content = <LoginForm />
  }


    useLayoutEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const parsed = JSON.parse(stored);
            dispatch(setUserFromStorage({
                userId: parsed._id,
                email: parsed.email
            }));
        }
    }, []);


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">

      {content}

    </div>
  );
}

export default Home;
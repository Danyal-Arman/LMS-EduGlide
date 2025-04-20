import React, { useState, useEffect } from 'react'
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useRegisterUserMutation, useLoginUserMutation } from '@/features/api/authApi';
import {toast} from "sonner"
import { useNavigate } from 'react-router-dom';
// import { loginUser, registerUser } from "@/features/api/authApi";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [signupInput, setSignupInput] = useState({ username: "", email: "", password: "" })
  const [loginInput, setLoginInput] = useState({ email: "", password: "" })
  
  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser,    { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation()
  const navigate = useNavigate();


  const handleInput = (e) => {
    const { name, value } = e.target;
    if (!isLogin) {
      setSignupInput({ ...signupInput, [name]: value })
    }
    else {
      setLoginInput({ ...loginInput, [name]: value })
    }

  }


  const onSubmit = async (e) => {
    e.preventDefault();
  
    const inputData = isLogin ? loginInput : signupInput;
    const action = isLogin ?  loginUser :  registerUser;
    await action(inputData);
   
   }

  useEffect(() => {
  if(registerIsSuccess){
    toast.success(registerData.message || "successfully registered")
    navigate('/')
  }
  if(registerError){
  if(registerError.data && registerError.data.message){
    toast.error(registerError.data.message || "signUp failed")
  }
  else{
    toast.error("signUp failed! something is wrong with the server")
  }
}
  if(loginIsSuccess ){
    toast.success(`${loginData.message}` || "successfully logged ");
    navigate('/')
  }
  if(loginError){
  if(loginError.data && loginError.data.message){
    toast.error(loginError.data.message || "login failed")
  }
else{
  toast.error("something is wrong with the server")
}  
}


    
  }, [loginIsLoading, registerIsLoading, loginIsSuccess, registerIsSuccess, loginError, registerError, loginData, registerData, loginUser])
  

  return (
    <div className='bg-gradient-to-br from-white via-yellow-200 to-yellow-500 h-screen w-full flex items-center justify-center
     '>


      {/* Background Decorations */}
      <div className="absolute ">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl "></div>
      </div>

      <div className='w-full max-w-md rounded-xl bg-slate-200 animate-float-card'>
        <div className='flex flex-col items-center mt-8'>
          <h1 className='font-Poppins text-3xl dark:text-black'>{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <h4 className='font-Poppins dark:text-black'>{isLogin ? "Hey, Enter to get into your account " : "Start your learning journey"} </h4>
        </div>


        {/*main */}
        
        <div className='form  '>
          <form onSubmit={onSubmit} >
          {!isLogin && (
              <div className='animate-float-in' style={{ '--delay': '0s' }}>
                <div className='relative  ml-6 mr-6 mt-7 '>
                  <User className='absolute top-3 left-2 dark:text-black' />
                  <input type="text"
                    placeholder='Full Name'
                    name='username'
                    value={signupInput.username}
                    onChange={handleInput}
                    className=' w-full  pl-10 py-3 rounded-md  outline-none backdrop:blur-xl dark:text-black'
                  />
                </div>
              </div>
            )}
            <div className='relative ml-6 mr-6 mt-10  '>
              <Mail className='absolute top-3 left-2 dark:text-black' />
              <input type="email"
                name='email'
                value={isLogin ? loginInput.email : signupInput.email}
                onChange={handleInput}
                placeholder='Email'
                className=' w-full pl-10 py-3 rounded-md outline-none  text-black'
              />
            </div>

            <div className='relative ml-6 mr-6 mt-10'>
              <Lock className='absolute top-3 left-2 dark:text-black' />
              <input type="password"
                name='password'
                value={isLogin ? loginInput.password : signupInput.password}
                onChange={handleInput}
                placeholder='password'
                className=' mb-3 w-full pl-10 py-3 rounded-md outline-none  text-black'
              />  
            </div>

            <div className='relative ml-6 mr-6 mb-8 bg-yellow-300 mt-8 rounded-xl'>
              <button disabled={loginIsLoading || registerIsLoading}
                className=' w-full pl-3 py-2 outline-none hover:cursor-pointer '>
                {(loginIsLoading || registerIsLoading) ? (<>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin dark:text-black' />
                </>) : (isLogin ? "Login" : "Sign Up")}
              </button>
            </div>

          </form>
        </div>


        {/* Arrow button to move to signup or login page */}

        <div className="flex justify-center mb-8 relative">
           <button className='flex'
            onClick={() => setIsLogin(!isLogin)}>
            <span className='flex items-center font-Poppins dark:text-black'>{!isLogin ? "Already have an account?" : "Don't have an account?"}</span>
            <ArrowRight className='hover:ml-1 transition-all dark:text-black' />
          </button>
        </div>


      </div>
    </div>
  )
}

export default Login

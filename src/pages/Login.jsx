import axios from 'axios';
import React, { useState } from 'react'
import { useCustomToast } from '../hooks/useCustomToast';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomSpinner from '../components/Spinner';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userGlobal = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { showSuccessToast, showErrorToast } = useCustomToast();
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await dispatch(loginUser({ username, password }))
      showSuccessToast("Login successfully.")
    } catch (error) {
      showErrorToast("Login failed. Username or password is wrong.")
    } finally{
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   if (userGlobal.id) {
  //     navigate('/items');
  //   }
  // }, [userGlobal]);


  return (
    <div className='flex h-screen w-full bg-neutral-100'>
      {isLoading && <CustomSpinner />}
      <div className='hidden lg:w-[60%] bg-gradient-to-r from-teal-500 h-screen lg:flex justify-center items-center'>
        <p className=' font-bold text-5xl text-neutral-700'>WELCOME BACK!</p>
      </div>
      <div className='w-full lg:w-[40%] h-screen bg-white'>
        <div className='flex flex-col gap-10 justify-center w-full h-screen'>
          <div className='w-2/3 mx-auto'>
            <p className='font-bold text-3xl'>Login Account</p>
          </div>
          <form
            className='flex flex-col gap-4 w-2/3 mx-auto'
            onSubmit={handleLogin}
          >
            <div className='w-full'>
              {/* <p className='font-semibold '>Username</p> */}
              <input
                className='w-full rounded px-4 py-2 border bg-neutral-50'
                name="username"
                type='text'
                placeholder='Username ("admin" or "user")'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='w-full'>
              {/* <p className='font-semibold'>Password</p> */}
              <input
                className='w-full rounded px-4 py-2 border bg-neutral-50'
                name="password"
                type='password'
                placeholder='Password ("admin" or "user")'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className='mt-5 px-4 w-full mx-auto py-2 rounded font-semibold bg-teal-500 hover:bg-teal-600 text-white'
              type='submit'
            >
              Login
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
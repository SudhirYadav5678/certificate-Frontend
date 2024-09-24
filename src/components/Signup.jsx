import React, { useState } from 'react'
import { SiGnuprivacyguard } from "react-icons/si";
import axios from 'axios';
import { USER_API_END_POINT } from '../api.js';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoading } from '../store/authSlice.js';

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.auth);
    const [input, setInput] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        avatar: ""
    })
    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const inputHandleFile = (e) => {
        setInput({ ...input, avatar: e.target.files?.[0] })
    }

    const formData = new FormData();
    formData.append("fullName", input.fullName)
    formData.append("username", input.username)
    formData.append("email", input.email)
    formData.append("password", input.password)
    formData.append("avatar", input.avatar)

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/registerUser`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            })
            navigate('/')
            alert(res.data.message, "Please Login");
        } catch (error) {
            alert(error);
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <>
            <div className='pt-20 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 h-screen w-full '>
                <div className=' w-[700px] mx-auto h-[500px] border-2 border-gray-300 bg-white shadow-md hover:bg-gradient-to-r from-indigo-50 via-sky-50 to-blue-50 rounded-2xl'>
                    <h1 className='flex justify-center text-4xl mt-3'><SiGnuprivacyguard />Sign up </h1>
                    <form >
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="fullName">full Name</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="text" placeholder='full Name' name='fullName' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="username">User Name</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="text" placeholder='User Name' name='username' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="email">Email</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="email" placeholder='Email' name='email' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="password">Password</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="password" placeholder='Password' name='password' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="avatar">Avatar</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md cursor-pointer' type="file" placeholder='Avatar' name='avatar' onChange={inputHandleFile} required />
                        </div>
                        {
                            loading ? (<div className='mt-5 text-2xl w-[400px] mx-auto border-2 border-sky-300 text-center rounded-lg cursor-wait h-10'><button className='cursor-wait'>Loading...</button></div>) : (<div onClick={submitHandle} className='mt-5 text-2xl w-[400px] mx-auto border-2 border-sky-300 text-center rounded-lg h-10'><button className=''>Sign up</button></div>)
                        }
                    </form>
                </div>

            </div>
        </>
    )
}

export default Signup
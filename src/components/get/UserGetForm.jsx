import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserForm } from '../../store/userGetForm';

function UserGetForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = false
    const [input, setInput] = useState({
        fullName: "",
        Descripiton: "",
        Post: "",
        Name: "",
        Orgnigiaction: "",
        template: ""
    })
    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandle = (e) => {
        e.preventDefault();
        console.log(input);
        dispatch(setUserForm(input))
        navigate('/certificate')
    }
    return (
        <>
            <div className='flex'>
                <div className='w-1/2 h-screen bg-gradient-to-r from-cyan-50 via-blue-50 to-sky-50'>
                    <form className='bordr-4 shadow-md p-5 pt-5 w-[600px] ml-20 bg-white '>
                        <div className='flex justify-center pt-6'>
                            <label className='text-2xl' htmlFor="fullName">full Name</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="text" placeholder='full Name' name='fullName' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="username">Descripiton</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="text" placeholder='Descripiton' name='Descripiton' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="email">Post</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="text" placeholder='Post' name='Post' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="password">Name</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="text" placeholder='Name' name='Name' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center mt-6'>
                            <label className='text-2xl' htmlFor="avatar">Orgnigiaction</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md cursor-pointer' type="text" placeholder='Orgnigiaction' name='Orgnigiaction' onChange={inputHandle} required />
                        </div>
                        {
                            loading ? (<div className='mt-5 text-2xl w-[400px] mx-auto border-2 border-sky-300 text-center rounded-lg cursor-wait h-10'><button className='cursor-wait'>Loading...</button></div>) : (<div onClick={submitHandle} className='mt-5 text-2xl w-[400px] mx-auto border-2 border-sky-300 text-center rounded-lg h-10'><button className=''>Sign up</button></div>)
                        }
                    </form>
                </div>
                <div className='w-1/2 h-screen bg-slate-300'>
                    <h1>Templates</h1>
                    <div className=''>
                        <label className='text-2xl' htmlFor="template">Select Template</label>
                        <select onChange={inputHandle} name='template'>
                            <option value="Template">Template</option>
                            <option value="src/assets/certificte2.png">Template 2</option>
                            <option value="src/assets/certificate4.png">Template 3</option>
                        </select>
                    </div>
                    <div>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserGetForm
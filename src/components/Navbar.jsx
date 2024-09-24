import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { GrCertificate } from "react-icons/gr";
import { MdLogin } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbCertificate } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { MdGetApp } from "react-icons/md";
import ModalBox from './ModalBox.jsx';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../api.js';
import { setLoading, setUser } from '../store/authSlice.js';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, user } = useSelector(state => state.auth)
    const navItem = [
        { index: 1, path: "/", name: "Home", icon: <IoHome className='mt-1 mr-1' /> },
        { index: 2, path: "/", name: "Get", icon: <MdGetApp className='mt-1 mr-1' /> },
        { index: 3, path: "#", name: "About", icon: <MdGetApp className='mt-1 mr-1' /> },
    ]
    const [loginShow, setLoginShow] = useState(false);
    const [getShow, setGetShow] = useState(false);
    const loginModalToogle = () => {
        setLoginShow((prev) => !prev)
    }
    const close = (closeModal) => { setLoginShow(closeModal) }
    const getclose = (closeModal) => { setGetShow(closeModal) }
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    })
    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/loginUser`, input, {
                headers: "application-json",
                withCredentials: true
            })
            navigate('/')
            dispatch(setUser(res.data))
            setLoginShow(false)
            alert(res.data.message)
        } catch (error) {
            alert(error)
        } finally {
            dispatch(setLoading(false))
        }
    }
    return (
        <>
            <div className='flex justify-between  h-20 w-full bg-gradient-to-r to-purple-100 via-indigo-100 from-blue-100'>
                <div className='mt-3'><button className='flex justify-center px-[20px] py-[10px] text-1xl hover:border-gray-500 hover:text-green-400'><GrCertificate className='mt-1 mr-1' />Quick Up</button></div>
                <div>
                    <ul className='flex justify-evenly'>
                        {navItem.map((item) => (<li key={item.index} className='mt-4 mr-2'><button onClick={() => {
                            if (item.index === 2) {
                                setGetShow(true)
                            }
                        }} className='flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100  rounded-md px-[15px] py-[5px] text-1xl  hover:text-gray-500 hover:ring-green-300'>{item.icon} <Link to={item.path}>{item.name}</Link></button></li>))}
                    </ul>
                </div>
                <div>
                    {
                        user ? (<div>
                            <ul className='flex justify-evenly'>
                                <li className='mt-4 mr-2'><button className='flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100 rounded-md px-[15px] py-[5px] text-1xl hover:text-gray-500 hover:ring-green-300'><CgProfile className='mt-1 mr-1' /><Link to='#'>Profile</Link></button></li>
                                <li className='mt-4 mr-2'><button className='flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100 rounded-md px-[15px] py-[5px] text-1xl hover:text-gray-500 hover:ring-green-300'><RiAdminLine className='mt-1 mr-1' /><Link to='#'>Admin</Link></button></li>
                            </ul>
                        </div>) : (<div>
                            <ul className='flex justify-evenly'>
                                <li className='mt-4 mr-2'><button className='flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100  rounded-md px-[15px] py-[5px] text-1xl hover:text-gray-500 hover:ring-green-300'><SiGnuprivacyguard className='mt-1 mr-1' /><Link to='/signup'>Sign up</Link></button></li>
                                <li className='mt-4 mr-2'><button onClick={loginModalToogle} className='flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100  rounded-md px-[15px] py-[5px] text-1xl  hover:text-gray-500 hover:ring-green-300'><MdLogin className='mt-1 mr-1' />Login</button></li>
                            </ul>
                        </div>)
                    }
                </div>
            </div>
            {
                loginShow && <ModalBox ModalName={"Login"} close={close} logo={<MdLogin className='mt-1 mr-2' />}>
                    <form className='mt-10'>
                        <div className='flex justify-center m-2'>
                            <label htmlFor="username">User Name</label>
                            <input className='w-1/2 ml-2 p-2 border border-blue-400 rounded-md' type="text" placeholder='User Name' name='username' onChange={inputHandle} />
                        </div>
                        <div className='flex justify-center m-2'>
                            <label htmlFor="username">Email</label>
                            <input className='w-1/2 ml-6 p-2 pl-3 border border-blue-400 rounded-md' type="email" placeholder='Email' name='email' onChange={inputHandle} required />
                        </div>
                        <div className='flex justify-center m-2'>
                            <label htmlFor="username">Password</label>
                            <input className='w-1/2 ml-2 p-2  border border-blue-400 rounded-md' type="password" placeholder='Password' name='password' onChange={inputHandle} required />
                        </div>
                        {
                            loading ? (<div><button className='w-full h-7 mt-5 border border-gray-600 rounded-md cursor-none'>Loading...</button></div>) : (<div onClick={submitHandle}><button className='w-full h-7 mt-5 border border-gray-600 rounded-md hover:bg-gradient-to-r from-green-50 via-yellow-50 to-orange-50'>Login</button></div>)
                        }
                        <div className='mt-2 flex justify-center'>Don't Have Account <span className='text-blue-400 ml-2'><Link to='/signup'>Sign up</Link></span></div>
                    </form>
                </ModalBox >
            }
            {
                user ? (getShow && <ModalBox ModalName={"Certificate"} close={getclose} logo={<TbCertificate className='mt-1 mr-2' />}>
                    <div className=' flex-col mt-20 ml-14'>
                        <button className='flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100 rounded-md px-[15px] py-[5px] text-1xl hover:text-gray-500 hover:ring-green-300'><CgProfile className='mt-1 mr-1' /><Link to='/usercertificate'>User</Link></button>
                        <p className='mt-1'> It can use for the single certificate</p>
                        <button className='mt-5 flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100 rounded-md px-[15px] py-[5px] text-1xl hover:text-gray-500 hover:ring-green-300'><RiAdminLine className='mt-1 mr-1' /><Link to='#'>Admin</Link></button>
                        <p className='mt-1'>It can use for bulk certificate</p>
                    </div>
                </ModalBox>) : (getShow && <ModalBox ModalName={"Please Login First"} close={getclose}>
                </ModalBox>)
            }
        </>
    )
}

export default Navbar
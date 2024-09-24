import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import ModalBox from './ModalBox.jsx';
import { TbCertificate } from 'react-icons/tb';
import { RiAdminLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

function HeroSection() {
    const [getShow, setGetShow] = useState(false);
    const getclose = (closeModal) => { setGetShow(closeModal) }
    //const { user } = useSelector(state => state.auth)
    const user = true
    const navigate = useNavigate()
    return (
        <>
            <div className='w-full h-screen bg-gradient-to-r to-purple-50 via-indigo-100 from-blue-50'>
                <div>
                    <h1 className='flex justify-center font-mono font-bold w-full h-auto p-2 text-7xl pt-20 '>Free Certificates </h1>
                    <p className='flex justify-center w-full h-auto p-2 text-2xl pt-5 font-thin'>Generate certificates for your students or colleagues and download in PDF and Images format</p>
                </div>
                <div className='flex justify-center mt-20'>
                    {
                        user ? (<div onClick={() => setGetShow(true)} className='border bg-green-400 text-center pt-5 text-2xl border-gray-600 h-[80px] w-[200px] shadow-lg rounded-2xl cursor-pointer hover:bg-green-300 '>
                            Download
                        </div>) : (<div className='border bg-green-400 text-center pt-5 text-2xl border-gray-600 h-[80px] w-[200px] shadow-lg rounded-2xl hover:bg-green-300 '>
                            Please Login
                        </div>)
                    }
                </div>
                <div className='flex justify-center mt-5'>
                    <div>100% free download</div>
                </div>
            </div>
            {
                getShow && <ModalBox ModalName={"Certificate"} close={getclose} logo={<TbCertificate className='mt-1 mr-2' />}>
                    <div className=' flex-col mt-20 ml-14'>
                        <button className='flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100 rounded-md px-[15px] py-[5px] text-1xl hover:text-gray-500 hover:ring-green-300'><CgProfile className='mt-1 mr-1' /><Link to='/usercertificate'>User</Link></button>
                        <p className='mt-1'> It can use for the single certificate</p>
                        <button className='mt-5 flex justify-center ring-2 ring-gradient-to-b to-purple-100 via-indigo-100 from-blue-100 rounded-md px-[15px] py-[5px] text-1xl hover:text-gray-500 hover:ring-green-300'><RiAdminLine className='mt-1 mr-1' /><Link to='#'>Admin</Link></button>
                        <p className='mt-1'>It can use for bulk certificate</p>

                    </div>
                </ModalBox>
            }
        </>
    )
}

export default HeroSection
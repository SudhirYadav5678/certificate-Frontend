import React, { useRef } from 'react'
import { MdLogin } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";

function ModalBox({ ModalName, children, close, logo }) {
    const closeRef = useRef(null)
    const closeModal = (e) => {
        if (closeRef.current === e.target) {
            close(false)
        }
    }
    return (
        <>
            <div ref={closeRef} onClick={closeModal} className=' absolute w-full h-screen'>
                <div className='fixed border-4 w-[500px] h-[400px] rounded-2xl mx-auto my-24 p-5 inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 bg-opacity-30 backdrop-blur-sm  '>
                    <div onClick={() => (close(false))} className='flex justify-end cursor-pointer'><RiCloseLargeFill className='text-2xl' /></div>
                    <h1 className=' flex justify-center text-4xl font-semibold'><span>{logo}</span>{ModalName}</h1>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ModalBox
import React from 'react'
import { useDispatch } from 'react-redux'
import { setTemplate } from '../store/templateSlice.js';


function Design() {
    const dispatch = useDispatch();

    const imgaes = [{ id: 1, path: "src/assets/certifcaate3.png", name: "First" }, { id: 2, path: "src/assets/certifcaate3.png", name: "First" }, { id: 3, path: "src/assets/certificate4.png", name: "First" }, { id: 4, path: "src/assets/certifcaate3.png", name: "First" }]


    const add_template = async (item) => {
        dispatch(setTemplate({ item }))
    }
    return (
        <>
            <div className='text-2xl border-2 rounded-md px-3 py-3 text-center mt-2 m-2 bg-red-50'>Design</div>
            <div className='grid grid-cols-2 gap-2 m-2 cursor-pointer'>
                {imgaes.map((item, i) =>
                    (<div key={i} onClick={() => add_template(item)}><img src={item.path} alt={item.name} /></div>)
                )}
            </div>
        </>
    )
}

export default Design
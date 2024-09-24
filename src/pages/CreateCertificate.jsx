import React, { useEffect, useState } from 'react'
import { BsFolder, BsGrid1X2 } from 'react-icons/bs'
import { FaCloudUploadAlt, FaShapes, FaTrash } from 'react-icons/fa'
import { RxTransparencyGrid } from 'react-icons/rx'
import { TfiText } from 'react-icons/tfi'
import Design from '../editer/Design.jsx'
import { useSelector } from 'react-redux'
import Items from '../editer/Items.jsx'
import { useParams } from 'react-router-dom'
import { IoDuplicateOutline } from 'react-icons/io5'


function CreateCertificate() {
    const { templates } = useSelector(state => state.template)
    const [state, setState] = useState("")
    const [selectItem, setSelectItem] = useState('')
    const { design_id } = useParams()
    const [color, setColor] = useState('')
    const [image, setImage] = useState('')
    const [rotate, setRotate] = useState(0)
    const [left, setLeft] = useState('')
    const [top, setTop] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [opacity, setOpacity] = useState('')
    const [zIndex, setzIndex] = useState('')
    const [padding, setPadding] = useState('')
    const [font, setFont] = useState('')
    const [weight, setWeight] = useState('')
    const [text, setText] = useState('')
    const [radius, setRadius] = useState(0)
    const [show, setShow] = useState({
        status: false,
        name: ""
    })
    const setElements = (type, name) => {
        setShow({
            status: true,
            name: name
        })
        setState(type)
    }
    const [currentComponent, setCurrentComponent] = useState('')

    const [components, setComponents] = useState([{
        name: "main_frame",
        type: "react",
        id: Math.floor((Math.random() * 100) + 1),
        height: 500,
        width: 800,
        z_index: 1,
        color: "#fff",
        image: "",
        setCurrentComponent: (a) => setCurrentComponent(a)
    }])

    const moveElement = (id, currentInfo) => {
        setCurrentComponent(currentInfo)
        let isMoving = true
        const currentDiv = document.getElementById(id)
        const mouseMove = ({ movementX, movementY }) => {
            setSelectItem("")
            const getStyle = window.getComputedStyle(currentDiv)
            const left = parseInt(getStyle.left)
            const top = parseInt(getStyle.top)
            if (isMoving) {
                currentDiv.style.left = `${left + movementX}px`
                currentDiv.style.top = `${top + movementY}px`
            }
        }

        const mouseUp = (e) => {
            setSelectItem(currentInfo.id)
            isMoving = false
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            setLeft(parseInt(currentDiv.style.left))
            setTop(parseInt(currentDiv.style.top))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
        currentDiv.ondragstart = function () {
            return false;
        };
    }

    const resizeElement = (id, currentInfo) => {
        setCurrentComponent(currentInfo)
        let isMoving = true
        const currentDiv = document.getElementById(id)
        const mouseMove = ({ movementX, movementY }) => {
            const getStyle = window.getComputedStyle(currentDiv)
            const width = parseInt(getStyle.width)
            const height = parseInt(getStyle.height)
            if (isMoving) {
                currentDiv.style.width = `${width + movementX}px`
                currentDiv.style.height = `${height + movementY}px`
            }
        }

        const mouseUp = (e) => {
            isMoving = false
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            setWidth(parseInt(currentDiv.style.width))
            setHeight(parseInt(currentDiv.style.height))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
        currentDiv.ondragstart = function () {
            return false;
        };
    }

    const rotateElement = (id, currentInfo) => {
        setCurrentComponent(currentInfo)
        const target = document.getElementById(id)
        const mouseMove = ({ movementX, movementY }) => {
            const getStyle = window.getComputedStyle(target)
            const trans = getStyle.transform
            const values = trans.split('(')[1].split(')')[0].split(',')
            const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
            let deg = angle < 0 ? angle + 360 : angle
            if (movementX) {
                deg = deg + movementX
            }
            target.style.transform = `rotate(${deg}deg)`
        }
        const mouseUp = (e) => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)

            const getStyle = window.getComputedStyle(target)
            const trans = getStyle.transform
            const values = trans.split('(')[1].split(')')[0].split(',')
            const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
            let deg = angle < 0 ? angle + 360 : angle
            setRotate(deg)

        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)

        target.ondragstart = function () {
            return false;
        };
    }

    const removeComponent = (id) => {
        const temp = components.filter(c => c.id !== id)
        setCurrentComponent('')
        setComponents(temp)
    }
    const duplicate = (current) => {
        if (current) {
            setComponents([...components, { ...current, id: Date.now() }])
        }
    }

    const remove_background = () => {
        const com = components.find(c => c.id === current_component.id)
        const temp = components.filter(c => c.id !== current_component.id)
        com.image = ''
        setImage("")
        setComponents([...temp, com])
    }

    const opacityHandle = (e) => {
        setOpacity(parseFloat(e.target.value))
    }

    const createShape = (name, type) => {
        setCurrentComponent('')
        const id = Date.now()
        const style = {
            id: id,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            rotate,
            z_index: 2,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }
        setCurrentComponent(style)
        setComponents([...components, style])
    }

    const add_text = (name, type) => {
        setCurrentComponent('')
        const id = Date.now()
        const style = {
            id: id,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            rotate,
            z_index: 10,
            padding: 6,
            font: 22,
            title: "Add text",
            weight: 400,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }

        setWeight('')
        setFont('')
        setSelectItem(id)
        setCurrentComponent(style)
        setComponents([...components, style])

    }

    const add_image = (img) => {
        setCurrentComponent('')
        const id = Date.now()
        const style = {
            id: id,
            name: 'image',
            type: 'image',
            left: 10,
            top: 10,
            opacity: 1,
            width: 800,
            height: 500,
            rotate,
            z_index: 2,
            ratius: 0,
            image: img,
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }

        setSelectItem(id)
        setCurrentComponent(style)
        setComponents([...components, style])

    }

    useEffect(() => {
        if (currentComponent) {

            const index = components.findIndex(c => c.id === currentComponent.id)
            const temp = components.filter(c => c.id !== currentComponent.id)

            if (currentComponent.name !== 'text') {
                components[index].width = width || currentComponent.width
                components[index].height = height || currentComponent.height
                components[index].rotate = rotate || currentComponent.rotate
            }
            if (currentComponent.name === 'text') {
                components[index].font = font || currentComponent.font
                components[index].padding = padding || currentComponent.padding
                components[index].weight = weight || currentComponent.weight
                components[index].title = text || currentComponent.title
            }
            if (currentComponent.name === 'image') {
                components[index].radius = radius || currentComponent.radius
            }

            if (currentComponent.name === 'main_frame' && image) {
                components[index].image = image || currentComponent.image
            }
            components[index].color = color || currentComponent.color

            if (currentComponent.name !== 'main_frame') {
                components[index].left = left || currentComponent.left
                components[index].top = top || currentComponent.top
                components[index].opacity = opacity || currentComponent.opacity
                components[index].z_index = zIndex || currentComponent.z_index
            }
            setComponents([...components])

            setColor('')
            setWidth('')
            setHeight('')
            setTop('')
            setLeft('')
            setRotate(0)
            setOpacity('')
            setzIndex('')
            setText('')
        }
    }, [color, image, left, top, width, height, opacity, zIndex, padding, font, weight, text, radius, rotate])

    return (
        <>
            <div className='min-w-screen h-screen'>
                <div className='flex h-[calc(100%-60px)] w-screen'>
                    <div className='w-[80px] bg-slate-100 z-50 h-full text-gray-400 overflow-y-auto'>
                        <div onClick={() => setElements('design', 'design')} className={` ${show.name === 'design' ? 'bg-slate-200' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                            <span className='text-2xl'><BsGrid1X2 /></span>
                            <span className='text-xs font-medium'>Design</span>
                        </div>

                        <div onClick={() => setElements('shape', 'shape')} className={`${show.name === 'shape' ? 'bg-slate-200' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                            <span className='text-2xl'><FaShapes /></span>
                            <span className='text-xs font-medium'>Shapes</span>
                        </div>

                        <div onClick={() => setElements('upload', 'upload')} className={`${show.name === 'uploadImage' ? 'bg-slate-200' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                            <span className='text-2xl'><FaCloudUploadAlt /></span>
                            <span className='text-xs font-medium'>Upload</span>
                        </div>

                        <div onClick={() => setElements('text', 'text')} className={`${show.name === 'text' ? 'bg-slate-200' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                            <span className='text-2xl'><TfiText /></span>
                            <span className='text-xs font-medium'>Text</span>
                        </div>

                        <div onClick={() => setElements('project', 'projects')} className={`${show.name === 'projects' ? 'bg-slate-200' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                            <span className='text-2xl'><BsFolder /></span>
                            <span className='text-xs font-medium'>Project</span>
                        </div>


                        <div onClick={() => setElements('background', 'background')} className={`${show.name === 'background' ? 'bg-slate-200' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                            <span className='text-2xl'><RxTransparencyGrid /></span>
                            <span className='text-xs font-medium'>Background</span>
                        </div>
                    </div>
                    {
                        show.status && <div className='h-full w-[350px] z-30 border-2 border-gray-300 rounded-lg'>
                            {show.name === "design" && <div onClick={() => {
                                add_image(templates.item.path)
                            }}><Design /></div>}
                            {show.name === 'shape' && <div className='grid grid-cols-2 gap-1 p-2'>
                                <div onClick={() => createShape('shape', 'rect')} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                                <div onClick={() => createShape('shape', 'circle')} className='h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'></div>
                                <div onClick={() => createShape('shape', 'trangle')} style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                            </div>
                            }
                            {state === "upload" && <div>Upload</div>}
                            {
                                state === 'text' && <div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div onClick={() => add_text('text', 'title')} className='bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
                                            <h2>Add a Text</h2>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                state === 'project' && <div>Coming Soon...</div>
                            }
                            {
                                state === 'background' && <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                    <div>Coming Soon...</div>
                                </div>
                            }
                        </div>
                    }

                    <div className={`w-full h-full flex `}>
                        <div className={`flex justify-center relative items-center h-full ${!currentComponent ? 'w-full' : "w-[calc(100%-250px)] overflow-hidden"}`}>
                            <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
                                <div id='main_design' className='w-auto relative h-auto overflow-hidden select-none'>
                                    {
                                        components.map((c, i) => <Items selectItem={selectItem} setSelectItem={setSelectItem} key={i} info={c} currentComponent={currentComponent} removeComponent={removeComponent} />)
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            currentComponent && <div className='h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2'>
                                <div className='flex gap-6 flex-col items-start h-full px-3 justify-start pt-4'>
                                    {
                                        currentComponent.name !== 'main_frame' && <div className='flex justify-start items-center gap-5'>
                                            <div onClick={() => removeComponent(currentComponent?.id)} className='w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800'><FaTrash /></div>
                                            <div onClick={() => duplicate(currentComponent)} className='w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800'><IoDuplicateOutline /></div>
                                        </div>
                                    }
                                    <div className='flex gap-4 justify-start items-start'>
                                        <span>Color : </span>
                                        <label className='w-[30px] h-[30px] cursor-pointer rounded-sm' style={{ background: `${currentComponent.color && currentComponent.color !== '#fff' ? currentComponent.color : 'gray'}` }} htmlFor="color"></label>
                                        <input onChange={(e) => setColor(e.target.value)} type="color" className='invisible' id='color' />
                                    </div>
                                    {
                                        (currentComponent.name === 'main_frame' && currentComponent.image) && <div>
                                            <button className='p-[6px] bg-slate-700 text-white rounded-sm' onClick={remove_background}>Remove background</button>
                                        </div>
                                    }

                                    {
                                        currentComponent.name !== 'main_frame' && <div className='flex gap-6 flex-col'>
                                            <div className='flex gap-1 justify-start items-start'>
                                                <span className='text-md w-[70px]'>Opacity : </span>
                                                <input onChange={opacityHandle} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={0.1} min={0.1} max={1} value={currentComponent.opacity} />
                                            </div>
                                            <div className='flex gap-1 justify-start items-start'>
                                                <span className='text-md w-[70px]'>Z-Index : </span>
                                                <input onChange={(e) => setzIndex(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={currentComponent.z_index} />
                                            </div>
                                            {
                                                currentComponent.name === 'image' && <div className='flex gap-1 justify-start items-start'>
                                                    <span className='text-md w-[70px]'>Radius : </span>
                                                    <input onChange={(e) => setRadius(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={currentComponent.radius} />
                                                </div>
                                            }
                                            {
                                                currentComponent.name === 'text' && <>
                                                    <div className='flex gap-1 justify-start items-start'>
                                                        <span className='text-md w-[70px]'>Padding : </span>
                                                        <input onChange={(e) => setPadding(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={currentComponent.padding} />
                                                    </div>
                                                    <div className='flex gap-1 justify-start items-start'>
                                                        <span className='text-md w-[72px]'>Font size : </span>
                                                        <input onChange={(e) => setFont(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={currentComponent.font} />
                                                    </div>
                                                    <div className='flex gap-1 justify-start items-start'>
                                                        <span className='text-md w-[70px]'>Weight : </span>
                                                        <input onChange={(e) => setWeight(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={100} min={100} max={900} value={currentComponent.weight} />
                                                    </div>

                                                    <div className='flex gap-2 flex-col justify-start items-start'>
                                                        <input onChange={(e) => setCurrentComponent({
                                                            ...currentComponent,
                                                            title: e.target.value
                                                        })} className='border border-gray-700 bg-transparent outline-none p-2 rounded-md' type="text" value={currentComponent.title} />
                                                        <button onClick={() => setText(currentComponent.title)} className='px-4 py-2 bg-purple-500 text-xs text-white rounded-sm'>Add</button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div >
        </>
    )
}

export default CreateCertificate
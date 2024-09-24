import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import CreateCertificate from './pages/CreateCertificate.jsx'
import Signup from './components/Signup.jsx'
import UserGetForm from './components/get/UserGetForm.jsx'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateCertificate />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/usercertificate' element={<UserGetForm />} />
      </Route>
    ))

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App

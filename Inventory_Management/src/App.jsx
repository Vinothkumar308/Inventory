import { useState,useEffect} from 'react'
import './App.css'
import Notfound from './Notfound'
import Products from "./Products"
import Locations from "./Locations"
import ProductMovement from "./ProductMovement"
import ProductLayout from "./layout/ProductLayout"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import { createContext } from 'react'


export const optionContext = createContext()
function App() {
  
  const [options,setOptions] = useState([]) 
  const [optionsL,setOptionsL] = useState([]) 
  const [optionsP,setOptionsP] = useState([]) 
  const getdata = async()=>{
    await axios.get("http://127.0.0.1:8000/inventory/product/").then((response)=>setOptions(response.data)).catch((error)=>console.log(error.message))

     await axios.get("http://127.0.0.1:8000/inventory/location/").then((response)=>setOptionsL(response.data)).catch((error)=>console.log(error.message))

      await axios.get("http://127.0.0.1:8000/inventory/productmovement/").then((response)=>setOptionsP(response.data)).catch((error)=>console.log(error.message))
  }

   useEffect(()=>{
      getdata()
    },[])

  const router = createBrowserRouter(createRoutesFromElements(
     <Route path="/" element={<ProductLayout/>}>
       <Route path="products" element={<Products/>}/>
       <Route path="locations" element={<Locations/>}/>
       <Route path="productmovement" element={<ProductMovement/>}/>
       <Route path="*" element={<Notfound/>}/> 
     </Route>

  ))

  return (
     <optionContext.Provider value={{options,setOptions,optionsL,setOptionsL,optionsP}}>
       <RouterProvider router={router}></RouterProvider>
      </optionContext.Provider>
  )
}

export default App

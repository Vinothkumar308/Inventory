import React from 'react'
import { Outlet } from 'react-router-dom'
import Inventory from '../Inventory'

const ProductLayout = () => {
  return (
    <div>
         <Inventory/>  
         <Outlet/>
    </div>
  )
}

export default ProductLayout
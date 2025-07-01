import React from 'react'
import {Link} from 'react-router-dom'
import {optionContext} from './App'
import { useContext } from 'react'

const Inventory = () => {

  const {options,optionsL,optionsP} = useContext(optionContext)

  return (
    <>
        <div className="container1">
            <h3>Inventory management</h3>
            <div className='con1_sub'>
                 <div className='menu_icon'></div>
            </div>
        </div>
        <div className="container2">
            <div className="con2_sub1">
                <h3 className='line'>Inventory products</h3>
                <div className='listss'>{options.map((option)=>{
                  return <div key={option.id}>{option.product_name}</div>
                })}</div>
                <h3 className='ll'>Inventory location</h3>
                <div className='listss'>{optionsL.map((option)=>{
                  return <div key={option.id}>{option.location_name}</div>
                })}</div>
            </div>
            <div className="con2_sub2">
               <h3 className='line'>inventory records</h3>
               <div className="records">
                  <ul>
                    <Link to="/products"><li>products</li></Link>
                    <Link to="/locations"><li>locations</li></Link>
                    <Link to="/productmovement"><li>productmovement</li></Link>
                  </ul>
               </div>
               <div className="table">
                 <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Warehouse</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                       {options.map((option)=>{
                        const totalquantity = optionsP.filter((data)=>data.product_reference==option.product_name).reduce((acc,curr)=>acc+parseInt(curr.quantity || 0),0)
                        return <tr key={option.id}>
                             <td>{option.product_name}</td>
                             <td>-</td>
                             <td>{totalquantity}</td>
                        </tr>
                       })}
                    </tbody>
                 </table>
               </div>
            </div>
        </div>
    </>
  )
}

export default Inventory
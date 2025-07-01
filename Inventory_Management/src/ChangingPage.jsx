import { useContext,useState } from 'react'
import {optionContext} from './App'
import './index.css'

const ChangingPage = ({data1,setData1,handlechange}) => {

  const {optionsL} = useContext(optionContext)
  
  const deletefromlocal=(id)=>{
    const isconfirm = window.confirm("Are you sure to delete")
    if(isconfirm){
      const stored = JSON.parse(localStorage.getItem('mydata'))||[]
      const deleted = stored.filter(item=>item.id!==id)
      localStorage.setItem('mydata',JSON.stringify(deleted))
      setData1(deleted)
    }
  }
  return (
    <div className='change'>
       <h2>Change Products</h2>
       <h3>Location X</h3>
        <div className='product1'>
          <div className='product_array1'>
          <table className='pr_table'>
            <thead>
                <tr>
                  <th>SNO</th>
                  <th>product reference</th>
                  <th>from location</th>
                  <th>to location</th>
                  <th>movement id</th>
                  <th>quantity</th>
                  <th>delete</th>
                </tr>
            </thead>
            <tbody>
              {data1?data1.map((array,index)=>{
                if(array.to_location=="Location_X"){
                  return <tr key={index}>
                          <td>{index}</td>
                          <td>{array.product_reference}</td>
                          <td>{array.from_location}</td>
                          <td>{array.to_location}</td>
                          <td>{array.movement_id}</td>
                          <td>{array.quantity}</td>
                          <td><button className='btn_danger' onClick={()=>deletefromlocal(array.id)}>delete</button></td>
                      </tr>}else{
                        console.log("only location_X allowed")
                      }
              }):<p>...No datas</p>}
          </tbody>
        </table>
      </div>
      </div>

       <h3>Location Y</h3>

       <div className='product1'>
          <div className='product_array1'>
          <table className='pr_table'>
            <thead>
                <tr>
                  <th>SNO</th>
                  <th>product reference</th>
                  <th>from location</th>
                  <th>to location</th>
                  <th>movement id</th>
                  <th>quantity</th>
                  <th>delete</th>
                </tr>
            </thead>
            <tbody>
              {data1?data1.map((array,index)=>{
                if(array.to_location=="Location_Y"){
                  return <tr key={index}>
                          <td>{index}</td>
                          <td>{array.product_reference}</td>
                          <td>{array.from_location}</td>
                          <td>{array.to_location}</td>
                          <td>{array.movement_id}</td>
                          <td>{array.quantity}</td>
                          <td><button className='btn_danger' onClick={()=>deletefromlocal(array.id)}>delete</button></td>
                      </tr>}else{
                        console.log("only location_Y allowed")
                      }
              }):<p>...No datas</p>}
          </tbody>
        </table>
      </div>
      </div>
       <h3>Location Z</h3>

       <div className='product1'>
          <div className='product_array1'>
          <table className='pr_table'>
            <thead>
                <tr>
                  <th>SNO</th>
                  <th>product reference</th>
                  <th>from location</th>
                  <th>to location</th>
                  <th>movement id</th>
                  <th>quantity</th>
                  <th>delete</th>
                </tr>
            </thead>
            <tbody>
              {data1?data1.map((array,index)=>{
                if(array.to_location=="Location_Z"){
                  return <tr key={index}>
                          <td>{index}</td>
                          <td>{array.product_reference}</td>
                          <td>{array.from_location}</td>
                          <td>{array.to_location}</td>
                          <td>{array.movement_id}</td>
                          <td>{array.quantity}</td>
                          <td><button className='btn_danger' onClick={()=>deletefromlocal(array.id)}>delete</button></td>
                      </tr>}else{
                        console.log("only location_Z allowed")
                      }
              }):<p>...No datas</p>}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default ChangingPage
import React, { useEffect, useState,useContext } from 'react'
import './index.css'
import axios from 'axios'
import {optionContext} from './App'
import ChangingPage from './ChangingPage'

const ProductMovement = () => {

  const {options,setOptions,optionsL} = useContext(optionContext)
  const[data,setData] = useState([])
  const[data1,setData1] = useState(()=>{
    const saved = localStorage.getItem('mydata')
    return saved?JSON.parse(saved):[]
  }
  )
  const[error,setError] = useState(null)
  const[open,setOpen] = useState(false)
  const[senddata,setSenddata] = useState([])
  const[userdata,setUserdata] = useState({product_reference:'',from_location:'',to_location:'',movement_id:'',quantity:''})
  
  const getdata = async()=>{
    await axios.get("http://127.0.0.1:8000/inventory/productmovement/").then((response)=>setData(response.data)).catch((error)=>setError(error.message))
  }

  const deletedata = async(id)=>{
    const isconfirm = window.confirm("Are you sure to delete")
    if(isconfirm){
      try{
        const res = await axios.delete(`http://127.0.0.1:8000/inventory/productmovement/${id}/`)
        setData(prev=>prev.filter(productmovement=>productmovement.id!=id))
        getdata()
      }
      catch{
        if(error.response){
          console.log(error.response.data)
        }
        else{
          console.log(error.message)
        }
      }
    }
  }
  const handledata = (e)=>{
    setUserdata({...userdata,[e.target.name]:e.target.value})

  }
  const postdata = async(e)=>{
    e.preventDefault()
      try{
        if(userdata.id){
          await axios.patch(`http://127.0.0.1:8000/inventory/productmovement/${userdata.id}/`,userdata)
          getdata()
          setOpen(false)
          setUserdata({product_reference:'',from_location:'',to_location:'',movement_id:'',quantity:''})
        }else{
          await axios.post("http://127.0.0.1:8000/inventory/productmovement/",userdata)
          setData((prev)=>[...prev,userdata])
        }
      }
      catch(error){
        console.log(error.message)
      }
  }
 const updatedata=(data)=>{
      setUserdata(data)
      setOpen(true)
 }
  const handlechange = (data)=>{
    // setSenddata(data)
    const alredyExistdata = data1.some(item=>item.id==data.id)
    if(!alredyExistdata){
      const adding = [...data1,data]
      setData1(adding)
    }
    else{
      console.log("Duplicate data.")
    }
    
  }
 useEffect(()=>{
  localStorage.setItem('mydata',JSON.stringify(data1))
 },[data1])

  

  useEffect(()=>{
    getdata()
  },[])

  return (
    <div className='product'>
      <div className='product_array'>
        <table className='pr_table'>
          <thead>
              <tr>
                <th>SNO</th>
                <th>product reference</th>
                <th>from location</th>
                <th>to location</th>
                <th>movement id</th>
                <th>quantity</th>
                <th>update</th>
                <th>delete</th>
                <th>Move</th>
              </tr>
          </thead>
          <tbody>
             {data.map((array,index)=>{
                return <tr key={index}>
                        <td>{index}</td>
                        <td>{array.product_reference}</td>
                        <td>{array.from_location}</td>
                        <td>{array.to_location}</td>
                        <td>{array.movement_id}</td>
                        <td>{array.quantity}</td>
                        <td><button className='btn_yellow' onClick={()=>updatedata(array)}>update</button></td>
                        <td><button className='btn_danger' onClick={()=>deletedata(array.id)}>delete</button></td>
                        <td><select onChange={()=>{handlechange(array)}}>
                              <option value="">select location</option>
                              <option value="">{array.from_location}</option>
                              <option value="">{array.to_location}</option>
                          </select>
                        </td>
                     </tr>
             })}
          </tbody>
        </table>
        <button className='add' onClick={()=>setOpen(true)}>Add productDetails</button>
      </div>
      {open && <div className="form_con">
         <div className="form_box1">
           <h2>{userdata.id?"update productDetails":"Add productDetails"}</h2>
           <div className='x' onClick={()=>setOpen(false)}>x</div>
            <form onSubmit={postdata} className='form1'>
               {userdata.id?<div className="group">
                  <label htmlFor="product_reference">product_reference iD</label>
                  <select name="product_reference" id="product_reference" value={userdata.id} onChange={handledata}>
                    <option value="">select product</option>
                     {options.map((option,index)=>
                     {return <option key={index}>{option.id}</option>})}
                  </select>
               </div>:<div className="group">
                  <label htmlFor="product_reference">product_reference iD</label>
                  <select name="product_reference" id="product_reference" value={userdata.product_name} onChange={handledata}>
                    <option value="">select product</option>
                     {options.map((option,index)=>
                     {return <option key={index}>{option.product_name}</option>})}
                  </select>
               </div>}
               <div className="group">
                  <label htmlFor="from_location">from location</label>
                  <select name="from_location" id="from_location" value={userdata.from_location} onChange={handledata}>
                    <option value="">select from location</option>
                     {optionsL.map((option,index)=>
                     {return <option key={index}>{option.location_name}</option>})}
                  </select>
               </div>
               <div className="group">
                  <label htmlFor="to_location">to location</label>
                  <select name="to_location" id="to_location" value={userdata.to_location} onChange={handledata}>
                    <option value="">select to location</option>
                     {optionsL.map((option,index)=>
                     {return <option key={index} value={option.location_name}>{option.location_name}</option>})}
                  </select>
               </div>
               <div className="group">
                  <label htmlFor="movement_id">movement iD</label>
                  <input type="text" name="movement_id" id="movement_id" value={userdata.movement_id} onChange={handledata} />
               </div>
               <div className="group">
                  <label htmlFor="quantity">quantity</label>
                  <input type="number" name="quantity" id="quantity" value={userdata.quantity} onChange={handledata} />
               </div>
               <button type="submit" className='btn'>{userdata.id?"update":"Add"}</button>
            </form>
         </div>
      </div>}
      <ChangingPage data1={data1} setData1={setData1} handlechange={handlechange}/>
    </div>
  )
}


export default ProductMovement
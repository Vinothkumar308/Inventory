import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Products = () => {

  const[data,setData] = useState([])
  const[error,setError] = useState(null)
  const[open,setOpen] = useState(false)
  const[userdata,setUserdata] = useState({product_id:'',product_name:''})
  

  // const navigate = useNavigate()
  const getdata = async()=>{
    await axios.get("http://127.0.0.1:8000/inventory/product/").then((response)=>setData(response.data)).catch((error)=>setError(error.message))
  }

  const deletedata = async(id)=>{
    const isconfirm = window.confirm("Are you sure to delete")
    if(isconfirm){
      try{
        const res = await axios.delete(`http://127.0.0.1:8000/inventory/product/${id}/`)
        setData(prev=>prev.filter(product=>product.id!=id))
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
          await axios.patch(`http://127.0.0.1:8000/inventory/product/${userdata.id}/`,userdata)
          getdata()
          setOpen(false)
          setUserdata({product_id:"",product_name:""})
        }else{
          await axios.post("http://127.0.0.1:8000/inventory/product/",userdata)
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
                <th>product ID</th>
                <th>product Name</th>
                <th>update</th>
                <th>delete</th>
              </tr>
          </thead>
          <tbody>
             {data.map((array,index)=>{
                return <tr key={index}>
                        <td>{index}</td>
                        <td>{array.product_id}</td>
                        <td>{array.product_name}</td>
                        <td><button className='btn_yellow' onClick={()=>updatedata(array)}>update</button></td>
                        <td><button className='btn_danger' onClick={()=>deletedata(array.id)}>delete</button></td>
                     </tr>
             })}
          </tbody>
        </table>
        <button className='add' onClick={()=>setOpen(true)}>Add product</button>
      </div>
      {open && <div className="form_con" >
         <div className="form_box">
           <h2>{userdata.id?"update product":"Add product"}</h2>
           <div className='x' onClick={()=>setOpen(false)}>x</div>
            <form onSubmit={postdata} className='form1'>
               <div className="group">
                  <label htmlFor="p_id">product iD</label>
                  <input type="text" name="product_id" id="p_id" value={userdata.product_id} onChange={handledata} />
               </div>
               <div className="group">
                  <label htmlFor="p_name">product name</label>
                  <input type="text" name="product_name" id="p_name" value={userdata.product_name} onChange={handledata} />
               </div>
               <button type="submit">{userdata.id?"update":"Add"}</button>
            </form>
         </div>
      </div>}
    </div>
  )
}

export default Products
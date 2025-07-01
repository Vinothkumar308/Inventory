import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'

const Locations = () => {

  const[data,setData] = useState([])
  const[error,setError] = useState(null)
  const[open,setOpen] = useState(false)
  const[userdata,setUserdata] = useState({location_id:'',location_name:''})
  

  const getdata = async()=>{
    await axios.get("http://127.0.0.1:8000/inventory/location/").then((response)=>setData(response.data)).catch((error)=>setError(error.message))
  }

  const deletedata = async(id)=>{
    const isconfirm = window.confirm("Are you sure to delete")
    if(isconfirm){
      try{
        const res = await axios.delete(`http://127.0.0.1:8000/inventory/location/${id}/`)
        setData(prev=>prev.filter(location=>location.id!=id))
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
          await axios.patch(`http://127.0.0.1:8000/inventory/location/${userdata.id}/`,userdata)
          getdata()
          setOpen(false)
          setUserdata({location_id:"",location_name:""})
        }else{
          await axios.post("http://127.0.0.1:8000/inventory/location/",userdata)
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
                <th>location ID</th>
                <th>location Name</th>
                <th>update</th>
                <th>delete</th>
              </tr>
          </thead>
          <tbody>
             {data.map((array,index)=>{
                return <tr key={index}>
                        <td>{index}</td>
                        <td>{array.location_id}</td>
                        <td>{array.location_name}</td>
                        <td><button className='btn_yellow' onClick={()=>updatedata(array)}>update</button></td>
                        <td><button className='btn_danger' onClick={()=>deletedata(array.id)}>delete</button></td>
                     </tr>
             })}
          </tbody>
        </table>
        <button className='add' onClick={()=>setOpen(true)}>Add location</button>
      </div>
      {open && <div className="form_con">
         <div className="form_box">
           <h2>{userdata.id?"update location":"Add location"}</h2>
           <div className='x' onClick={()=>setOpen(false)}>x</div>
            <form onSubmit={postdata} className='form1'>
               <div className="group">
                  <label htmlFor="l_id">location iD</label>
                  <input type="text" name="location_id" id="l_id" value={userdata.location_id} onChange={handledata} />
               </div>
               <div className="group">
                  <label htmlFor="l_name">location name</label>
                  <input type="text" name="location_name" id="l_name" value={userdata.location_name} onChange={handledata} />
               </div>
               <button type="submit">{userdata.id?"update":"Add"}</button>
            </form>
         </div>
      </div>}
    </div>
  )
}

export default Locations
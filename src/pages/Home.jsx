import React, { useState ,useContext,useEffect} from "react";
import {Link,Navigate} from "react-router-dom"
import toast from "react-hot-toast";
import { server } from "../main";
import axios from "axios"
import { Context } from '../main'
import Header from '../components/Header'
import TodoItem from "../components/Todo-item";

export default function Home() {
  const {loading,setLoading}=useContext(Context);
  const [title,setTitle]=useState("")
  const [tasks,setTasks]=useState([])
  const [refres,setRefresh]=useState(false)
  const [description,setDescrption]=useState("")
  const {isAuthenticated}=useContext(Context);
 const updateHandler=async(id)=>{
  try {
  const {data}= await axios.put(`${server}/task/${id}`,{},{
      withCredentials:true
    });
    toast.success(data.message)
    setRefresh(prev=>!prev)
  } catch (error) {
    toast.error(error.response.data.message);
    
  }
  }
 const deleteHandler= async(id)=>{ try {
  const {data}= await axios.delete(`${server}/task/${id}`,{
      withCredentials:true
    });
    toast.success(data.message)
    setRefresh(prev=>!prev)
  } catch (error) {
    toast.error(error.response.data.message);
    
  }}
  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true)
  
try {
    
    const {data}=await axios.post(`${server}/task/new`,{
      title,description
    },{
        headers:{
            "Content-Type": "application/json"
        },
        withCredentials:true
    })
toast.success(data.message)
setTitle("");
setDescrption("")
setLoading(false)
setRefresh(prev=>!prev)
} catch (error) {
    toast.error(error.response.data.message);
    
    setLoading(false)
}
}

useEffect(()=>{
  
axios.get(`${server}/task/my`,{
withCredentials:true
}).then(res=>{
setTasks( res.data.tasks);


}).catch((e)=>{
toast.error(e.response.data.message)


})
},[refres])
if(!isAuthenticated) return <Navigate to={"/login"}/>
  return (
    <div>
     <Header/>
     <div className='container'>

     <div className="login">
            <section>
            <form onSubmit={submitHandler}>
                    <input value={title}  onChange={(e)=> setTitle(e.target.value)} type="text" placeholder="Tittle" required/>
                    <input value={description} onChange={(e)=> setDescrption(e.target.value)} type="text" placeholder="Descrption" required/>
                    <button type="submit" disabled={loading}>Add Task</button>
                   

                </form>
            </section>
            <section className="todosContainer">
              {
                tasks.map((i)=>(
                  <div key={i._id}><TodoItem title={i.title} description={i.description} isCompleted={i.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={i._id} key={i._id}/></div>
                ))
              }
            </section>
        </div>
     </div>
    </div>
  )
}

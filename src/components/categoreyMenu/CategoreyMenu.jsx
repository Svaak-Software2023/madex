import React, { useEffect, useState } from 'react'
import "./style.css"
import { getAllCategory } from '../../redux/featurs/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryVideo, getAllVideo } from '../../redux/featurs/videoSlice'

function CategoreyMenu() {
  const dispatch=useDispatch()
  const [data,setData]=useState([])
  const category=useSelector((state)=>state.category)
  // console.log(category);
  useEffect(()=>{
    !category.categoryData&& dispatch(getAllCategory())
    category.categoryData&& setData(category.categoryData)
  },[])
  const handleClick=(categoryId)=>{
    dispatch(getAllCategoryVideo(categoryId))
    // alert("called")
  }

  const handlAllData =()=>{
    // alert("handle")
    dispatch(getAllVideo())
  }
  return (
    <div className="categorey-menu-main mt-0">
      <div className="categotrey-menu-list">
      <div className="categorey-menu-item px-2"  onClick={handlAllData} >
            <span>All</span>
          </div>
        {data.map((item)=>
          <div className="categorey-menu-item " key={item._id} onClick={()=>handleClick(item._id)} >
            <span>{item.categoryName}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoreyMenu
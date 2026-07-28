'use client';

import { CartData } from '@/type';
import React, { useEffect, useState } from 'react'

const ReviewData = () => {
  const [data, setData] = useState<CartData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
     try{
        const res = await fetch("/reviewData.json")
        const cartData = await res.json()

        setData(cartData.cart)
     }catch(err){
      if(err instanceof Error) console.log(err.message)
     }
    }
    const savedSys = localStorage.getItem("savedSys")
    if(savedSys){
      setData(JSON.parse(savedSys))
    }else{
      fetchData()
    }
    
  }, [])
  console.log(data)
  return (
    <div>
      {}
    </div>
  )
}

export default ReviewData

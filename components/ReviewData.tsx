'use client';

import { CartData, ProductCart } from '@/type';
import React, { useEffect, useState } from 'react'
import ReviewItem from './ReviewItem';

const ReviewData = () => {
  const [data, setData] = useState<CartData[] | null>(null)

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
  return (
    <div>
      {data?.map((cart, index) => (
      <div key={index}>

        {Object.entries(cart).map(([category, items]) => {

          if (category === "totals") return null;

          return (
            <div className="border-t mt-4 border-review-border pt-[14px] flex flex-col gap-[12px]" key={category}>
              <h3 className="text-sm text-review-heading uppercase tracking-wider">
                {category}
              </h3>

              <div className="flex flex-col gap-[12px] ">
                {(items as ProductCart[]).map((item) =>  {
                  const productName = item.name === "Cam Unlimited" ? item.name.split(' ') : item.name

                  return  <ReviewItem key={item.productId} productName={productName} {...item} />
                }
                )}
              </div>

            </div>
          );
        })}

      </div>
    ))}
    </div>
  )
}

export default ReviewData

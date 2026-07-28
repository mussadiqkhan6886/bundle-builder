'use client';

import { CartData, ProductCart } from '@/type';
import React, { useEffect, useState } from 'react'

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

                  return  (
                  <div className="flex gap-[16px] items-center" key={item.productId}>
                    <div className="flex flex-2 justify-between items-center">
                      <div className="flex flex-row items-center gap-[12px]">
                        <img className="w-[41px] h-[41px] rounded-[5px]" src={item.image} alt={item.name} />
                        <h3 className={`${item.name === "Cam Unlimited" ? "font-semibold text-[16px]" : "font-medium text-sm"}`}>
                          {item.name === "Cam Unlimited" ? (
                            <>
                              {productName[0]}{" "}
                              <span className="text-purple">{productName[1]}</span>
                            </>
                          ) : (
                            item.name
                          )}
                          {item.variantLabel && ` - ${item.variantLabel}`}
                        </h3>
                      </div>
                      {!item.billingPeriod && <div className="flex justify-between py-[4px] w-[77px]">
                        {/* quantity */}
                        <button className={`${item.requiredItem && !item.editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-white "} flex items-center justify-center w-[22px] h-[22px] rounded-[4px] font-medium`}>-</button>
                        <p className="font-semibold text-sm">{item.quantity}</p>
                        <button className={`${item.requiredItem && !item.editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-white "} flex items-center justify-center w-[22px] h-[22px] rounded-[4px] font-medium`}>+</button>
                      </div>}
                    </div>
                    <div>
                      {item.compareAtPrice && <p className="font-medium text-sm text-review-cut-price line-through text-right">${item.compareAtPrice}{item.billingPeriod && <span>/{item.billingPeriod}</span>}</p>}
                      {item.price === 0 ? <p className="font-semibold text-sm text-purple text-right">FREE</p> : <p className="font-semibold text-right text-sm text-purple">${item.price}{item.billingPeriod && <span>/{item.billingPeriod}</span>}</p>}
                    </div>
                  </div>
                  )
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

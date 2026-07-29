import { ProductCart } from '@/type'
import Image from 'next/image'
import React from 'react'
import { FiShield } from 'react-icons/fi'

type Props = Omit<ProductCart, "productId" | "variantId" | "category" | "isRecurring" | "variantLabel"> & { productName: string[] | string}

const ReviewItem = ({image, name, productName, billingPeriod, requiredItem, editable, compareAtPrice, price, quantity}: Props) => {
  return (
    <div className="flex gap-[16px] items-center">
        <div className="flex flex-2 justify-between items-center">
            <div className="flex flex-row items-center gap-[12px]">
            {image === null ? <FiShield className="text-purple" size={22} /> : <Image className="w-[41px] h-[41px] bg-white rounded-[5px]" src={image} alt={name} width={50} height={50} />}
            <h3 className={`${name === "Cam Unlimited" ? "font-semibold text-[16px]" : "font-medium text-sm"}`}>
                {name === "Cam Unlimited" ? (
                <>
                    {productName[0]}{" "}
                    <span className="text-purple">{productName[1]}</span>
                </>
                ) : (
                name
                )}
                {/* {variantLabel && ` - ${variantLabel}`} */}
            </h3>
            </div>
            {/* quantity */}
            {!billingPeriod && <div className="flex justify-between py-[4px] w-[77px]">
                <button className={`${requiredItem && !editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-white "} flex items-center justify-center w-[22px] h-[22px] rounded-[4px] font-medium`}>-</button>
                <p className="font-semibold text-sm">{quantity}</p>
                <button className={`${requiredItem && !editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-white "} flex items-center justify-center w-[22px] h-[22px] rounded-[4px] font-medium`}>+</button>
            </div>}
        </div>
        <div className='flex flex-col md:flex-row md:gap-[10px] 2xl:flex-col 2xl:gap-0'>
            {compareAtPrice && <p className="font-medium text-sm text-review-cut-price line-through text-right">${compareAtPrice}{billingPeriod && <span>/{billingPeriod}</span>}</p>}
            {price === 0 ? <p className="font-semibold text-sm text-purple text-right">FREE</p> : <p className="font-semibold text-right text-sm text-purple">${price}{billingPeriod && <span>/{billingPeriod}</span>}</p>}
        </div>
    </div>
  )
}

export default ReviewItem

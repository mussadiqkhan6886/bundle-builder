'use client';

import { useCart } from '@/contextAPI/contextCart';
import React from 'react'

interface Props {
  billingPeriod?: string
  requiredItem: boolean
  editable: boolean
  quantity: number
  productId: string
  variantId: string
}

const QuantityStepper = ({requiredItem, editable, quantity, productId, variantId}: Props) => {

  const {increment, decrement} = useCart()

    return (
     <div className="flex justify-between py-[4px] w-[77px]">
        <button onClick={() => decrement(productId, variantId)} className={`${requiredItem && !editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-white "} flex not-[disabled]:cursor-pointer  items-center justify-center w-[22px] h-[22px] rounded-[4px] font-medium`}>-</button>
        <p className="font-semibold text-sm">{quantity}</p>
        <button onClick={() => increment(productId, variantId)} className={`${requiredItem && !editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-white "} flex not-[disabled]:cursor-pointer items-center justify-center w-[22px] h-[22px] rounded-[4px] font-medium`}>+</button>
    </div>)
}

export default QuantityStepper

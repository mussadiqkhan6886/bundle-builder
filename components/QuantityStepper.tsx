'use client';

import {twMerge} from "tailwind-merge" 
import { useCart } from '@/contextAPI/contextCart';
import React from 'react'

interface Props {
  billingPeriod?: string
  requiredItem: boolean
  editable: boolean
  quantity: number
  productId: string
  variantId: string
  category: string
  className: string
}

const QuantityStepper = ({requiredItem, editable, quantity, productId, variantId, category, className}: Props) => {

  const {increment, decrement} = useCart()
  const minusDisabled = quantity === 0 || (requiredItem && !editable && quantity === 1);

  const plusDisabled = category === "plan" && quantity === 1;

    return (
     <div className="flex justify-between py-[4px] w-[77px]">
        <button type="button" disabled={minusDisabled} onClick={() => decrement(productId, variantId)} className={twMerge(`${requiredItem && !editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-white "} flex not-[disabled]:cursor-pointer  items-center justify-center w-[22px] h-[22px] rounded-[4px] font-medium`, className)}>-</button>
        <p className="font-semibold text-sm">{quantity}</p>
        <button type="button" disabled={plusDisabled} onClick={() => increment(productId, variantId)} className={twMerge(`${requiredItem && !editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-white "} flex not-[disabled]:cursor-pointer items-center justify-center w-[22px] h-[22px] rounded-[4px] font-medium`, className)}>+</button>
    </div>)
}

export default QuantityStepper

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
  className: string
}

const QuantityStepper = ({requiredItem, editable, quantity, productId, variantId, className}: Props) => {

  const {increment, decrement} = useCart()
  const minusDisabled = quantity === 0 || (requiredItem && !editable && quantity === 1);

  const plusDisabled = (requiredItem && !editable) && quantity === 1;

    return (
     <div className="flex justify-between py-[4px] w-[77px]">
        <button type="button" disabled={minusDisabled} onClick={() => decrement(productId, variantId)} className={twMerge(`flex  items-center justify-center w-[22px] h-[22px] rounded-[4px] cursor-pointer disabled:cursor-not-allowed text-button-stepper font-semibold`, className)}>-</button>
        <p className="font-semibold text-sm">{quantity}</p>
        <button type="button" disabled={plusDisabled} onClick={() => increment(productId, variantId)} className={twMerge(`flex items-center justify-center w-[22px] h-[22px] rounded-[4px] cursor-pointer disabled:cursor-not-allowed text-button-stepper font-semibold`, className)}>+</button>
    </div>)
}

export default QuantityStepper

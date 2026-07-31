'use client';

import { useCart } from '@/contextAPI/contextCart';
import { Variant } from '@/type'
import Image from 'next/image'
import React from 'react'

type Props = Variant & {productId: string}

const VariantSelector = ({label, variantImage, variantId, productId}: Props) => {

  const {activeVariants, setActiveVariant} = useCart()
  const isActive = activeVariants[productId] === variantId
  return (
    <button onClick={() => setActiveVariant(productId, variantId)} className={`rounded-[3px] border-[0.5] py-[1px] px-[5px]   cursor-pointer flex items-center ${isActive ? " border-active-variant/50 bg-active-variant-bg" : "bg-white/4 border-variant-selector-border"}`} key={variantId}>
        <Image src={variantImage} alt={label} width={100} height={100} className="w-6 h-6 object-contain" />
        <p className="font-medium text-[10px]">{label}</p>
    </button>
  )
}

export default VariantSelector

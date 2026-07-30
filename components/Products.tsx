import { Product } from '@/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Product
  length: number
  index: number
}

const Products = ({product, length, index}: Props) => {

  {/* center last div only if its single or alone only on desktop size (greater then 1536px) */}
  const isLast = index === length - 1
  const isOdd = length % 2 === 1

  return (
    <div className={`p-[11px] bg-white w-full 2xl:w-[381px] items-center h-full flex flex-col 2xl:flex-row gap-[13px] rounded-[10px] ${isLast && isOdd ? "2xl:col-span-2 2xl:flex 2xl:justify-center" : ""}`}>
      <div className="relative w-full 2xl:w-[160px] h-[170px] ">
        {/* badge */}
        {product.badge && <span className="absolute top-2 left-2 bg-purple text-white py-[2px] px-[6px] rounded-[10px] font-semibold text-xs z-20 ">{product.badge}</span>}
        <Image src={product.image} alt={product.name} fill className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col gap-[12px] w-full">
        <div className="flex flex-col gap-[10px]">
            <h2 className="font-semibold text-[16px] tracking-[0.6px]">{product.name}</h2>
            <p className="font-medium text-[13px] text-black/80">{product.description} {product.learnMoreUrl !== undefined && <Link target="_blank" className="text-purple underline" href={product.learnMoreUrl}>Learn More</Link>}</p>
           {product.variants && <div className="flex gap-[6px]">
                {product.variants.map(v => (
                    <div className="rounded-[2px] border-[0.5] py-[1px] px-[5px] bg-white/4 border-variant-selector-border cursor-pointer flex items-center" key={v.variantId}>
                        <Image src={v.variantImage} alt={v.label} width={100} height={100} className="w-6 h-6 object-contain" />
                        <p className="font-medium text-[10px]">{v.label}</p>
                    </div>
                ))}
            </div>}
        </div>
        <div className="flex justify-between items-center">
            <div>
                {<div className="flex justify-between py-[4px] w-[77px]">
                <button className={`${product.requiredItem && !product.editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-very-light-borders "} flex items-center justify-center w-[22px] h-[22px] rounded-[4px] font-semibold`}>-</button>
                <p className="font-semibold text-sm">0</p>
                <button className={`${product.requiredItem && !product.editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-very-light-borders "} flex items-center justify-center w-[22px] h-[22px] rounded-[4px] font-semibold`}>+</button>
                </div>}
            </div>
            <div className="flex items-center 2xl:flex-col gap-[3px] 2xl:gap-[1px]">
                {product.compareAtPrice && <span className="text-red tracking-[0.6px] line-through text-[16px] text-right">${product.compareAtPrice}</span>}
                <span className="text-lg text-price-product tracking-[0.6px]">{product.price === 0  ? "FREE" : `$${product.price}`}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Products

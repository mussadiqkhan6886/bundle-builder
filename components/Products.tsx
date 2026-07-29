import { Product } from '@/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Products = ({product}: {product: Product}) => {
  return (
    <div className="p-[11px] bg-white w-[250px] h-[340px] flex flex-col gap-[13px] rounded-[10px]">
      <div className="relative">
        {/* badge */}
        <span className="absolute top-2 left-2 bg-purple text-white py-[2px] px-[6px] rounded-[10px] font-semibold text-sm">{product.badge}</span>
        {/* <Image src={product.image} alt={product.name} /> */}
        <div className="w-full h-[160px] bg-gray-500"></div>
      </div>
      <div className="flex flex-col gap-[13px]">
        <div className="flex flex-col gap-[10px]">
            <h2 className="font-semibold text-[16px] tracking-[0.6px]">{product.name}</h2>
            <p className="font-medium text-sm text-black/80">{product.description} {product.learnMoreUrl !== undefined && <Link target="_blank" className="text-purple underline" href={product.learnMoreUrl}>Learn More</Link>}</p>
            <div className="flex gap-[6px]">
                {product.variants.map(v => (
                    <div className="rounded-[2px] border-[0.5] py-[1px] px-[5px] bg-white/4 border-variant-selector-border cursor-pointer" key={v.variantId}>
                        {/* <Image /> */}
                        <p className="font-medium text-xs">{v.label}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex justify-between items-center">
            <div>
                {!product.billingPeriod && <div className="flex justify-between py-[4px] w-[77px]">
                <button className={`${product.requiredItem && !product.editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-very-light-borders "} flex items-center justify-center w-[22px] h-[22px] rounded-[4px] font-semibold`}>-</button>
                <p className="font-semibold text-sm">0</p>
                <button className={`${product.requiredItem && !product.editable ? "bg-[#F1F1F2] border border-[#CED6DE]" : "bg-very-light-borders "} flex items-center justify-center w-[22px] h-[22px] rounded-[4px] font-semibold`}>+</button>
                </div>}
            </div>
            <div className="flex items-center gap-[3px]">
                {product.compareAtPrice && <span className="text-red tracking-[0.6px] line-through text-lg text-right">${product.compareAtPrice}</span>}
                <span className="text-[19px] text-price-product tracking-[0.6px]">${product.price}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Products

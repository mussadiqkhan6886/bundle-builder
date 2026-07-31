'use client';

import React from 'react'
import QuantityStepper from './QuantityStepper'
import { useCart } from '@/contextAPI/contextCart';

interface Props {
    id: string
    requiredItem: boolean
    editable: boolean
    category: string
}

const ProductQtyStepper = ({id, requiredItem, editable, category} : Props) => {

    const {getQuantity, getActiveVariantId} = useCart()

    const variantId = getActiveVariantId(id)
    const qty = getQuantity(id, variantId)

  return (
    <div>
        <QuantityStepper productId={id} variantId={variantId} requiredItem={requiredItem} editable={editable} quantity={qty}  className="bg-very-light-borders text-black disabled:bg-white  disabled:border-[2px] disabled:border-disabled-button disabled:text-disabled-button" />
    </div>
  )
}

export default ProductQtyStepper

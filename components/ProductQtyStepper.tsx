'use client';

import React from 'react'
import QuantityStepper from './QuantityStepper'
import { useCart } from '@/contextAPI/contextCart';

interface Props {
    id: string
    requiredItem: boolean
    editable: boolean
}

const ProductQtyStepper = ({id, requiredItem, editable} : Props) => {

    const {getQuantity, getActiveVariantId} = useCart()

    const variantId = getActiveVariantId(id)
    const qty = getQuantity(id, variantId)

  return (
    <div>
        <QuantityStepper productId={id} variantId={variantId} requiredItem={requiredItem} editable={editable} quantity={qty} />
    </div>
  )
}

export default ProductQtyStepper

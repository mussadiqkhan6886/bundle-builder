'use client';

import { useCart } from '@/contextAPI/contextCart';
import { Variant } from '@/type';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Props {
    image: string
    name: string
    variants: Variant[]
    id: string
}

const ImageChanger = ({image, name, variants, id}: Props) => {

    const [currentImage, setCurrentImage] = useState<string>(image)
    const {getActiveVariantId} = useCart()

    const variantId = getActiveVariantId(id)

    useEffect(() => {
        const variant = variants.find(v => v.variantId === variantId)

        if (variant) {
            setCurrentImage(variant.variantImage)
        }
    }, [variantId, variants])

  return (
    <Image src={currentImage} alt={name} fill className="w-full h-full object-contain" />
  )
}

export default ImageChanger

'use client';

import { useCart } from '@/contextAPI/contextCart';
import { Variant } from '@/type';
import Image from 'next/image'

interface Props {
    image: string
    name: string
    variants: Variant[]
    id: string
}

const ImageChanger = ({image, name, variants, id}: Props) => {

    const {getActiveVariantId} = useCart()

    const variantId = getActiveVariantId(id)
    const variant = variants.find(v => v.variantId === variantId);
    const currentImage = variant?.variantImage ?? image;

  return (
    <Image src={currentImage} alt={name} fill className="w-full h-full object-contain" />
  )
}

export default ImageChanger

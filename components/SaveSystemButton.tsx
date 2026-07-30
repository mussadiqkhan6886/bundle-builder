'use client';

import { useCart } from '@/contextAPI/contextCart';
import React from 'react'

const SaveSystemButton = () => {
  const {saveSystem} = useCart()

  return (
     <button onClick={() => saveSystem()} className="cursor-pointer italic underline tracking-tight text-section-heading mt-2 text-center w-full">Save my system for later</button>
  )
}

export default SaveSystemButton

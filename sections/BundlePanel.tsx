import Steps from '@/components/Steps'
import { Step } from '@/type'
import React from 'react'

const BundlePanel = () => {
  return (
    <section className="flex flex-col items-center w-full gap-[20px] xl:mb-10 xl:min-w-[780px]">
      <h1 className="font-bold text-[32px] items-center block md:hidden">Let&apos;s get started!</h1>
      <Steps  />
    </section>
  )
}

export default BundlePanel

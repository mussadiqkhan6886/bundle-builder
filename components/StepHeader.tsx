import React from 'react'

const StepHeader = ({stepNumber}: {stepNumber: number}) => {
  return (
    <h2 className="text-section-heading text-[12px] tracking-[0.15em] md:pb-1 font-medium px-[15px]">
      STEP {stepNumber} OF 4
    </h2>
  )
}

export default StepHeader

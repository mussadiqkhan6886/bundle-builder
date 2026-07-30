'use client'

import React, { useState } from 'react'
import Accordion from './Accordion'
import { useCart } from '@/contextAPI/contextCart'

const AccordionList = () => {
  const {steps} = useCart()
  const [openStepId, setOpenStepId] = useState<string>(steps[0]?.id)
  function toggleStep(stepId: string) {
    setOpenStepId(prev => (prev === stepId ? '' : stepId));
  }

  function goToNextStep(currentStepId: string) {
    const currentIndex = steps.findIndex(s => s.id === currentStepId);
    const nextStep = steps[currentIndex + 1];
    if (nextStep) setOpenStepId(nextStep.id);
  }

  return (
    <div className="flex flex-col w-full gap-[3px]">
      {steps.map((s) => (
        <Accordion
          key={s.id}
          {...s}
          isOpen={openStepId === s.id}
          openStepId={openStepId}
          onToggle={() => toggleStep(s.id)}
          onNext={() => goToNextStep(s.id)}
        />
      ))}
    </div>
  )
}

export default AccordionList
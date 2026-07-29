import React from 'react'
import Accordion from './Accordion'
import { Step } from '@/type'

const fetchSteps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`)
    const data = await res.json()
    return data.steps
}

const Steps = async () => {
    const data = await fetchSteps()
  return (
    <div className="flex flex-col w-full gap-[3px]">
        {data.map((s: Step) => (
            <Accordion key={s.id} {...s} />
        ))}
    </div>
  )
}

export default Steps

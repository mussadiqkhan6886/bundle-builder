import React from 'react'
import StepHeader from './StepHeader'
import { Step } from '@/type'
import { FaCaretDown, FaTableCells, FaWifi } from 'react-icons/fa6'
import { BiCameraHome } from 'react-icons/bi';
import { FiShield } from 'react-icons/fi';
import Products from './Products';

const icons = {
  BiCameraHome,
  FiShield,
  FaWifi,
  FaTableCells,
};

type Props = Step 

const Accordion = ({stepNumber, title, icon, next ,products}: Props) => {
  const Icon = icons[icon as keyof typeof icons] 
  return (
    <div>
      <StepHeader stepNumber={stepNumber} />
      <div className=" border-y-[0.5] border-bundle-border py-[20px] px-[15px]">
        <div className="flex justify-between items-center">
          {/* tittle and icon */}
          <div className="flex items-center gap-[10px]">
            <Icon className="w-[22px] text-review-cut-price h-[22px]" />
            <h3 className="font-semibold text-[19px]">{title}</h3>
          </div>
          {/* open and selection */}
          <div className="flex text-purple items-center gap-[4px]">
            <p className="font-medium">2 selected</p>
            <FaCaretDown />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 px-[15px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-2 place-items-center gap-[15px]">
        {products.map(p => (
          <Products key={p.id} product={p} />
        ))}
      </div>
      {next !== null && <div className="flex my-5 items-center justify-center">
        <button className="border border-purple rounded-[7px] py-[5px] px-[24px] font-semibold text-lg text-center text-purple">Next: Choose your {next}</button>
        </div>}
    </div>
  )
}

export default Accordion

import Image from 'next/image'
import React from 'react'

const ReviewPanel = () => {
  return (
    <section className="bg-bg-light-blue">
      <div className="block md:hidden lg:block px-[15px]">
        <h3 className="text-section-heading text-xs tracking-wider font-medium">
          REVIEW
        </h3>
      </div>
      <div className="flex flex-col gap-2.5 px-[20px] pt-[20px] pb-[31px]">
        <div className="">
          <h4 className="font-medium text-[22px]">Your security system</h4>
          <p className="text-black/75 text-[15px] mt-1">Review your personalized protection system designed to keep what matters most safe</p>
        </div>
        {/* seek data */}
        <div></div>
        {/* checkout */}
        <div>
          <div>
              <div className="flex justify-between items-center">
                <div>
                  <Image src="/images/satisfactionBadge.png" alt="satisfaction Badge image in checkout" width={200} height={200} className="w-[80px] h-[80px] md:w-[131px] md:h-[131px] object-cover" />
                </div>
                <div className="flex gap-[8px] flex-col items-end">
                  <p className='bg-purple text-white py-[4px] px-[10px] rounded-[4px] font-medium text-[13px] text-center'>as low as $19.19/mo</p>
                  <div className="flex gap-[8px] items-center">
                    <span className="line-through text-[22px] font-medium text-review-cut-price">$238.81</span>
                    <p className="font-bold text-3xl text-purple">$187.89</p>
                  </div>
                </div>
              </div>
              <div className="pt-2.5">
                <p className="text-green mb-1 text-center text-sm font-medium">Congrats! You&apos;re saving $50.92 on your security bundle!</p>
                <button className="bg-purple text-white text-[19px] font-bold tracking-wide text-center rounded-[5px] w-full py-3.25 px-4">Checkout</button>
              </div>
          </div>
          <button className="italic underline tracking-tight text-section-heading mt-2 text-center w-full">Save my system for later</button>
        </div>
      </div>
      
    </section>
  )
}

export default ReviewPanel

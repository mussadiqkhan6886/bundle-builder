import ReviewData from '@/components/ReviewData'
import SaveSystemButton from '@/components/SaveSystemButton'
import Image from 'next/image'
import { FaTruckFast } from 'react-icons/fa6'

const ReviewPanel = () => {
  return (
    <section className="bg-bg-light-blue h-full pt-[15px] pb-4 lg:px-9 xl:px-0 xl:w-[55%] xl:min-w-[400px]">
      {/* review header */}
      <div className="block md:hidden xl:block px-[15px]">
        <h3 className="text-section-heading text-xs tracking-wider font-medium">
          REVIEW
        </h3>
      </div>
      {/* review details */}
      <div className="flex flex-col md:flex-row xl:flex-col px-[20px] pt-[18px] pb-[31px] gap-0 md:gap-[52px] xl:gap-0">
        <div className="flex flex-col">
          <div>
            <h4 className="font-semibold text-[23px]">Your security system</h4>
            <p className="text-black/75 text-[15px]">Review your personalized protection system designed to keep what matters most safe</p>
          </div>
          {/* cart data */}
          <div className="mb-4">
            
            {/* review cart data */}
            <ReviewData />

            {/* free shipping step */}
            <div className="border-t mt-4 border-review-border flex flex-row justify-between items-center pt-[14px]">
              <div className='flex items-center gap-[13px]'>
                <FaTruckFast className="w-[38px] h-[38px] bg-white p-[2px] rounded-[5px] text-green" />
                <p className="text-sm font-medium">Fast Shipping</p>
              </div>
              <div className="flex flex-col md:flex-row md:gap-[10px] xl:flex-col xl:gap-0">
                <p className="font-medium text-review-cut-price line-through text-sm text-right">$5.99</p>
                <p className="text-purple text-right font-semibold text-sm">FREE</p>
              </div>
            </div>

          </div>
        </div>
        {/* checkout */}
        <div className="lg:w-[50%] xl:w-full">
          <div>
              <div className="flex flex-row md:flex-col xl:flex-row justify-between items-center">
                <div className="flex md:gap-[15px] lg:gap-[25px] items-center">
                  <Image src="/images/satisfactionBadge.png" alt="satisfaction Badge image in checkout" width={200} height={200} className="w-[100px] h-[100px] md:w-[131px] md:h-[131px] object-contain" />
                  <div className="hidden md:flex md:flex-col md:gap-[10px] xl:hidden">
                    <h5 className="font-semibold text-md lg:text-lg leading-tight">30-day hassle-free returns</h5>
                    <p className="text-md lg:text-lg leading-tight">if you&apos;re not totally in love with the product, we will refund you 100%.</p>
                  </div>
                </div>
                <div className="flex gap-[8px] flex-col md:flex-row xl:flex-col justify-between w-full items-end">
                  <p className='bg-purple text-white py-[4px] px-[10px] rounded-[4px] font-medium text-[13px] text-center'>as low as $19.19/mo</p>
                  <div className="flex gap-[8px] items-end">
                    <span className="line-through text-[22px] font-medium text-review-cut-price">$238.81</span>
                    <p className="font-bold text-3xl text-purple">$187.89</p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <p className="text-green mb-1 text-center text-sm font-medium">Congrats! You&apos;re saving $50.92 on your security bundle!</p>
                <button className="bg-purple text-white text-[19px] font-bold tracking-wide text-center rounded-[5px] w-full py-3.25 px-4">Checkout</button>
              </div>

          </div>

         <SaveSystemButton />
        </div>
      </div>      
    </section>
  )
}

export default ReviewPanel

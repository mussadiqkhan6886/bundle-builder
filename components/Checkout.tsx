'use client';

import { useCart } from '@/contextAPI/contextCart';
import Image from 'next/image';
import React, { useState } from 'react'
import { FiCheckCircle, FiX } from 'react-icons/fi';

const Checkout = () => {
    const [check, setCheck] = useState(false)
    const {getTotals} = useCart()
    const totals = getTotals()

    return (
  <>
  {/* popup */}
    {check && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-3xl text-green-500" />
              <h6 className="text-xl font-semibold text-gray-900">
                Order Placed!
              </h6>
            </div>

            <button
              onClick={() => setCheck(false)}
              className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
            >
              <FiX size={22} />
            </button>
          </div>

          <p className="mt-4 text-sm leading-6 text-black/80">
            Thank you for your order! This is a frontend prototype, so no real
            payment or checkout has been processed.
          </p>

          <button
            onClick={() => setCheck(false)}
            className="mt-6 w-full rounded-lg bg-purple py-3 font-medium text-white transition hover:opacity-90"
          >
            Continue Building
          </button>
        </div>
      </div>
    )}

    {/* total amount */}
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
                  <span className="line-through text-[22px] font-medium text-review-cut-price">${(totals.compareAtSubtotal).toFixed(2)}</span>
                  <p className="font-bold text-3xl text-purple">${(totals.subtotal).toFixed(2)}</p>
              </div>
          </div>
        </div>
    </div>

    {/* checkout footer */}
    <div className="pt-3">
      <p className="text-green mb-1 text-center text-sm font-medium">
        Congrats! You&apos;re saving ${(totals.savings).toFixed(2)} on your security bundle!
      </p>

      <button
        onClick={() => setCheck(true)}
        className="bg-purple text-white text-[19px] font-bold tracking-wide text-center rounded-[5px] w-full py-3.25 px-4 cursor-pointer"
      >
        Checkout
      </button>
    </div>
  </>
);
}

export default Checkout

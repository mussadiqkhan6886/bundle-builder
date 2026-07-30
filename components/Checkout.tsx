'use client';

import React, { useState } from 'react'
import { FiCheckCircle, FiX } from 'react-icons/fi';

const Checkout = () => {
    const [check, setCheck] = useState(false)

    return (
  <>
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

    <div className="pt-3">
      <p className="text-green mb-1 text-center text-sm font-medium">
        Congrats! You&apos;re saving $50.92 on your security bundle!
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

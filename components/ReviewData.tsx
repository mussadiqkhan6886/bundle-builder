'use client';

import {  ProductCart } from '@/type';
import ReviewItem from './ReviewItem';
import { useCart } from '@/contextAPI/contextCart';

const ReviewData = () => {
  const {getGroupedLineItems} = useCart()
  const data = getGroupedLineItems()
  return (
    <div>
      <div>
        {Object.entries(data).map(([category, items]) => {
          return items.length > 0 &&  (
            <div className="border-t mt-4 border-review-border pt-[14px] flex flex-col gap-[8px] md:gap-[10px]" key={category}>
              <h3 className="text-sm text-review-heading uppercase tracking-wider">
                {category}
              </h3>

              <div className="flex flex-col gap-[12px] ">
                {(items as ProductCart[]).map((item) =>  {
                  const productName = item.name === "Cam Unlimited" ? item.name.split(' ') : item.name

                  return  <ReviewItem key={item.productId} productName={productName} {...item} />
                }
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ReviewData

import { ProductCart } from '@/type'
import Image from 'next/image'
import { FiShield } from 'react-icons/fi'
import QuantityStepper from './QuantityStepper'

type Props = Omit<ProductCart, | "category" | "isRecurring" | "variantLabel"> & { productName: string[] | string}

const ReviewItem = ({image, name, productName, billingPeriod, requiredItem, editable, compareAtPrice, price, quantity, productId, variantId}: Props) => {
  return (
    <div className="flex gap-[16px] items-center">
        <div className="flex flex-2 gap-[3px] justify-between items-center">
            <div className="flex flex-row items-center gap-[12px]">
                {image === null ? <FiShield className="text-purple" size={22} /> : <Image className="w-[41px] h-[41px] bg-white rounded-[5px]" src={image} alt={name} width={50} height={50} />}
                <h3 className={`${name === "Cam Unlimited" ? "font-semibold text-[16px]" : "font-medium text-sm"}`}>
                    {name === "Cam Unlimited" ? (
                    <>
                        {productName[0]}{" "}
                        <span className="text-purple">{productName[1]}</span>
                    </>
                    ) : (
                    name
                    )}
                </h3>
            </div>
            {/* quantity */}
            <QuantityStepper productId={productId} variantId={variantId} billingPeriod={billingPeriod} requiredItem={requiredItem} editable={editable} quantity={quantity} />
        </div>
        <div className='flex flex-col md:flex-row md:gap-[10px] xl:flex-col xl:gap-0'>
            {compareAtPrice && <p className="font-medium text-sm text-review-cut-price line-through text-right">${compareAtPrice}{billingPeriod && <span>/{billingPeriod}</span>}</p>}
            {price === 0 ? <p className="font-semibold text-sm text-purple text-right">FREE</p> : <p className="font-semibold text-right text-sm text-purple">${price}{billingPeriod && <span>/{billingPeriod}</span>}</p>}
        </div>
    </div>
  )
}

export default ReviewItem

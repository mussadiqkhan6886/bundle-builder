import { Product } from '@/type'
import Link from 'next/link'
import VariantSelector from './VariantSelector'
import ProductQtyStepper from './ProductQtyStepper'
import ImageChanger from './ImageChanger'

type Props = {
  product: Product
  length: number
  index: number
  isProductSelected: (productId: string) => boolean
}

const Products = ({product, length, index, isProductSelected}: Props) => {

  {/* center last div only if its single or alone only on desktop size (greater then 1536px) */}
  const isLast = index === length - 1
  const isOdd = length % 2 === 1

  const billing = product.billingPeriod ? `/${product.billingPeriod}` : "";

  const isSelected = isProductSelected(product.id)

  return (
    <div className={`p-[10px] bg-white items-center h-full flex flex-col xl:flex-row gap-[13px] rounded-[10px] ${isLast && isOdd ? "xl:col-span-2 xl:flex xl:justify-center xl:w-[381px]" : "w-full "} border-2  ${isSelected ? "border-selected-product" : "border-transparent"}`}>
      <div className="relative w-full xl:w-[160px] h-[170px] ">
        {/* badge */}
        {product.badge && <span className="absolute top-2 left-2 bg-purple text-white py-[2px] px-[6px] rounded-[10px] font-semibold text-xs z-20 ">{product.badge}</span>}
        <ImageChanger image={product.image} name={product.name} variants={product.variants} id={product.id} />
      </div>
      <div className="flex flex-col gap-[12px] w-full">
        <div className="flex flex-col gap-[10px]">
            <h2 className="font-semibold text-[16px] leading-tight tracking-[0.6px]">{product.name}</h2>
            <p className="font-medium text-[13px] lg:text-xs xl:text-[13px] text-black/80">{product.description} {product.learnMoreUrl !== undefined && <Link target="_blank" className="text-purple underline" href={product.learnMoreUrl}>Learn More</Link>}</p>
           {product.variants && <div className="flex flex-wrap gap-[6px]">
                {product.variants.map(v => (
                    <VariantSelector key={v.variantId} productId={product.id} {...v}  />
                ))}
            </div>}
        </div>
        <div className="flex justify-between items-center">
           {!product.billingPeriod && <ProductQtyStepper id={product.id} requiredItem={product.requiredItem} editable={product.editable} category={product.category} />}
           <div className="flex items-center xl:flex-col gap-[3px] xl:gap-[1px]">
            {product.compareAtPrice && (
              <span className="text-red tracking-[0.6px] line-through text-[16px] lg:text-sm xl:text-[16px] text-right">
                ${product.compareAtPrice}
                {billing}
              </span>
            )}

            <span className="text-[16px] lg:text-sm xl:text-[16px] text-price-product tracking-[0.6px]">
              {product.price === 0 ? "FREE" : `$${product.price}${billing}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products

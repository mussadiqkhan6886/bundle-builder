'use client'

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import { Step, Product, CartContextValue, Selections, ActiveVariants, LineItem } from '@/type'

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'savedSystem'

export function CartProvider({ 
    steps,
    seedSelections,
    seedActiveVariants,
    children,
}: {
  steps: Step[]
  seedSelections: Selections
  seedActiveVariants: ActiveVariants
  children: React.ReactNode
 }) {
  const [selections, setSelections] = useState<Selections>(seedSelections)
  const [activeVariants, setActiveVariants] = useState<ActiveVariants>(seedActiveVariants)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setSelections(parsed.selections)
      setActiveVariants(parsed.activeVariants)
    }
  }, [])

  const productLookup = useMemo(() => {
    const map: Record<string, Product> = {}
    steps.forEach(step => {
      step.products.forEach(product => {
        map[product.id] = product
      })
    })
    return map
  }, [steps])

  const setQuantity = useCallback(
    (productId: string, variantId: string, newQty: number) => {
      const product = productLookup[productId]
      if (!product) return

      let clamped = Math.max(0, newQty)

      if (product.requiredItem && !product.editable) {
        clamped = 1
      }

      if(product.category === "plan"){
        clamped = Math.min(1, clamped)
      }

      setSelections(prev => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          [variantId]: clamped,
        },
      }))
    },
    [productLookup]
  )

  const increment = useCallback(
    (productId: string, variantId: string) => {
      const current = selections[productId]?.[variantId] ?? 0
      setQuantity(productId, variantId, current + 1)
    },
    [selections, setQuantity]
  )

  const decrement = useCallback(
    (productId: string, variantId: string) => {
      const current = selections[productId]?.[variantId] ?? 0
      setQuantity(productId, variantId, current - 1)
    },
    [selections, setQuantity]
  )

  const setActiveVariant = useCallback((productId: string, variantId: string) => {
    setActiveVariants(prev => ({
      ...prev,
      [productId]: variantId,
    }))
  }, [])

  const getQuantity = useCallback(
    (productId: string, variantId: string) => {
      return selections[productId]?.[variantId] ?? 0
    },
    [selections]
  )

  const getActiveVariantId = useCallback(
    (productId: string) => {
      return activeVariants[productId] ?? 'default'
    },
    [activeVariants]
  )

    //   will check
  const getSelectedCount = useCallback(
    (stepId: string) => {
      const step = steps.find(s => s.id === stepId)
      if (!step) return 0

      return step.products.filter(product => {
        const variantQtys = selections[product.id]
        if (!variantQtys) return false
        return Object.values(variantQtys).some(qty => qty > 0)
      }).length
    },
    [steps, selections]
  ) 

  const getLineItems = useCallback((): LineItem[] => {
    const items: LineItem[] = []

    Object.entries(selections).forEach(([productId, variantQtys]) => {
      const product = productLookup[productId]
      if (!product) return

      Object.entries(variantQtys).forEach(([variantId, qty]) => {
        if (qty > 0) {
          const variant = product.variants.find(v => v.variantId === variantId)
          items.push({
            productId,
            variantId,
            name: product.name,
            variantLabel: variant?.label ?? null,
            image:  variant?.variantImage ?? product.image,
            category: product.category,
            quantity: qty,
            price: product.price,
            highlightLastWord: product.highlightLastWord,
            compareAtPrice: product.compareAtPrice ?? null,
            editable: product.editable,
            requiredItem: product.requiredItem,
            billingPeriod: product.billingPeriod
          })
        }
      })
    })

    return items
  }, [selections, productLookup])

  const getGroupedLineItems = useCallback((): Record<string, LineItem[]> => {
    const items = getLineItems()
    const groups: Record<string, LineItem[]> = {
      cameras: [],
      sensors: [],
      accessories: [],
      plan: [],
    }

    items.forEach(item => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })

    return groups
  }, [getLineItems])

  const getTotals = useCallback(() => {
    const items = getLineItems()

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const compareAtSubtotal = items.reduce(
      (sum, item) => sum + (item.compareAtPrice ?? item.price) * item.quantity,
      0
    )

    return {
      subtotal,
      compareAtSubtotal,
      savings: compareAtSubtotal - subtotal,
    }
  }, [getLineItems])

  const saveSystem = useCallback(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selections, activeVariants })
    )
  }, [selections, activeVariants])

  const isProductSelected = useCallback(
    (productId: string) => {
      const variantQtys = selections[productId];
      if (!variantQtys) return false;

      return Object.values(variantQtys).some(qty => qty > 0);
    },
    [selections]
  );

  const value: CartContextValue = {
    steps,
    increment,
    decrement,
    setQuantity,
    activeVariants,
    setActiveVariant,
    getQuantity,
    getActiveVariantId,
    getSelectedCount,
    getLineItems,
    getGroupedLineItems,
    getTotals,
    saveSystem,
    isProductSelected
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
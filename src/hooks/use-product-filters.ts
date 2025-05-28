import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { Product } from '@/types'
import { useDebounce } from '@/hooks/use-debounce'
import { products, searchProducts } from '@/lib/data'

export type FilterState = {
  search: string
  category: string
}

export type ProductFiltersReturn = {
  filteredProducts: Product[]
  selectedCategory: string
  localSearchQuery: string

  setLocalSearchQuery: (query: string) => void
  handleCategoryChange: (category: string) => void

  productCount: number
}

export function useProductFilters(): ProductFiltersReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get('search') || ''
  const selectedCategory = searchParams.get('category') || ''

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const debouncedSearchQuery = useDebounce(localSearchQuery, 500)

  const updateFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      const newSearchParams = new URLSearchParams(searchParams)

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value.trim()) {
          newSearchParams.set(key, value)
        } else {
          newSearchParams.delete(key)
        }
      })

      setSearchParams(newSearchParams)
    },
    [searchParams, setSearchParams],
  )

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      updateFilters({ search: debouncedSearchQuery })
    }
  }, [debouncedSearchQuery, searchQuery, updateFilters])

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery)
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      )
    }

    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))

    return filtered
  }, [searchQuery, selectedCategory])

  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  const handleCategoryChange = (category: string) => {
    updateFilters({ category })
  }

  const productCount = filteredProducts.length

  return {
    filteredProducts,
    selectedCategory,
    localSearchQuery,

    setLocalSearchQuery,
    handleCategoryChange,

    productCount,
  }
}

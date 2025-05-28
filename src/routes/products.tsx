import { Search, Filter } from 'lucide-react'
import { useLoaderData } from 'react-router-dom'

import { categories } from '@/lib/data'
import { pluralize } from '@/lib/utils'
import { useProductFilters } from '@/hooks/use-product-filters'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProductCard } from '@/components/product/product-card'
import { Select } from '@/components/ui/select'

export function loader() {
  return {
    categories,
  }
}

export function Products() {
  const { categories } = useLoaderData() as {
    categories: string[]
  }

  const {
    filteredProducts,
    selectedCategory,
    localSearchQuery,
    setLocalSearchQuery,
    handleCategoryChange,
    productCount,
  } = useProductFilters()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600">
          {productCount} {pluralize(productCount, 'product')} found
        </p>
      </div>

      <Card className="space-y-4 bg-white p-6">
        <div className="flex items-center space-x-2">
          <Filter className="size-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                type="search"
                placeholder="Search products..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mx-auto max-w-md">
            <div className="text-6xl">🔍</div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or category to find what you're looking
              for.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

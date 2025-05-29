import { faker } from '@faker-js/faker'
import fs from 'fs'
import path from 'path'

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
  'Automotive',
]

const generateProducts = (count = 64) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 10000, max: 5000000 }),
    image: faker.image.urlPicsumPhotos({ width: 512, height: 512, blur: 0 }),
    category: faker.helpers.arrayElement(categories),
    stock: faker.number.int({ min: 0, max: 100 }),
    rating: parseFloat(
      faker.number.float({ min: 1, max: 5, fractionDigits: 1 }).toFixed(1),
    ),
    reviews: faker.number.int({ min: 0, max: 1000 }),
  }))
}

const data = {
  products: generateProducts(64),
  categories,
}

const outputPath = path.join(process.cwd(), 'src/data/products.json')
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

console.log(
  `Generated ${data.products.length} products and saved to ${outputPath}`,
)

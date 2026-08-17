export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage?: number
  rating: number
  stock: number
  brand?: string
  category: string
  thumbnail: string
  images: string[]
}

// DummyJSON 清單 API 回傳的包裝格式
export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CartItem {
  product: Product
  quantity: number
}
import apiClient from './client'
import type { Product, ProductsResponse } from '../types/product'

export const productApi = {
  // 取得商品列表 (預設取前 20 筆)
  getProducts: async (): Promise<Product[]> => {
    const res: ProductsResponse = await apiClient.get('/products?limit=20')
    return res.products
  },

  // 取得單一商品詳情
  getProductById: (id: number): Promise<Product> => {
    return apiClient.get(`/products/${id}`)
  },

  // 取得分類清單
  getCategories: async (): Promise<string[]> => {
    const res: Array<string | { slug: string; name: string }> = await apiClient.get('/products/category-list')
    return res.map((cat) => (typeof cat === 'string' ? cat : cat.slug))
  },

  // 依分類取得商品
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const res: ProductsResponse = await apiClient.get(`/products/category/${category}`)
    return res.products
  },

  // 關鍵字搜尋 (使用 DummyJSON 內建搜尋 API)
  searchProducts: async (keyword: string): Promise<Product[]> => {
    const res: ProductsResponse = await apiClient.get(`/products/search?q=${encodeURIComponent(keyword)}`)
    return res.products
  }
}
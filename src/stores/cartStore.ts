import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product, CartItem } from '../types/product'

const STORAGE_KEY = 'dummyjson_store_cart'

export const useCartStore = defineStore('cart', () => {
  // 從 LocalStorage 還原購物車，若無則為空陣列
  const savedCart = localStorage.getItem(STORAGE_KEY)
  const cartItems = ref<CartItem[]>(savedCart ? JSON.parse(savedCart) : [])

  // 監聽購物車變化，自動存入 LocalStorage
  watch(
    cartItems,
    (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    },
    { deep: true }
  )

  const totalCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2)
  })

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cartItems.value.find((item) => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cartItems.value.push({ product, quantity })
    }
  }

  const updateQuantity = (productId: number, delta: number) => {
    const item = cartItems.value.find((i) => i.product.id === productId)
    if (!item) return
    item.quantity += delta
    if (item.quantity <= 0) {
      removeFromCart(productId)
    }
  }

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter((i) => i.product.id !== productId)
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    totalCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }
})
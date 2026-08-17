<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { productApi } from '../api/productApi'
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../types/product'

const products = ref<Product[]>([])
const categories = ref<string[]>([])
const selectedCategory = ref<string>('all')
const searchKeyword = ref<string>('')
const loading = ref<boolean>(false)

const cartStore = useCartStore()

const loadData = async () => {
  loading.value = true
  try {
    const [prodData, catData] = await Promise.all([
      productApi.getProducts(),
      productApi.getCategories()
    ])
    products.value = prodData
    categories.value = catData.slice(0, 8)
  } catch (err) {
    console.error('載入失敗:', err)
  } finally {
    loading.value = false
  }
}

const handleSelectCategory = async (category: string) => {
  selectedCategory.value = category
  searchKeyword.value = ''
  loading.value = true
  try {
    if (category === 'all') {
      products.value = await productApi.getProducts()
    } else {
      products.value = await productApi.getProductsByCategory(category)
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleSearch = async () => {
  if (!searchKeyword.value.trim()) {
    handleSelectCategory('all')
    return
  }
  selectedCategory.value = ''
  loading.value = true
  try {
    products.value = await productApi.searchProducts(searchKeyword.value)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div>
    <!-- 搜尋與分類 -->
    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px; display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 8px;">
        <input
          v-model="searchKeyword"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="🔍 輸入關鍵字後按 Enter 搜尋..."
          style="flex: 1; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px;"
        />
        <button
          @click="handleSearch"
          style="padding: 0 18px; background: #0284c7; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;"
        >
          搜尋
        </button>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button
          @click="handleSelectCategory('all')"
          :style="{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid #0284c7',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            backgroundColor: selectedCategory === 'all' ? '#0284c7' : '#ffffff',
            color: selectedCategory === 'all' ? '#ffffff' : '#0284c7'
          }"
        >
          全部 (All)
        </button>

        <button
          v-for="cat in categories"
          :key="cat"
          @click="handleSelectCategory(cat)"
          :style="{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid #0284c7',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            backgroundColor: selectedCategory === cat ? '#0284c7' : '#ffffff',
            color: selectedCategory === cat ? '#ffffff' : '#0284c7'
          }"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 載入中 -->
    <div v-if="loading" style="text-align: center; padding: 60px; color: #64748b;">
      ⏳ 商品載入中...
    </div>

    <!-- 無商品 -->
    <div v-else-if="products.length === 0" style="text-align: center; padding: 60px; color: #64748b; background: #fff; border-radius: 8px;">
      找不到符合條件的商品。
    </div>

    <!-- 商品網格 -->
    <div
      v-else
      style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;"
    >
      <div
        v-for="item in products"
        :key="item.id"
        style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;"
      >
        <RouterLink :to="`/product/${item.id}`" style="text-decoration: none; color: inherit;">
          <div style="height: 160px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; background: #f8fafc; border-radius: 6px; overflow: hidden;">
            <img :src="item.thumbnail" :alt="item.title" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
          </div>
          <div style="font-size: 12px; color: #0284c7; font-weight: bold; margin-bottom: 4px; text-transform: uppercase;">
            {{ item.brand || item.category }}
          </div>
          <h3 style="font-size: 14px; margin-bottom: 8px; line-height: 1.3; color: #0f172a; height: 36px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
            {{ item.title }}
          </h3>
        </RouterLink>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
            <span style="font-size: 18px; font-weight: bold; color: #0f172a;">${{ item.price }}</span>
            <span style="font-size: 12px; color: #f59e0b;">★ {{ item.rating }}</span>
          </div>

          <button
            @click="cartStore.addToCart(item)"
            style="width: 100%; padding: 8px; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px;"
          >
            🛒 加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
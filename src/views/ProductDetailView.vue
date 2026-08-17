<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productApi } from '../api/productApi'
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const productId = Number(route.params.id)
const product = ref<Product | null>(null)
const loading = ref<boolean>(false)
const buyQuantity = ref<number>(1)

const fetchDetail = async () => {
  loading.value = true
  try {
    product.value = await productApi.getProductById(productId)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  if (product.value) {
    cartStore.addToCart(product.value, buyQuantity.value)
    alert('已成功加入購物車！')
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<template>
  <div style="background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0;">
    <button
      @click="router.push('/')"
      style="margin-bottom: 24px; padding: 6px 14px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;"
    >
      ⬅️ 返回商品清單
    </button>

    <div v-if="loading" style="padding: 40px; text-align: center; color: #64748b;">
      ⏳ 商品詳情載入中...
    </div>

    <div v-else-if="product" style="display: flex; gap: 40px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 260px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-radius: 8px; padding: 20px;">
        <img :src="product.thumbnail" :alt="product.title" style="max-width: 100%; max-height: 300px; object-fit: contain;" />
      </div>

      <div style="flex: 1.5; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 13px; color: #0284c7; font-weight: bold; text-transform: uppercase;">
            {{ product.category }} {{ product.brand ? `• ${product.brand}` : '' }}
          </span>
          <h2 style="font-size: 22px; color: #0f172a; margin: 8px 0 12px 0;">
            {{ product.title }}
          </h2>
          <div style="color: #f59e0b; font-size: 14px; margin-bottom: 16px;">
            ★ {{ product.rating }} / 5.0 (庫存剩餘: {{ product.stock }} 件)
          </div>
          <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px; font-size: 14px;">
            {{ product.description }}
          </p>
        </div>

        <div>
          <div style="font-size: 28px; font-weight: bold; color: #0f172a; margin-bottom: 20px;">
            ${{ product.price }}
          </div>

          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="display: flex; border: 1px solid #cbd5e1; border-radius: 6px;">
              <button
                @click="buyQuantity > 1 && buyQuantity--"
                style="padding: 8px 14px; border: none; background: #f8fafc; cursor: pointer;"
              >
                -
              </button>
              <span style="padding: 8px 16px;">{{ buyQuantity }}</span>
              <button
                @click="buyQuantity++"
                style="padding: 8px 14px; border: none; background: #f8fafc; cursor: pointer;"
              >
                +
              </button>
            </div>

            <button
              @click="handleAdd"
              style="padding: 10px 24px; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; font-size: 15px; font-weight: bold; cursor: pointer;"
            >
              🛒 加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
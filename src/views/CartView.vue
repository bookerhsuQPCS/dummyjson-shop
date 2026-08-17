<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

const handleCheckout = () => {
  alert(`感謝購買！總計結帳金額為：$${cartStore.totalPrice}`)
  cartStore.clearCart()
  router.push('/')
}
</script>

<template>
  <div style="background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0;">
    <h2 style="font-size: 22px; margin-bottom: 20px; color: #0f172a;">🛒 我的購物車</h2>

    <!-- 購物車為空 -->
    <div v-if="cartStore.cartItems.length === 0" style="text-align: center; padding: 40px;">
      <p style="color: #64748b; margin-bottom: 16px;">目前購物車內沒有任何商品。</p>
      <button
        @click="router.push('/')"
        style="padding: 10px 20px; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;"
      >
        去逛逛商品
      </button>
    </div>

    <!-- 購物車清單 -->
    <div v-else>
      <div
        v-for="item in cartStore.cartItems"
        :key="item.product.id"
        style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #f1f5f9; gap: 16px; flex-wrap: wrap;"
      >
        <div style="display: flex; align-items: center; gap: 16px; flex: 2; min-width: 200px;">
          <img
            :src="item.product.thumbnail"
            :alt="item.product.title"
            style="width: 50px; height: 50px; object-fit: contain; background: #f8fafc; border-radius: 4px; border: 1px solid #e2e8f0;"
          />
          <div>
            <div style="font-weight: bold; color: #0f172a; font-size: 14px; margin-bottom: 4px;">
              {{ item.product.title }}
            </div>
            <div style="color: #64748b; font-size: 13px;">單價: ${{ item.product.price }}</div>
          </div>
        </div>

        <!-- 數量控制 -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <button
            @click="cartStore.updateQuantity(item.product.id, -1)"
            style="width: 28px; height: 28px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; cursor: pointer;"
          >
            -
          </button>
          <span style="font-weight: bold; min-width: 20px; text-align: center;">
            {{ item.quantity }}
          </span>
          <button
            @click="cartStore.updateQuantity(item.product.id, 1)"
            style="width: 28px; height: 28px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; cursor: pointer;"
          >
            +
          </button>
        </div>

        <!-- 小計與刪除 -->
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="font-weight: bold; color: #0f172a; min-width: 70px; text-align: right;">
            ${{ (item.product.price * item.quantity).toFixed(2) }}
          </div>
          <button
            @click="cartStore.removeFromCart(item.product.id)"
            style="color: #ef4444; background: none; border: none; cursor: pointer; font-size: 13px;"
          >
            刪除
          </button>
        </div>
      </div>

      <!-- 底部結帳區 -->
      <div style="margin-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <button
          @click="cartStore.clearCart"
          style="padding: 8px 16px; background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;"
        >
          清空購物車
        </button>

        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="font-size: 18px;">
            總計 ({{ cartStore.totalCount }} 件):
            <strong style="color: #0f172a; font-size: 24px; margin-left: 8px;">
              ${{ cartStore.totalPrice }}
            </strong>
          </div>
          <button
            @click="handleCheckout"
            style="padding: 12px 28px; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; font-weight: bold; font-size: 15px; cursor: pointer;"
          >
            前往結帳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
const { totalCount } = storeToRefs(cartStore)
</script>

<template>
  <div style="min-height: 100vh; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <!-- 頂部導覽列 -->
    <header style="background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 16px 24px; position: sticky; top: 0; z-index: 10;">
      <div style="max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <RouterLink to="/" style="font-size: 20px; font-weight: bold; text-decoration: none; color: #0f172a;">
          🛍️ DummyJSON Pro
        </RouterLink>

        <RouterLink
          to="/cart"
          style="text-decoration: none; background: #0284c7; color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; display: flex; align-items: center; gap: 8px;"
        >
          <span>購物車</span>
          <span style="background: #fff; color: #0284c7; border-radius: 50%; padding: 2px 8px; font-size: 12px;">
            {{ totalCount }}
          </span>
        </RouterLink>
      </div>
    </header>

    <!-- 主內容區 -->
    <main style="max-width: 1000px; margin: 30px auto; padding: 0 20px;">
      <RouterView />
    </main>
  </div>
</template>
# 🛍️ DummyJSON Pro - Vue 3 E-Commerce Web App

基於 Vue 3、TypeScript、Pinia 與 DummyJSON REST API 打造的現代化電商購物車系統。

## 🌟 核心功能 (Features)

- **商品瀏覽與分頁載入**：串接 DummyJSON API 非同步載入商品清單與詳細資訊。
- **分類過濾與後端搜尋**：
  - 支援動態分類標籤即時切換商品類別。
  - 整合後端全文檢索 API，支援關鍵字即時搜尋。
- **購物車狀態管理 (Pinia)**：
  - 跨元件/頁面加入購物車、即時調整數量、移除單項商品。
  - 即時計算購買品項總數與結帳總金額。
  - **資料持久化 (LocalStorage)**：重新整理頁面仍完整保留購物車資料。
- **TypeScript 型態保證**：定義嚴謹的 Product、ProductsResponse 與 CartItem 資料結構，確保資料流安全。

## 🛠️ 技術選型 (Tech Stack)

- **前端框架**：Vue 3 (Composition API / `<script setup>`)
- **開發語言**：TypeScript
- **狀態管理**：Pinia (with LocalStorage Sync)
- **路由系統**：Vue Router 4 (動態路由參數)
- **API 客戶端**：Axios (模組化封裝與攔截器)
- **公開資料來源**：[DummyJSON API](https://dummyjson.com/)
- **建置工具**：Vite

## 🚀 快速開始 (Quick Start)

### 1. 安裝相依套件
```bash
npm install --legacy-peer-deps
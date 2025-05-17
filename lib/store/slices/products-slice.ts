import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ProductVariation {
  id: string
  name: string
  price: number
  cost: number
}

export interface Product {
  id: string
  name: string
  sku: string
  description: string
  categoryId: string
  type: "product" | "service"
  price: number
  cost: number
  stock: number | null
  minStock: number
  supplierId: string | null
  hasVariations: boolean
  variations: ProductVariation[]
  status: "active" | "inactive"
  images: string[]
  customFields: {
    width: boolean
    height: boolean
    unit: string
    basePrice: number
  }
  notes?: string
  createdAt: string
  updatedAt: string
}

interface ProductsState {
  selectedProductId: string | null
  filters: {
    type: "all" | "product" | "service"
    stock: "all" | "in_stock" | "low_stock" | "out_of_stock"
    categoryId: string
    search: string
  }
}

const initialState: ProductsState = {
  selectedProductId: null,
  filters: {
    type: "all",
    stock: "all",
    categoryId: "all",
    search: "",
  },
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload
    },
    clearSelectedProduct: (state) => {
      state.selectedProductId = null
    },
    setTypeFilter: (state, action: PayloadAction<"all" | "product" | "service">) => {
      state.filters.type = action.payload
    },
    setStockFilter: (state, action: PayloadAction<"all" | "in_stock" | "low_stock" | "out_of_stock">) => {
      state.filters.stock = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.categoryId = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const {
  selectProduct,
  clearSelectedProduct,
  setTypeFilter,
  setStockFilter,
  setCategoryFilter,
  setSearchFilter,
  clearFilters,
} = productsSlice.actions

export default productsSlice.reducer

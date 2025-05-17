import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { OrderItem } from "@/components/orders/order-form"

export interface Order {
  id: string
  clientId: string
  date: string
  deadline: string
  items: OrderItem[]
  notes?: string
  subtotal: number
  discount: number
  total: number
  status: "new" | "production" | "completed" | "delivered" | "canceled"
  paymentStatus: "pending" | "partial" | "paid" | "refunded"
  paymentMethod: "full" | "split" | "credit"
  paymentDetails?: string
  quoteId?: string
  createdAt: string
  updatedAt: string
}

interface OrdersState {
  selectedOrderId: string | null
  filters: {
    status: "all" | "new" | "production" | "completed" | "delivered" | "canceled"
    paymentStatus: "all" | "pending" | "partial" | "paid" | "refunded"
    search: string
    dateRange: "all" | "today" | "week" | "month" | "overdue"
  }
}

const initialState: OrdersState = {
  selectedOrderId: null,
  filters: {
    status: "all",
    paymentStatus: "all",
    search: "",
    dateRange: "all",
  },
}

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<string>) => {
      state.selectedOrderId = action.payload
    },
    clearSelectedOrder: (state) => {
      state.selectedOrderId = null
    },
    setStatusFilter: (
      state,
      action: PayloadAction<"all" | "new" | "production" | "completed" | "delivered" | "canceled">,
    ) => {
      state.filters.status = action.payload
    },
    setPaymentStatusFilter: (state, action: PayloadAction<"all" | "pending" | "partial" | "paid" | "refunded">) => {
      state.filters.paymentStatus = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setDateRangeFilter: (state, action: PayloadAction<"all" | "today" | "week" | "month" | "overdue">) => {
      state.filters.dateRange = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const {
  selectOrder,
  clearSelectedOrder,
  setStatusFilter,
  setPaymentStatusFilter,
  setSearchFilter,
  setDateRangeFilter,
  clearFilters,
} = ordersSlice.actions

export default ordersSlice.reducer

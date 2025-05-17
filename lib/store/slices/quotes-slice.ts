import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { QuoteItem } from "@/components/quotes/quote-form"

export interface Quote {
  id: string
  clientId: string
  date: string
  validUntil: string
  items: QuoteItem[]
  notes?: string
  subtotal: number
  discount: number
  total: number
  status: "pending" | "approved" | "rejected" | "expired"
  createdAt: string
  updatedAt: string
}

interface QuotesState {
  selectedQuoteId: string | null
  filters: {
    status: "all" | "pending" | "approved" | "rejected" | "expired"
    search: string
    dateRange: "all" | "today" | "week" | "month" | "quarter" | "year"
  }
}

const initialState: QuotesState = {
  selectedQuoteId: null,
  filters: {
    status: "all",
    search: "",
    dateRange: "all",
  },
}

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    selectQuote: (state, action: PayloadAction<string>) => {
      state.selectedQuoteId = action.payload
    },
    clearSelectedQuote: (state) => {
      state.selectedQuoteId = null
    },
    setStatusFilter: (state, action: PayloadAction<"all" | "pending" | "approved" | "rejected" | "expired">) => {
      state.filters.status = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setDateRangeFilter: (state, action: PayloadAction<"all" | "today" | "week" | "month" | "quarter" | "year">) => {
      state.filters.dateRange = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const { selectQuote, clearSelectedQuote, setStatusFilter, setSearchFilter, setDateRangeFilter, clearFilters } =
  quotesSlice.actions

export default quotesSlice.reducer

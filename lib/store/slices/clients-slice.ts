import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  document?: string
  status: "active" | "inactive"
  company?: string
  address?: string
  city?: string
  state?: string
  zipcode?: string
  neighborhood?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface ClientsState {
  selectedClientId: string | null
  filters: {
    status: "all" | "active" | "inactive"
    search: string
  }
}

const initialState: ClientsState = {
  selectedClientId: null,
  filters: {
    status: "all",
    search: "",
  },
}

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    selectClient: (state, action: PayloadAction<string>) => {
      state.selectedClientId = action.payload
    },
    clearSelectedClient: (state) => {
      state.selectedClientId = null
    },
    setStatusFilter: (state, action: PayloadAction<"all" | "active" | "inactive">) => {
      state.filters.status = action.payload
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const { selectClient, clearSelectedClient, setStatusFilter, setSearchFilter, clearFilters } =
  clientsSlice.actions

export default clientsSlice.reducer

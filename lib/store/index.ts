import { configureStore } from "@reduxjs/toolkit"
import clientsReducer from "./slices/clients-slice"
import quotesReducer from "./slices/quotes-slice"
import ordersReducer from "./slices/orders-slice"

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    quotes: quotesReducer,
    orders: ordersReducer,
    // Adicione outros reducers aqui conforme necessário
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

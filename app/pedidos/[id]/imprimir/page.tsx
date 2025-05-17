import { OrderPrintView } from "@/components/orders/order-print-view"

export default function OrderPrintPage({ params }: { params: { id: string } }) {
  return <OrderPrintView id={params.id} />
}

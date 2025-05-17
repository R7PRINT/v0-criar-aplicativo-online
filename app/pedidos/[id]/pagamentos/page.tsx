import { OrderPayments } from "@/components/orders/order-payments"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OrderPaymentsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/pedidos/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pagamentos do Pedido #{params.id}</h1>
          <p className="text-muted-foreground">Gerencie os pagamentos deste pedido</p>
        </div>
      </div>
      <OrderPayments orderId={params.id} />
    </div>
  )
}

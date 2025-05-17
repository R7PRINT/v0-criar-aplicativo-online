import { OrderDetails } from "@/components/orders/order-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/pedidos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pedido #{params.id}</h1>
          <p className="text-muted-foreground">Visualize os detalhes do pedido</p>
        </div>
      </div>
      <OrderDetails id={params.id} />
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { OrdersTable } from "@/components/orders/orders-table"
import { OrdersFilter } from "@/components/orders/orders-filter"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
          <p className="text-muted-foreground">Gerencie seus pedidos e acompanhe a produção</p>
        </div>
        <Link href="/pedidos/novo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </Link>
      </div>
      <OrdersFilter />
      <OrdersTable />
    </div>
  )
}

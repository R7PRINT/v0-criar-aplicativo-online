import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

const recentOrders = [
  {
    id: "ORD-001",
    client: "Empresa ABC Ltda",
    status: "Em Produção",
    payment: "Pago",
    total: "R$ 1.250,00",
    date: "15/05/2023",
  },
  {
    id: "ORD-002",
    client: "João Silva ME",
    status: "Pendente",
    payment: "Pendente",
    total: "R$ 780,00",
    date: "14/05/2023",
  },
  {
    id: "ORD-003",
    client: "Gráfica Rápida",
    status: "Concluído",
    payment: "Pago",
    total: "R$ 2.340,00",
    date: "12/05/2023",
  },
  {
    id: "ORD-004",
    client: "Maria Comunicação Visual",
    status: "Em Produção",
    payment: "Parcial",
    total: "R$ 4.500,00",
    date: "10/05/2023",
  },
]

export function RecentOrders() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pedidos Recentes</CardTitle>
        <Link href="/pedidos">
          <Button variant="outline" size="sm">
            Ver todos
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground">
            <div>ID</div>
            <div className="col-span-2">Cliente</div>
            <div>Status</div>
            <div className="text-right">Ações</div>
          </div>
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="grid grid-cols-5 items-center text-sm">
                <div className="font-medium">{order.id}</div>
                <div className="col-span-2 truncate">{order.client}</div>
                <div>
                  <Badge
                    variant={
                      order.status === "Concluído" ? "success" : order.status === "Pendente" ? "warning" : "default"
                    }
                    className="whitespace-nowrap"
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver pedido {order.id}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

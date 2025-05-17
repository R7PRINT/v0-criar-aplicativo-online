import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const topProducts = [
  {
    id: "PROD-001",
    name: "Banner Lona 440g",
    sales: 28,
    revenue: "R$ 4.200,00",
  },
  {
    id: "PROD-002",
    name: "Adesivo Vinil Recorte",
    sales: 24,
    revenue: "R$ 3.600,00",
  },
  {
    id: "PROD-003",
    name: "Impressão A3 Colorida",
    sales: 22,
    revenue: "R$ 1.100,00",
  },
  {
    id: "PROD-004",
    name: "Placa PVC 3mm",
    sales: 18,
    revenue: "R$ 2.700,00",
  },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Produtos Principais</CardTitle>
        <Link href="/produtos">
          <Button variant="outline" size="sm">
            Ver todos
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground">
            <div>ID</div>
            <div className="col-span-2">Produto</div>
            <div className="text-right">Vendas</div>
          </div>
          <div className="space-y-2">
            {topProducts.map((product) => (
              <div key={product.id} className="grid grid-cols-4 items-center text-sm">
                <div className="font-medium">{product.id}</div>
                <div className="col-span-2 truncate">{product.name}</div>
                <div className="text-right">{product.sales}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

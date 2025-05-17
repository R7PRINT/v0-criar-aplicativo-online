"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { ProductSalesChart } from "@/components/products/product-sales-chart"
import { Badge } from "@/components/ui/badge"

interface ProductStats {
  id: string
  name: string
  totalSales: number
  totalRevenue: number
  averagePrice: number
  stockTurnover: number
  profitMargin: number
  topVariation: string
  bestMonth: string
  bestMonthRevenue: number
}

// Dados de exemplo para estatísticas
const sampleStats: ProductStats = {
  id: "PROD-001",
  name: "Banner Lona 440g",
  totalSales: 70,
  totalRevenue: 10500,
  averagePrice: 150,
  stockTurnover: 3.5,
  profitMargin: 50,
  topVariation: "1m x 1m",
  bestMonth: "Junho",
  bestMonthRevenue: 3000,
}

export function ProductStatistics({ id }: { id: string }) {
  const [stats, setStats] = useState<ProductStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar as estatísticas
    // Simulando com um timeout e dados de exemplo
    const fetchStats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setStats(sampleStats)
      setLoading(false)
    }

    fetchStats()
  }, [id, timeRange])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Carregando estatísticas do produto...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Produto não encontrado.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{stats.name}</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Últimos 30 dias</SelectItem>
            <SelectItem value="3months">Últimos 3 meses</SelectItem>
            <SelectItem value="6months">Últimos 6 meses</SelectItem>
            <SelectItem value="1year">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
            <p className="text-xs text-muted-foreground">unidades</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">média de {formatCurrency(stats.averagePrice)} por unidade</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Margem de Lucro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.profitMargin}%</div>
            <p className="text-xs text-muted-foreground">giro de estoque: {stats.stockTurnover}x</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Melhor Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bestMonth}</div>
            <p className="text-xs text-muted-foreground">{formatCurrency(stats.bestMonthRevenue)}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="variations">Variações</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductSalesChart productId={id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="variations">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Variação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Variação</th>
                      <th className="p-2 text-left font-medium">Vendas</th>
                      <th className="p-2 text-left font-medium">Receita</th>
                      <th className="p-2 text-left font-medium">% do Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">1m x 1m</td>
                      <td className="p-2">35</td>
                      <td className="p-2">{formatCurrency(5250)}</td>
                      <td className="p-2">50%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">2m x 1m</td>
                      <td className="p-2">25</td>
                      <td className="p-2">{formatCurrency(3750)}</td>
                      <td className="p-2">36%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">3m x 1m</td>
                      <td className="p-2">10</td>
                      <td className="p-2">{formatCurrency(1500)}</td>
                      <td className="p-2">14%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Principais Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Cliente</th>
                      <th className="p-2 text-left font-medium">Compras</th>
                      <th className="p-2 text-left font-medium">Valor Total</th>
                      <th className="p-2 text-left font-medium">Último Pedido</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Empresa ABC Ltda</td>
                      <td className="p-2">12</td>
                      <td className="p-2">{formatCurrency(1800)}</td>
                      <td className="p-2">15/05/2023</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">João Silva ME</td>
                      <td className="p-2">8</td>
                      <td className="p-2">{formatCurrency(1200)}</td>
                      <td className="p-2">14/05/2023</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Gráfica Rápida</td>
                      <td className="p-2">15</td>
                      <td className="p-2">{formatCurrency(2250)}</td>
                      <td className="p-2">12/05/2023</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Maria Comunicação Visual</td>
                      <td className="p-2">20</td>
                      <td className="p-2">{formatCurrency(3000)}</td>
                      <td className="p-2">10/05/2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left font-medium">Pedido</th>
                  <th className="p-2 text-left font-medium">Cliente</th>
                  <th className="p-2 text-left font-medium">Data</th>
                  <th className="p-2 text-left font-medium">Quantidade</th>
                  <th className="p-2 text-left font-medium">Valor</th>
                  <th className="p-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">PED-001</td>
                  <td className="p-2">Empresa ABC Ltda</td>
                  <td className="p-2">15/05/2023</td>
                  <td className="p-2">2</td>
                  <td className="p-2">{formatCurrency(300)}</td>
                  <td className="p-2">
                    <Badge variant="success">Entregue</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">PED-002</td>
                  <td className="p-2">João Silva ME</td>
                  <td className="p-2">14/05/2023</td>
                  <td className="p-2">3</td>
                  <td className="p-2">{formatCurrency(450)}</td>
                  <td className="p-2">
                    <Badge variant="warning">Em Produção</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">PED-003</td>
                  <td className="p-2">Gráfica Rápida</td>
                  <td className="p-2">12/05/2023</td>
                  <td className="p-2">5</td>
                  <td className="p-2">{formatCurrency(750)}</td>
                  <td className="p-2">
                    <Badge variant="success">Entregue</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">PED-004</td>
                  <td className="p-2">Maria Comunicação Visual</td>
                  <td className="p-2">10/05/2023</td>
                  <td className="p-2">4</td>
                  <td className="p-2">{formatCurrency(600)}</td>
                  <td className="p-2">
                    <Badge variant="success">Entregue</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

interface SalesData {
  period: string
  quantity: number
  revenue: number
}

// Dados de exemplo para vendas
const sampleSalesData: SalesData[] = [
  { period: "Jan", quantity: 5, revenue: 750 },
  { period: "Fev", quantity: 8, revenue: 1200 },
  { period: "Mar", quantity: 12, revenue: 1800 },
  { period: "Abr", quantity: 10, revenue: 1500 },
  { period: "Mai", quantity: 15, revenue: 2250 },
  { period: "Jun", quantity: 20, revenue: 3000 },
]

export function ProductSalesChart({ productId }: { productId: string }) {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar os dados de vendas
    // Simulando com um timeout e dados de exemplo
    const fetchSalesData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSalesData(sampleSalesData)
      setLoading(false)
    }

    fetchSalesData()
  }, [productId, timeRange])

  const totalQuantity = salesData.reduce((sum, data) => sum + data.quantity, 0)
  const totalRevenue = salesData.reduce((sum, data) => sum + data.revenue, 0)
  const maxRevenue = Math.max(...salesData.map((data) => data.revenue))

  if (loading) {
    return <div className="py-4 text-center">Carregando dados de vendas...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <p className="text-sm font-medium text-muted-foreground">Período</p>
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
        <div className="flex gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium text-muted-foreground">Quantidade Vendida</p>
            <p className="text-2xl font-bold">{totalQuantity}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <div className="flex h-full items-end gap-2">
          {salesData.map((data, index) => (
            <div key={index} className="relative flex flex-1 flex-col items-center">
              <div className="w-full">
                <div
                  className="w-full rounded-t bg-primary"
                  style={{
                    height: `${(data.revenue / maxRevenue) * 200}px`,
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs">{data.period}</div>
              <div className="absolute -top-6 text-xs font-medium">{formatCurrency(data.revenue)}</div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b text-sm">
                <th className="pb-2 text-left font-medium text-muted-foreground">Período</th>
                <th className="pb-2 text-right font-medium text-muted-foreground">Quantidade</th>
                <th className="pb-2 text-right font-medium text-muted-foreground">Receita</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((data, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{data.period}</td>
                  <td className="py-2 text-right">{data.quantity}</td>
                  <td className="py-2 text-right">{formatCurrency(data.revenue)}</td>
                </tr>
              ))}
              <tr className="font-medium">
                <td className="py-2">Total</td>
                <td className="py-2 text-right">{totalQuantity}</td>
                <td className="py-2 text-right">{formatCurrency(totalRevenue)}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

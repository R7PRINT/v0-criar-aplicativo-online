import { ProductStatistics } from "@/components/products/product-statistics"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProductStatisticsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/produtos/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estatísticas do Produto</h1>
          <p className="text-muted-foreground">Análise de desempenho e vendas</p>
        </div>
      </div>
      <ProductStatistics id={params.id} />
    </div>
  )
}

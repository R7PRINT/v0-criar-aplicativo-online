import { ProductVariations } from "@/components/products/product-variations"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProductVariationsPage({ params }: { params: { id: string } }) {
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
          <h1 className="text-3xl font-bold tracking-tight">Variações do Produto</h1>
          <p className="text-muted-foreground">Gerencie as variações deste produto</p>
        </div>
      </div>
      <ProductVariations id={params.id} />
    </div>
  )
}

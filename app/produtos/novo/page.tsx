import { ProductForm } from "@/components/products/product-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/produtos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Produto</h1>
          <p className="text-muted-foreground">Adicione um novo produto ou serviço ao catálogo</p>
        </div>
      </div>
      <ProductForm />
    </div>
  )
}

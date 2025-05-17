import { Button } from "@/components/ui/button"
import { CategoryTable } from "@/components/products/category-table"
import Link from "next/link"
import { PlusCircle, ArrowLeft } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/produtos">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
            <p className="text-muted-foreground">Gerencie as categorias de produtos e serviços</p>
          </div>
        </div>
        <Link href="/produtos/categorias/nova">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        </Link>
      </div>
      <CategoryTable />
    </div>
  )
}

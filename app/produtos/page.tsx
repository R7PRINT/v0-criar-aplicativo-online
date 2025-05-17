import { Button } from "@/components/ui/button"
import { ProductsTable } from "@/components/products/products-table"
import { ProductsFilter } from "@/components/products/products-filter"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { ProductCategorySelector } from "@/components/products/product-category-selector"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos e Serviços</h1>
          <p className="text-muted-foreground">Gerencie seu catálogo de produtos e serviços</p>
        </div>
        <Link href="/produtos/novo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <ProductsFilter />
        <ProductCategorySelector className="w-full md:w-[250px]" />
      </div>
      <ProductsTable />
    </div>
  )
}

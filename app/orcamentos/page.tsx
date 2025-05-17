import { Button } from "@/components/ui/button"
import { QuotesTable } from "@/components/quotes/quotes-table"
import { QuotesFilter } from "@/components/quotes/quotes-filter"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function QuotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
          <p className="text-muted-foreground">Gerencie seus orçamentos e propostas</p>
        </div>
        <Link href="/orcamentos/novo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Orçamento
          </Button>
        </Link>
      </div>
      <QuotesFilter />
      <QuotesTable />
    </div>
  )
}

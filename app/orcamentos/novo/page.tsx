import { QuoteForm } from "@/components/quotes/quote-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewQuotePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/orcamentos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Orçamento</h1>
          <p className="text-muted-foreground">Crie um novo orçamento para seu cliente</p>
        </div>
      </div>
      <QuoteForm />
    </div>
  )
}

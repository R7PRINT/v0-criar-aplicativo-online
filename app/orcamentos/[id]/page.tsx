import { QuoteDetails } from "@/components/quotes/quote-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function QuoteDetailsPage({ params }: { params: { id: string } }) {
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
          <h1 className="text-3xl font-bold tracking-tight">Orçamento #{params.id}</h1>
          <p className="text-muted-foreground">Visualize os detalhes do orçamento</p>
        </div>
      </div>
      <QuoteDetails id={params.id} />
    </div>
  )
}

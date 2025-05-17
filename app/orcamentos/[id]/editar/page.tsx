import { QuoteForm } from "@/components/quotes/quote-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditQuotePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/orcamentos/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Orçamento #{params.id}</h1>
          <p className="text-muted-foreground">Atualize as informações do orçamento</p>
        </div>
      </div>
      <QuoteForm id={params.id} />
    </div>
  )
}

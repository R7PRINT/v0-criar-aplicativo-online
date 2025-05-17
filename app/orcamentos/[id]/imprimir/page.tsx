import { QuotePrintView } from "@/components/quotes/quote-print-view"

export default function QuotePrintPage({ params }: { params: { id: string } }) {
  return <QuotePrintView id={params.id} />
}

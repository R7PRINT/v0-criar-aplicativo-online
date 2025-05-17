"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

interface TimelineEvent {
  id: string
  date: string
  time: string
  type: "status" | "payment" | "note" | "creation"
  description: string
  user: string
  details?: string
  amount?: number
  status?: string
}

// Dados de exemplo para a linha do tempo
const sampleTimelineEvents: TimelineEvent[] = [
  {
    id: "event-1",
    date: "15/05/2023",
    time: "09:30",
    type: "creation",
    description: "Pedido criado",
    user: "João Silva",
    status: "new",
  },
  {
    id: "event-2",
    date: "15/05/2023",
    time: "10:15",
    type: "payment",
    description: "Pagamento parcial recebido",
    user: "Maria Oliveira",
    amount: 250,
    details: "Pagamento de 50% via PIX",
  },
  {
    id: "event-3",
    date: "16/05/2023",
    time: "08:45",
    type: "status",
    description: "Status alterado para Em Produção",
    user: "Pedro Santos",
    status: "production",
  },
  {
    id: "event-4",
    date: "16/05/2023",
    time: "14:20",
    type: "note",
    description: "Nota adicionada",
    user: "Ana Costa",
    details: "Cliente solicitou entrega em horário comercial",
  },
  {
    id: "event-5",
    date: "20/05/2023",
    time: "11:30",
    type: "status",
    description: "Status alterado para Concluído",
    user: "Pedro Santos",
    status: "completed",
  },
  {
    id: "event-6",
    date: "22/05/2023",
    time: "15:45",
    type: "payment",
    description: "Pagamento final recebido",
    user: "Maria Oliveira",
    amount: 250,
    details: "Pagamento de 50% restante via transferência bancária",
  },
  {
    id: "event-7",
    date: "23/05/2023",
    time: "10:00",
    type: "status",
    description: "Status alterado para Entregue",
    user: "João Silva",
    status: "delivered",
  },
]

export function OrderTimeline({ orderId }: { orderId: string }) {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar os eventos da linha do tempo
    // Simulando com um timeout e dados de exemplo
    const fetchEvents = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setEvents(sampleTimelineEvents)
      setLoading(false)
    }

    fetchEvents()
  }, [orderId])

  const getStatusBadge = (status?: string) => {
    if (!status) return null

    switch (status) {
      case "new":
        return <Badge variant="outline">Novo</Badge>
      case "production":
        return <Badge variant="warning">Em Produção</Badge>
      case "completed":
        return <Badge variant="success">Concluído</Badge>
      case "delivered":
        return <Badge variant="default">Entregue</Badge>
      case "canceled":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "status":
        return <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">S</div>
      case "payment":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-500">P</div>
        )
      case "note":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
            N
          </div>
        )
      case "creation":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">C</div>
        )
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/20 text-gray-500">?</div>
        )
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Carregando linha do tempo...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linha do Tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={event.id} className="relative flex gap-6">
              {index < events.length - 1 && <div className="absolute left-4 top-8 bottom-0 w-px -ml-px bg-border" />}
              <div className="flex-none">{getEventIcon(event.type)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{event.description}</p>
                  <div className="flex items-center gap-2">
                    {event.status && getStatusBadge(event.status)}
                    {event.amount && (
                      <Badge variant="outline" className="font-mono">
                        {formatCurrency(event.amount)}
                      </Badge>
                    )}
                  </div>
                </div>
                {event.details && <p className="text-sm text-muted-foreground">{event.details}</p>}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {event.date} às {event.time}
                  </span>
                  <span>{event.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

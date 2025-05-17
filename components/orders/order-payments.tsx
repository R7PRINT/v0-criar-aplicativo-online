"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"

interface Payment {
  id: string
  date: string
  amount: number
  method: string
  status: "confirmed" | "pending" | "canceled"
  reference: string
  notes?: string
}

// Dados de exemplo para pagamentos
const samplePayments: Payment[] = [
  {
    id: "PAG-001",
    date: "15/05/2023",
    amount: 250,
    method: "PIX",
    status: "confirmed",
    reference: "Entrada - 50%",
    notes: "Pagamento recebido via PIX",
  },
  {
    id: "PAG-002",
    date: "22/05/2023",
    amount: 250,
    method: "Transferência",
    status: "confirmed",
    reference: "Pagamento final - 50%",
    notes: "Transferência bancária recebida",
  },
]

export function OrderPayments({ orderId }: { orderId: string }) {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    amount: 0,
    method: "pix",
    status: "confirmed",
    reference: "",
    notes: "",
  })

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar os pagamentos
    // Simulando com um timeout e dados de exemplo
    const fetchPayments = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setPayments(samplePayments)
      setLoading(false)
    }

    fetchPayments()
  }, [orderId])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="success">Confirmado</Badge>
      case "pending":
        return <Badge variant="warning">Pendente</Badge>
      case "canceled":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const handleAddPayment = () => {
    // Aqui você faria uma chamada API para adicionar o pagamento
    // Simulando com dados locais
    const payment: Payment = {
      id: `PAG-00${payments.length + 1}`,
      date: new Date().toLocaleDateString("pt-BR"),
      amount: newPayment.amount || 0,
      method: newPayment.method || "pix",
      status: (newPayment.status as "confirmed" | "pending" | "canceled") || "confirmed",
      reference: newPayment.reference || "",
      notes: newPayment.notes,
    }

    setPayments([...payments, payment])
    setIsDialogOpen(false)
    setNewPayment({
      amount: 0,
      method: "pix",
      status: "confirmed",
      reference: "",
      notes: "",
    })
  }

  const calculateTotalPaid = () => {
    return payments
      .filter((payment) => payment.status === "confirmed")
      .reduce((sum, payment) => sum + payment.amount, 0)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Carregando pagamentos...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pagamentos</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Pagamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Pagamento</DialogTitle>
              <DialogDescription>Registre um novo pagamento para este pedido.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newPayment.amount || ""}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="method">Método de Pagamento</Label>
                <Select
                  value={newPayment.method}
                  onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}
                >
                  <SelectTrigger id="method">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="credit">Cartão de Crédito</SelectItem>
                    <SelectItem value="debit">Cartão de Débito</SelectItem>
                    <SelectItem value="transfer">Transferência</SelectItem>
                    <SelectItem value="cash">Dinheiro</SelectItem>
                    <SelectItem value="check">Cheque</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newPayment.status}
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, status: value as "confirmed" | "pending" | "canceled" })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reference">Referência</Label>
                <Input
                  id="reference"
                  value={newPayment.reference || ""}
                  onChange={(e) => setNewPayment({ ...newPayment, reference: e.target.value })}
                  placeholder="Ex: Entrada, Parcela 1/3, Pagamento final"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={newPayment.notes || ""}
                  onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                  placeholder="Informações adicionais sobre o pagamento"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPayment}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Referência</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum pagamento registrado. Clique em "Novo Pagamento" para adicionar.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.reference}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <div className="text-sm text-muted-foreground">Total de pagamentos: {payments.length}</div>
        <div className="font-medium">
          Total pago: <span className="font-bold">{formatCurrency(calculateTotalPaid())}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

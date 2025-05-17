"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, FileText, MoreHorizontal, Pencil, Trash2, DollarSign } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Dados de exemplo para pedidos
const orders = [
  {
    id: "PED-001",
    client: "Empresa ABC Ltda",
    items: 5,
    total: 1250.0,
    date: "15/05/2023",
    deadline: "25/05/2023",
    status: "production",
    paymentStatus: "partial",
  },
  {
    id: "PED-002",
    client: "João Silva ME",
    items: 3,
    total: 780.0,
    date: "14/05/2023",
    deadline: "20/05/2023",
    status: "new",
    paymentStatus: "pending",
  },
  {
    id: "PED-003",
    client: "Gráfica Rápida",
    items: 8,
    total: 2340.0,
    date: "12/05/2023",
    deadline: "22/05/2023",
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "PED-004",
    client: "Maria Comunicação Visual",
    items: 12,
    total: 4500.0,
    date: "10/05/2023",
    deadline: "18/05/2023",
    status: "delivered",
    paymentStatus: "paid",
  },
  {
    id: "PED-005",
    client: "Pedro Oliveira Design",
    items: 2,
    total: 650.0,
    date: "08/05/2023",
    deadline: "15/05/2023",
    status: "canceled",
    paymentStatus: "refunded",
  },
]

export function OrdersTable() {
  const router = useRouter()
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((order) => order.id))
    }
  }

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  const getStatusBadge = (status: string) => {
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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="success">Pago</Badge>
      case "partial":
        return <Badge variant="warning">Parcial</Badge>
      case "pending":
        return <Badge variant="outline">Pendente</Badge>
      case "refunded":
        return <Badge variant="destructive">Reembolsado</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={selectedOrders.length === orders.length && orders.length > 0}
                onChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Número</TableHead>
            <TableHead className="hidden md:table-cell">Cliente</TableHead>
            <TableHead className="hidden lg:table-cell">Data</TableHead>
            <TableHead className="hidden lg:table-cell">Prazo</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleSelectOrder(order.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell className="hidden md:table-cell">{order.client}</TableCell>
              <TableCell className="hidden lg:table-cell">{order.date}</TableCell>
              <TableCell className="hidden lg:table-cell">{order.deadline}</TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/pedidos/${order.id}`}>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/pedidos/${order.id}/editar`}>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => router.push(`/pedidos/${order.id}/pagamentos`)}>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Pagamentos
                    </DropdownMenuItem>
                    <Link href={`/pedidos/${order.id}/imprimir`} target="_blank">
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Imprimir
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

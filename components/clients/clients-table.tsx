"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

// Dados de exemplo para clientes
const clients = [
  {
    id: "1",
    name: "Empresa ABC Ltda",
    email: "contato@empresaabc.com.br",
    phone: "(11) 98765-4321",
    company: "Empresa ABC",
    status: "active",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 91234-5678",
    company: "João Silva ME",
    status: "active",
  },
  {
    id: "3",
    name: "Gráfica Rápida",
    email: "contato@graficarapida.com.br",
    phone: "(11) 3456-7890",
    company: "Gráfica Rápida Ltda",
    status: "inactive",
  },
  {
    id: "4",
    name: "Maria Comunicação Visual",
    email: "maria@comunicacaovisual.com",
    phone: "(11) 97654-3210",
    company: "Maria Comunicação Visual ME",
    status: "active",
  },
  {
    id: "5",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(11) 95432-1098",
    company: "Pedro Oliveira Design",
    status: "active",
  },
]

export function ClientsTable() {
  const [selectedClients, setSelectedClients] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([])
    } else {
      setSelectedClients(clients.map((client) => client.id))
    }
  }

  const toggleSelectClient = (id: string) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter((clientId) => clientId !== id))
    } else {
      setSelectedClients([...selectedClients, id])
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
                checked={selectedClients.length === clients.length && clients.length > 0}
                onChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="hidden md:table-cell">Contato</TableHead>
            <TableHead className="hidden md:table-cell">Empresa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedClients.includes(client.id)}
                  onChange={() => toggleSelectClient(client.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div>{client.email}</div>
                <div className="text-sm text-muted-foreground">{client.phone}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{client.company}</TableCell>
              <TableCell>
                <Badge variant={client.status === "active" ? "success" : "secondary"}>
                  {client.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/clientes/${client.id}`}>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/clientes/${client.id}/editar`}>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
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

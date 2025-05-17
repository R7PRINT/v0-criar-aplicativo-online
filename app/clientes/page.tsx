import { Button } from "@/components/ui/button"
import { ClientsTable } from "@/components/clients/clients-table"
import { ClientsFilter } from "@/components/clients/clients-filter"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Gerencie seus clientes e contatos</p>
        </div>
        <Link href="/clientes/novo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </div>
      <ClientsFilter />
      <ClientsTable />
    </div>
  )
}

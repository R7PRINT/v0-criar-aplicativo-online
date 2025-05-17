"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const pathname = usePathname()

  // Função para obter o título da página com base no pathname
  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard"
    if (pathname.startsWith("/clientes")) return "Clientes"
    if (pathname.startsWith("/produtos")) return "Produtos e Serviços"
    if (pathname.startsWith("/orcamentos")) return "Orçamentos"
    if (pathname.startsWith("/pedidos")) return "Pedidos"
    if (pathname.startsWith("/estoque")) return "Estoque"
    if (pathname.startsWith("/financeiro")) return "Financeiro"
    if (pathname.startsWith("/configuracoes")) return "Configurações"
    return ""
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notificações</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

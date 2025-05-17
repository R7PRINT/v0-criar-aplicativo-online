"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Users,
  Package,
  FileText,
  ShoppingCart,
  Warehouse,
  DollarSign,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Clientes", href: "/clientes", icon: Users },
  { name: "Produtos", href: "/produtos", icon: Package },
  { name: "Orçamentos", href: "/orcamentos", icon: FileText },
  { name: "Pedidos", href: "/pedidos", icon: ShoppingCart },
  { name: "Estoque", href: "/estoque", icon: Warehouse },
  { name: "Financeiro", href: "/financeiro", icon: DollarSign },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)} className="rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </div>

      <div
        className={cn("fixed inset-0 z-40 bg-black/80 lg:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-primary-700">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-white">R7 Print Manager</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white hover:bg-primary-700"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Fechar menu</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-700 hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

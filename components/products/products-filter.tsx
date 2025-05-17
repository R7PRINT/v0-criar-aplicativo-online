"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductsFilter() {
  const [search, setSearch] = useState("")
  const [type, setType] = useState("all")
  const [stock, setStock] = useState("all")

  const handleClearFilters = () => {
    setSearch("")
    setType("all")
    setStock("all")
  }

  return (
    <div className="flex flex-1 flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nome, SKU ou descrição..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="product">Produtos</SelectItem>
          <SelectItem value="service">Serviços</SelectItem>
        </SelectContent>
      </Select>
      <Select value={stock} onValueChange={setStock}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Estoque" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="in_stock">Em estoque</SelectItem>
          <SelectItem value="low_stock">Estoque baixo</SelectItem>
          <SelectItem value="out_of_stock">Sem estoque</SelectItem>
        </SelectContent>
      </Select>
      {(search || type !== "all" || stock !== "all") && (
        <Button variant="ghost" onClick={handleClearFilters} className="h-10 px-3 lg:px-4">
          <X className="mr-2 h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  )
}

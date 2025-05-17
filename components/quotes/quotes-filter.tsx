"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QuotesFilter() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  const handleClearFilters = () => {
    setSearch("")
    setStatus("all")
    setDateRange("all")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por número ou cliente..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="pending">Pendentes</SelectItem>
          <SelectItem value="approved">Aprovados</SelectItem>
          <SelectItem value="rejected">Rejeitados</SelectItem>
          <SelectItem value="expired">Expirados</SelectItem>
        </SelectContent>
      </Select>
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="today">Hoje</SelectItem>
          <SelectItem value="week">Esta semana</SelectItem>
          <SelectItem value="month">Este mês</SelectItem>
          <SelectItem value="quarter">Último trimestre</SelectItem>
          <SelectItem value="year">Este ano</SelectItem>
        </SelectContent>
      </Select>
      {(search || status !== "all" || dateRange !== "all") && (
        <Button variant="ghost" onClick={handleClearFilters} className="h-10 px-3 lg:px-4">
          <X className="mr-2 h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  )
}

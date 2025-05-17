"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"

// Dados de exemplo para categorias
const categories = [
  { value: "all", label: "Todas as categorias" },
  { value: "impressao-digital", label: "Impressão Digital" },
  { value: "impressao-grafica", label: "Impressão Gráfica" },
  { value: "materiais", label: "Materiais" },
  { value: "servicos", label: "Serviços" },
  { value: "acabamentos", label: "Acabamentos" },
  { value: "brindes", label: "Brindes" },
]

interface ProductCategorySelectorProps {
  className?: string
}

export function ProductCategorySelector({ className }: ProductCategorySelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("all")
  const router = useRouter()

  const handleCreateCategory = () => {
    router.push("/produtos/categorias/nova")
    setOpen(false)
  }

  const handleManageCategories = () => {
    router.push("/produtos/categorias")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("justify-between", className)}>
          {value === "all" ? "Todas as categorias" : categories.find((category) => category.value === value)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar categoria..." />
          <CommandList>
            <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === category.value ? "opacity-100" : "opacity-0")} />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem onSelect={handleCreateCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Nova categoria
              </CommandItem>
              <CommandItem onSelect={handleManageCategories}>Gerenciar categorias</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

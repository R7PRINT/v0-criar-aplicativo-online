"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statuses = [
  {
    value: "new",
    label: "Novo",
    variant: "outline" as const,
  },
  {
    value: "production",
    label: "Em Produção",
    variant: "warning" as const,
  },
  {
    value: "completed",
    label: "Concluído",
    variant: "success" as const,
  },
  {
    value: "delivered",
    label: "Entregue",
    variant: "default" as const,
  },
  {
    value: "canceled",
    label: "Cancelado",
    variant: "destructive" as const,
  },
]

interface OrderStatusSelectorProps {
  status: "new" | "production" | "completed" | "delivered" | "canceled"
  onStatusChange: (status: "new" | "production" | "completed" | "delivered" | "canceled") => void
}

export function OrderStatusSelector({ status, onStatusChange }: OrderStatusSelectorProps) {
  const [open, setOpen] = useState(false)

  const currentStatus = statuses.find((s) => s.value === status)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          <Badge variant={currentStatus?.variant}>{currentStatus?.label}</Badge>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>Nenhum status encontrado.</CommandEmpty>
            <CommandGroup>
              {statuses.map((s) => (
                <CommandItem
                  key={s.value}
                  value={s.value}
                  onSelect={() => {
                    onStatusChange(s.value as "new" | "production" | "completed" | "delivered" | "canceled")
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", status === s.value ? "opacity-100" : "opacity-0")} />
                  <Badge variant={s.variant} className="mr-2">
                    {s.label}
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

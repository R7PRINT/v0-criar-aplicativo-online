"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function ClientForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulando envio para API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push("/clientes")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="additional">Dados Adicionais</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Nome <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">
                    Telefone <span className="text-destructive">*</span>
                  </Label>
                  <Input id="phone" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="document">CPF/CNPJ</Label>
                  <Input id="document" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="additional">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input id="state" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="zipcode">CEP</Label>
                    <Input id="zipcode" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input id="neighborhood" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea id="notes" rows={4} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/clientes")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Cliente"}
        </Button>
      </div>
    </form>
  )
}

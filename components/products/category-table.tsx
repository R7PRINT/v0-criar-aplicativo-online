"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Category {
  id: string
  name: string
  description?: string
  productCount: number
  slug: string
}

// Dados de exemplo para categorias
const sampleCategories: Category[] = [
  {
    id: "1",
    name: "Impressão Digital",
    description: "Produtos de impressão digital em grandes formatos",
    productCount: 12,
    slug: "impressao-digital",
  },
  {
    id: "2",
    name: "Impressão Gráfica",
    description: "Produtos de impressão offset e digital em pequenos formatos",
    productCount: 8,
    slug: "impressao-grafica",
  },
  {
    id: "3",
    name: "Materiais",
    description: "Materiais diversos para comunicação visual",
    productCount: 5,
    slug: "materiais",
  },
  {
    id: "4",
    name: "Serviços",
    description: "Serviços de instalação, design e acabamento",
    productCount: 4,
    slug: "servicos",
  },
  {
    id: "5",
    name: "Acabamentos",
    description: "Serviços e produtos de acabamento",
    productCount: 6,
    slug: "acabamentos",
  },
  {
    id: "6",
    name: "Brindes",
    description: "Produtos promocionais e brindes personalizados",
    productCount: 10,
    slug: "brindes",
  },
]

export function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    // Aqui você faria uma chamada API para buscar as categorias
    // Simulando com um timeout e dados de exemplo
    const fetchCategories = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCategories(sampleCategories)
      setLoading(false)
    }

    fetchCategories()
  }, [])

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description || "",
    })
    setIsDialogOpen(true)
  }

  const handleSaveCategory = () => {
    if (editingCategory) {
      // Atualizar categoria existente
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                name: newCategory.name,
                description: newCategory.description,
              }
            : cat,
        ),
      )
    } else {
      // Criar nova categoria
      const newId = `${categories.length + 1}`
      const slug = newCategory.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")

      setCategories([
        ...categories,
        {
          id: newId,
          name: newCategory.name,
          description: newCategory.description,
          productCount: 0,
          slug,
        },
      ])
    }

    setIsDialogOpen(false)
    setEditingCategory(null)
    setNewCategory({ name: "", description: "" })
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
  }

  const handleAddNewCategory = () => {
    setEditingCategory(null)
    setNewCategory({ name: "", description: "" })
    setIsDialogOpen(true)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-40 items-center justify-center">
            <p>Carregando categorias...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias de Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Descrição</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead className="hidden md:table-cell">Slug</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nenhuma categoria encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{category.description || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{category.productCount}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{category.slug}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Total de categorias: {categories.length}</p>
        <Button onClick={handleAddNewCategory}>Adicionar Categoria</Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCategory} disabled={!newCategory.name}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

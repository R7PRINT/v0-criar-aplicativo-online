"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"

interface ProductPricingCalculatorProps {
  width: boolean
  height: boolean
  unit: string
  basePrice: number
}

export function ProductPricingCalculator({ width, height, unit, basePrice }: ProductPricingCalculatorProps) {
  const [widthValue, setWidthValue] = useState(1)
  const [heightValue, setHeightValue] = useState(1)

  const calculatePrice = () => {
    if (width && height) {
      return basePrice * widthValue * heightValue
    } else if (width) {
      return basePrice * widthValue
    } else if (height) {
      return basePrice * heightValue
    }
    return basePrice
  }

  const getUnitLabel = () => {
    if (unit === "m²") {
      return "m²"
    } else if (unit === "cm²") {
      return "cm²"
    } else {
      return unit
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Preço</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          {width && (
            <div className="grid gap-2">
              <Label htmlFor="width">Largura</Label>
              <Input
                id="width"
                type="number"
                min="0.1"
                step="0.1"
                value={widthValue}
                onChange={(e) => setWidthValue(Number(e.target.value))}
              />
            </div>
          )}
          {height && (
            <div className="grid gap-2">
              <Label htmlFor="height">Altura</Label>
              <Input
                id="height"
                type="number"
                min="0.1"
                step="0.1"
                value={heightValue}
                onChange={(e) => setHeightValue(Number(e.target.value))}
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label>Total</Label>
            <div className="flex items-center gap-2">
              <div className="rounded-md border bg-muted px-3 py-2 font-medium">{formatCurrency(calculatePrice())}</div>
              {(width || height) && (
                <div className="text-sm text-muted-foreground">
                  {width && height
                    ? `${widthValue} x ${heightValue} = ${(widthValue * heightValue).toFixed(2)} ${getUnitLabel()}`
                    : width
                      ? `${widthValue} ${getUnitLabel()}`
                      : `${heightValue} ${getUnitLabel()}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

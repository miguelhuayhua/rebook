"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Opcion, Variante } from "@/types/main"
import Image from "next/image"

interface VariantSelectorProps {
    opciones: Opcion[]
    variantes: Variante[]
    onVariantChange: (variant: Variante | null, selectedOptions: Record<string, string>) => void
}

export default function VariantSelector({ opciones, variantes, onVariantChange }: VariantSelectorProps) {
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
    const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)
    const hasMounted = useRef(false)

    // Effect to find and set the initial variant based on default or first available
    useEffect(() => {
        if (opciones.length === 0) {
            // Case: No options, select the first available variant
            const availableVariant = variantes.find(v => v.estado) || variantes[0] || null
            setSelectedVariant(availableVariant)
            onVariantChange(availableVariant, {})
        } else {
            // Case: With options, find default variant or initialize with first options
            const defaultVariant = variantes.find(v => v.valores.length == 0 && v.estado)
            let initialSelectedOptions: Record<string, string> = {}

            if (defaultVariant) {
                // If a default variant exists, set selected options based on its values
                defaultVariant.valores.forEach(vv => {
                    const opcion = opciones.find(o => o.valores.some(val => val.id === vv.valorOpcionId))
                    if (opcion) {
                        initialSelectedOptions[opcion.id] = vv.valorOpcionId
                    }
                })
            } else {
                // If no default variant, initialize with the first value of each option
                opciones.forEach(opcion => {
                    if (opcion.valores.length > 0) {
                        initialSelectedOptions[opcion.id] = opcion.valores[0].id
                    }
                })
            }

            setSelectedOptions(initialSelectedOptions)

            // Find the variant matching these initial options
            const matchingInitialVariant = variantes.find((variante) =>
                opciones.every((opcion) => {
                    const selectedValue = initialSelectedOptions[opcion.id]
                    if (!selectedValue) return false
                    return variante.valores.some((vv) => vv.valorOpcionId === selectedValue)
                })
            )
            setSelectedVariant(matchingInitialVariant || null)
            onVariantChange(matchingInitialVariant || null, initialSelectedOptions)
        }
        hasMounted.current = true // Mark as mounted after initial setup
    }, [opciones, variantes]) // Re-run if options or variants change (e.g., product change)

    // Effect to update variant when selectedOptions change (after initial mount)
    useEffect(() => {
        if (!hasMounted.current) {
            return // Skip on first render, handled by the previous useEffect
        }
        if (opciones.length === 0) return // Already handled for no options

        const matchingVariant = variantes.find((variante) =>
            opciones.every((opcion) => {
                const selectedValue = selectedOptions[opcion.id]
                if (!selectedValue) return false
                return variante.valores.some((vv) => vv.valorOpcionId === selectedValue)
            })
        )

        // Only update if the matching variant has actually changed
        if (matchingVariant?.id !== selectedVariant?.id) {
            setSelectedVariant(matchingVariant || null)
            onVariantChange(matchingVariant || null, selectedOptions)
        }
    }, [selectedOptions, opciones, variantes, onVariantChange, selectedVariant?.id])

    const handleOptionChange = (opcionId: string, valorId: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [opcionId]: valorId,
        }))
    }

    // Vista para productos sin opciones
    if (opciones.length === 0) {
        return (
            <div>
                <h3 className="font-semibold mb-5">Variante Disponible</h3>
                <div className="space-y-2">
                    {variantes.map((variante) => (
                        <div
                            className="flex text-base justify-between w-full items-center"
                            key={variante.id}
                            onClick={() => {
                                if (variante.estado) {
                                    setSelectedVariant(variante)
                                    onVariantChange(variante, {})
                                }
                            }}
                        >
                            <span>{variante.titulo}</span>
                            <span className="font-bold">
                                BOB {variante.precio.toFixed(2)}
                                {!variante.estado && " (Agotado)"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Variantes disponibles</h3>
            {opciones.map((opcion) => (
                <div key={opcion.id} className="space-y-2">

                    <label className="font-medium capitalize text-sm">{opcion.nombre}</label>
                    <div className="flex flex-wrap mt-2 gap-2">
                        {opcion.valores.map((valor) => {
                            const isSelected = selectedOptions[opcion.id] === valor.id
                            const isAvailable = variantes.some((variante) =>
                                variante.valores.some((vv) => vv.valorOpcionId === valor.id && variante.estado),
                            )
                            return (
                                <Button
                                    key={valor.id}
                                    variant={isSelected ? "secondary" : "outline"}
                                    size="sm"
                                    className={`capitalize ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => isAvailable && handleOptionChange(opcion.id, valor.id)}
                                    disabled={!isAvailable}
                                >
                                    {valor.valor}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            ))}
            {/* Info de variante seleccionada */}
            {selectedVariant && (
                <div className=" border border-secondary/20 bg-background p-2 rounded-md w-full border-t">
                    <div className="flex items-center justify-between gap-2">
                        <div className="p-2">
                            {selectedVariant.imagen && (
                                <div className="w-40 h-40 mb-4 relative rounded-md overflow-hidden">
                                    <Image fill alt="Imagen de variante" className="object-cover" src={selectedVariant.imagen.url || "/placeholder.svg"} />
                                </div>
                            )}
                            <p className="font-medium">{selectedVariant.titulo}</p>
                            <p className="text-sm text-muted-foreground">{selectedVariant.estado ? "En stock" : "Agotado"}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl  font-bold">BOB {selectedVariant.precio.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            )}
            {/* Mensaje de combinación no disponible */}
            {opciones.length > 0 && !selectedVariant && Object.keys(selectedOptions).length > 0 && (
                <div className="pt-3 border-t">
                    <Badge variant="outline" >Combinación no disponible</Badge>
                </div>
            )}
        </div>
    )
}

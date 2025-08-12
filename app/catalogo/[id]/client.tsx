"use client"

import type React from "react"
import { Check, Heart, Phone, Share2, Truck, Shield, Award, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Simplified interfaces to avoid Redux dependencies for demo
interface Imagen {
  id: string
  url: string
}

interface Caracteristica {
  id: string
  nombre: string
  valor: string
}

interface Categoria {
  categoria: {
    nombre: string
  }
}

interface Variante {
  id: string
  titulo: string
  precio: number
  valores: any[]
  imagen?: {
    url: string
  }
}

interface Publicacion {
  id: string
  titulo: string
  subtitulo?: string
  descripcion: string
  url?: string
  imagenes: Imagen[]
  categorias: Categoria[]
  caracteristicas: Caracteristica[]
  opciones: any[]
  variantes: Variante[]
}

interface Props {
  producto: Publicacion
}

// Simplified VariantSelector component
function VariantSelector({
  variantes,
  onVariantChange,
}: {
  variantes: Variante[]
  onVariantChange: (variant: Variante | null) => void
}) {
  const [selectedVariant, setSelectedVariant] = useState<Variante | null>(variantes[0] || null)

  useEffect(() => {
    onVariantChange(selectedVariant)
  }, [selectedVariant, onVariantChange])

  if (variantes.length <= 1) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg  font-semibold">Ediciones Disponibles</h3>
      <div className="grid gap-3">
        {variantes.map((variante) => (
          <button
            key={variante.id}
            onClick={() => setSelectedVariant(variante)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selectedVariant?.id === variante.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{variante.titulo}</span>
              <span className="text-lg font-bold text-primary">BOB {variante.precio}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetailPage({ producto }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(undefined)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: producto?.titulo,
          text: producto?.subtitulo,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleVariantChange = (variant: Variante | null) => {
    setSelectedVariant(variant)
    if (variant?.imagen?.url) {
      setCurrentImageUrl(variant.imagen.url)
    } else if (producto?.imagenes[0]?.url) {
      setCurrentImageUrl(producto.imagenes[0].url)
    } else {
      setCurrentImageUrl("/placeholder.svg")
    }
  }

  useEffect(() => {
    if (producto) {
      if (producto.variantes.length > 0) {
        const defaultVariant = producto.variantes[0]
        setSelectedVariant(defaultVariant)
        setCurrentImageUrl(defaultVariant.imagen?.url || producto.imagenes[0]?.url || "/placeholder.svg")
      } else if (producto.imagenes.length > 0) {
        setCurrentImageUrl(producto.imagenes[0].url)
      } else {
        setCurrentImageUrl("/placeholder.svg")
      }
    }
  }, [producto])

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  if (!producto) {
    return (
      <div className="min-h-screen bg-white book-pattern flex items-center justify-center">
        <div className="text-center fade-in">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-3xl  font-bold mb-4">Libro no encontrado</h1>
          <p className="text-gray-600 mb-6">El libro que buscas no está disponible en este momento</p>
          <Link href="/catalogo">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <BookOpen className="w-4 h-4 mr-2" />
              Explorar Catálogo
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const displayPrice = selectedVariant
    ? selectedVariant.precio
    : producto.variantes.length > 0
      ? Math.min(...producto.variantes.map((v) => v.precio))
      : null
  const categoriaPrincipal =
    producto.categorias?.length > 0 ? producto.categorias[0]?.categoria?.nombre || "Libros" : "Libros"

  return (
    <div className="min-h-screen pt-20 bg-white book-pattern">
      <div className="relative z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3 text-sm bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 w-fit">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Inicio
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/catalogo" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Catálogo
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-gray-900 font-medium">{producto.titulo}</span>
          </div>
        </div>

        <section className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6 fade-in">
              <div className="relative group">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-2xl book-card-hover border border-gray-100">
                  <Image
                    src={currentImageUrl || "/placeholder.svg?height=600&width=480&query=elegant book cover"}
                    alt={selectedVariant?.titulo || producto.titulo}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-white backdrop-blur-sm border-0 font-medium">
                      {categoriaPrincipal}
                    </Badge>
                  </div>
                </div>
              </div>

              {producto.imagenes.length > 1 && (
                <div className="flex space-x-3 justify-center">
                  {producto.imagenes.map((imagen, index) => (
                    <button
                      key={imagen.id}
                      onClick={() => setCurrentImageUrl(imagen.url)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all book-card-hover ${
                        currentImageUrl === imagen.url
                          ? "border-primary shadow-lg"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <Image
                        src={imagen.url || "/placeholder.svg?height=96&width=80&query=book thumbnail"}
                        alt={`${producto.titulo} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-8 fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl  font-bold text-gray-900 leading-tight">
                  {producto.titulo}
                </h1>
                {producto.subtitulo && (
                  <p className="text-xl text-gray-600 font-medium leading-relaxed">{producto.subtitulo}</p>
                )}
              </div>

              {producto.descripcion && producto.descripcion.trim() && (
                <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50">
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">{producto.descripcion}</p>
                  </CardContent>
                </Card>
              )}

              <VariantSelector variantes={producto.variantes} onVariantChange={handleVariantChange} />

              <div className="bg-gradient-to-r from-primary/5 to-primary/5 rounded-2xl p-6 border border-primary/10">
                {displayPrice !== null ? (
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-primary">BOB {displayPrice}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {!selectedVariant?.valores.length ? "Precio base" : "Variante seleccionada"}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">Consultar precio</span>
                )}
              </div>

              {producto.caracteristicas && producto.caracteristicas.length > 0 && (
                <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50">
                  <CardHeader>
                    <CardTitle className="text-xl ">Características Principales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {producto.caracteristicas
                      .filter((car) => car.nombre && car.nombre.trim() && car.valor && car.valor.trim())
                      .slice(0, 4)
                      .map((caracteristica) => (
                        <div key={caracteristica.id} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-gray-900">{caracteristica.nombre}:</span>
                            <span className="text-gray-600 ml-2">{caracteristica.valor}</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button asChild size="lg" className="flex-1 h-14 text-lg bg-primary hover:bg-primary/90 shadow-lg">
                    <Link
                      href={`https://wa.me/59169848691?text=${encodeURIComponent(
                        `Hola, estoy interesado en el libro "${producto.titulo}". ¿Podría brindarme más información?`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Solicitar Información
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleToggleFavorite}
                    className={`h-14 px-6 border-2 transition-all ${
                      isFavorite
                        ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                        : "hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    size="lg"
                    className="h-14 px-6 border-2 hover:border-primary hover:text-primary bg-transparent"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50">
                <div className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Compras</p>
                  <p className="text-xs text-gray-500">Seguras</p>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Envío</p>
                  <p className="text-xs text-gray-500">Gratis</p>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Calidad</p>
                  <p className="text-xs text-gray-500">Verificada</p>
                </div>
              </div>
            </div>
          </div>

          {((producto.descripcion && producto.descripcion.trim()) ||
            (producto.caracteristicas && producto.caracteristicas.length > 0)) && (
            <div className="mt-20 fade-in">
              <Tabs defaultValue="descripcion" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100/50 backdrop-blur-sm h-12">
                  {producto.descripcion && producto.descripcion.trim() && (
                    <TabsTrigger
                      value="descripcion"
                      className="font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Descripción Completa
                    </TabsTrigger>
                  )}
                  {producto.caracteristicas && producto.caracteristicas.length > 0 && (
                    <TabsTrigger
                      value="especificaciones"
                    >
                      Especificaciones
                    </TabsTrigger>
                  )}
                </TabsList>

                {producto.descripcion && producto.descripcion.trim() && (
                  <TabsContent value="descripcion" className="mt-8">
                    <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50 shadow-lg">
                      <CardContent className="p-8">
                        <div className="prose prose-slate max-w-none">
                          <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                            {producto.descripcion}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}

                {producto.caracteristicas && producto.caracteristicas.length > 0 && (
                  <TabsContent value="especificaciones" className="mt-8">
                    <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50 shadow-lg">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                          {producto.caracteristicas
                            .filter((car) => car.nombre && car.nombre.trim() && car.valor && car.valor.trim())
                            .map((caracteristica) => (
                              <div
                                key={caracteristica.id}
                                className="flex justify-between items-center py-4 border-b border-gray-200/30 last:border-b-0"
                              >
                                <span className="font-medium text-gray-900">{caracteristica.nombre}:</span>
                                <span className="text-gray-600 font-medium">{caracteristica.valor}</span>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          )}

          <div className="mt-16 fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl  font-bold text-center mb-12 text-gray-900">Servicios Adicionales</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50 text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Consultoría Literaria</h3>
                  <p className="text-sm text-gray-600">Asesoramiento personalizado para encontrar el libro perfecto</p>
                </Card>

                <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50 text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Lista de Deseos</h3>
                  <p className="text-sm text-gray-600">Guarda tus libros favoritos y recibe notificaciones</p>
                </Card>

                <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50 text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Entrega Express</h3>
                  <p className="text-sm text-gray-600">Recibe tu pedido en 24-48 horas en toda la ciudad</p>
                </Card>

                <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50 text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Soporte 24/7</h3>
                  <p className="text-sm text-gray-600">Atención personalizada vía WhatsApp todos los días</p>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 p-8">
                  <h3 className="text-2xl  font-bold mb-4">¿Necesitas ayuda para elegir?</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Nuestro equipo de expertos en literatura está disponible para ayudarte a encontrar exactamente lo
                    que buscas. Contáctanos sin compromiso.
                  </p>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link
                      href="https://wa.me/59169848691?text=Hola, necesito ayuda para elegir un libro"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Contactar Experto
                    </Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

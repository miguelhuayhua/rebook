"use client"

import { Check, Heart, Phone, Share2, Truck, Shield, Award } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { some } from "lodash"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VariantSelector from "./variant-selector" // Import the new VariantSelector
import type { Publicacion, Variante } from "@/types/main"
import { toggleFavProduct } from '@/store/reducers/user'
import { RootState } from '@/store'

interface Props {
    producto: Publicacion
}
export default function ProductDetailPage({ producto }: Props) {

    const params = useParams()
    const id = params.id as string
    const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)
    const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(undefined)
    const { favProducts } = useSelector((state: RootState) => state.user)
    const isFavorite = some(favProducts, (productId) => productId === producto.id)

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
            // Fallback: copiar URL al portapapeles
            navigator.clipboard.writeText(window.location.href)
        }
    }
    // Callback para el VariantSelector
    const handleVariantChange = (variant: Variante | null, selectedOptions: Record<string, string>) => {
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
            // Initialize selectedVariant and currentImageUrl based on the first variant or product image
            if (producto.variantes.length > 0) {
                const defaultVariant = producto.variantes[0];
                setSelectedVariant(defaultVariant);
                setCurrentImageUrl(defaultVariant.imagen?.url || producto.imagenes[0]?.url || "/placeholder.svg");
            } else if (producto.imagenes.length > 0) {
                setCurrentImageUrl(producto.imagenes[0].url);
            } else {
                setCurrentImageUrl("/placeholder.svg");
            }
        }
    }, [producto]);
    const dispatch = useDispatch();
    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(toggleFavProduct({ id: producto.id }))
    }

    if (!producto) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="fixed inset-0 z-0">
                    <div className="dashed-grid-pattern"></div>
                </div>
                <div className="text-center relative z-10">
                    <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                    <Link href="/catalogo">
                        <Button>Volver al Catálogo</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const displayPrice = selectedVariant ? selectedVariant.precio : (producto.variantes.length > 0 ? Math.min(...producto.variantes.map(v => v.precio)) : null)

    const categoriaPrincipal = producto.categorias[0]?.categoria?.nombre || "Sin categoría"

    return (
        <div className="min-h-screen  relative font-inter">


            <div className="relative z-20">
                {/* Header (removed as per instruction) */}
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="transition-colors">
                            Inicio
                        </Link>
                        <span>/</span>
                        <Link href="/catalogo" className="transition-colors">
                            Catálogo
                        </Link>
                        <span>/</span>
                        <span>{producto.titulo}</span>
                    </div>
                </div>

                {/* Product Details */}
                <section className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Images */}
                        <div className="space-y-4">
                            <div className="relative w-full h-96 rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg">
                                <Image
                                    src={currentImageUrl || "/placeholder.svg"}
                                    alt={selectedVariant?.titulo || producto.titulo}
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                                {/* Badges */}

                            </div>
                            {/* Thumbnail Images */}
                            <div className="flex space-x-2">
                                {producto.imagenes.map((imagen, index) => (
                                    <button
                                        key={imagen.id}
                                        onClick={() => setCurrentImageUrl(imagen.url)} // Directly set image URL
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentImageUrl === imagen.url ? "border-primary" : "hover:border-primary/50"
                                            }`}
                                    >
                                        <Image
                                            src={imagen.url || "/placeholder.svg"}
                                            alt={`${producto.titulo} ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <Badge variant="outline" className="mb-2">
                                    {categoriaPrincipal}
                                </Badge>
                                <h1 className="text-3xl font-bold mb-2">{producto.titulo}</h1>
                                {producto.subtitulo && <p className="text-lg text-slate-600 mb-4">{producto.subtitulo}</p>}
                                <p className="text-base leading-relaxed">{producto.descripcion}</p>
                            </div>

                            {/* Variant Selector */}
                            <VariantSelector
                                opciones={producto.opciones}
                                variantes={producto.variantes}
                                onVariantChange={handleVariantChange}
                            />

                            {/* Price */}
                            <div className="flex items-center space-x-4">
                                {displayPrice !== null ? (
                                    <div className='flex gap-5 items-center'>
                                        <span className="text-3xl font-bold">BOB {displayPrice} </span>
                                        <span className='text-sm'>{!selectedVariant?.valores.length ? "Por defecto" : "Para la variante"}</span>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-bold">Consultar precio</span>
                                )}
                            </div>

                            {/* Features */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">Características Principales</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {producto.caracteristicas.slice(0, 4).map((caracteristica) => (
                                        <div key={caracteristica.id} className="flex items-center">
                                            <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                                            <span>
                                                {caracteristica.nombre}: {caracteristica.valor}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4">
                                <div className="flex space-x-3">
                                    <Button asChild className="flex-1 text-lg py-6">
                                        <Link
                                            href={`https://wa.me/59169848691?text=${encodeURIComponent(
                                                `Hola, estoy interesado en el producto "${producto.titulo}" https://avm-bo.vercel.app/catalogo/${producto.url || producto.id}. ¿Podría brindarme más información?`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <Phone className="w-5 h-5 mr-2" />
                                            Solicitar Cotización
                                        </Link>

                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={handleToggleFavorite}
                                        className={`px-6 py-6 ${isFavorite ? "bg-red-50 border-red-300 text-red-600" : ""}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                                    </Button>
                                    <Button variant="outline" onClick={handleShare} size="lg" className="px-6 py-6 bg-transparent">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Guarantees */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                                <div className="text-center">
                                    <Shield className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-xs font-medium">Garantía Incluida</p>
                                </div>
                                <div className="text-center">
                                    <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                    <p className="text-xs font-medium">Instalación Incluida</p>
                                </div>
                                <div className="text-center">
                                    <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                                    <p className="text-xs font-medium">Calidad Confiable</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="mt-16">
                        <Tabs defaultValue="descripcion" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                                <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
                            </TabsList>

                            <TabsContent value="descripcion" className="mt-6">
                                <Card className="bg-white/90 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <div className="prose prose-slate max-w-none">
                                            <p className="leading-relaxed whitespace-pre-line">{producto.descripcion}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="especificaciones" className="mt-6">
                                <Card className="bg-white/90 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {producto.caracteristicas.map((caracteristica) => (
                                                <div
                                                    key={caracteristica.id}
                                                    className="flex justify-between items-center py-3 border-b last:border-b-0"
                                                >
                                                    <span className="font-medium">{caracteristica.nombre}:</span>
                                                    <span>{caracteristica.valor}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>


                        </Tabs>
                    </div>


                </section>
            </div>
        </div>
    )
}

"use client"

import { Check, Grid3X3, Heart, List, Search, SlidersHorizontal, Eye, Phone, LoaderCircle, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Categoria, Publicacion } from "@/types/main"
import { useRouter, useSearchParams } from "next/navigation"
import { Producto } from "../components/producto"




export default function CatalogoPage() {

    const params = useSearchParams();
    const [busqueda, setBusqueda] = useState("")
   
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(params.get('categoria') || 'todos')
    const router = useRouter();
    const [productosFiltrados, setProductosFiltrados] = useState<Publicacion[]>([])
    const [rangoPrecios, setRangoPrecios] = useState([0, 500])
    const [filtroCalificacion, setFiltroCalificacion] = useState(0)
    const [mostrarFiltros] = useState(false)
    const [productos, setProductos] = useState<Publicacion[]>([]);
 const [categorias, setCategorias] = useState<Categoria[]>([{ id: "", nombre: "todos" }])
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const coleccion = params.get('coleccion');
        fetch(`https://uayua.com/uayua/api/publicaciones/getall?fields=titulo,imagenes,caracteristicas,estado,variantes,coleccion,categorias:categoria${coleccion ? (`&where=coleccion.nombre.contains=${coleccion}`) : ''}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`
            }
        }).then(res => res.json()).then(data => {
            const cat = params.get('categoria') || 'todos'
            setCategoriaSeleccionada(cat)
            setProductos(data)
            if (cat == 'todos') {
                setProductosFiltrados(data);
            }
            else
                setProductosFiltrados(data.filter((producto: any) => producto.categorias.some((value: any) => value.categoria?.nombre.toLowerCase() == cat.toLowerCase())))
        })
    }, []);
    useEffect(() => {
        fetch('https://uayua.com/uayua/api/categorias/getall?fields=nombre,id', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`
            }
        }).then(res => res.json()).then(data => [...data, { id: "", nombre: "todos" }]).then(data => {
            setCategorias(data);
            setIsVisible(true);
        })
    }, [])
    useEffect(() => {
        const cat = params.get('categoria') || 'todos'
        setCategoriaSeleccionada(cat)
        if (cat == 'todos') {
            setProductosFiltrados(productos);
        }
        else
            setProductosFiltrados(productos.filter(producto => producto.categorias.some(value => value.categoria?.nombre.toLowerCase() == cat.toLowerCase())))
    }, [params])
    return (
        <div className="min-h-screen mt-20  text-slate-900 relative font-inter">


            <div className="relative z-20">


                {/* Breadcrumb */}
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="transition-colors">
                            Inicio
                        </Link>
                        <span>/</span>
                        <span className="">Catálogo</span>
                    </div>
                </div>

                {/* Page Header */}
                <section className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        {
                            params.get('coleccion') && (
                                <div className="flex items-center justify-center gap-5 mb-6">
                                    <Button variant="outline" size='icon' onClick={() => router.back()}>
                                        <ChevronLeft />
                                    </Button>
                                    <h3 className=" font-bold text-primary text-lg">Estás buscando en la colección de <span className="text-secondary capitalize">
                                        "{params.get('coleccion')}"</span></h3>
                                </div>
                            )
                        }

                        <h1 className="text-3xl md:text-4xl font-bold mb-3">Catálogo de Productos</h1>
                        <p className="text-base">
                            Mira nuestros libros y encuentra el que más te guste.
                        </p>
                    </div>
                    {/* Search and Filters Bar */}
                    <div className=" mb-8">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search */}
                            <div className="relative flex-1 w-full lg:w-auto">
                                <Input
                                    placeholder="Buscar productos..."
                                    value={busqueda}
                                    onChange={(e) => {
                                        setCategoriaSeleccionada('todos')
                                        setProductosFiltrados(productos.filter(producto => producto.titulo.toLowerCase().includes(e.target.value.toLowerCase())))
                                        setBusqueda(e.target.value)
                                    }}
                                    className="text-sm bg-white"
                                />
                            </div>

                            {/* Category Filter */}
                            <Tabs value={categoriaSeleccionada.toLowerCase()} onValueChange={(value) => {
                                router.push(`/catalogo?categoria=${value.toLowerCase()}`)

                            }}>
                                <TabsList className="">
                                    {isVisible ? categorias.map((categoria) => (
                                        <TabsTrigger
                                            key={categoria.nombre}
                                            value={categoria.nombre.toLowerCase()}
                                            className="capitalize p-2"
                                        >
                                            {categoria.nombre}
                                        </TabsTrigger>
                                    )) : <LoaderCircle className="size-4 animate-spin" />}
                                </TabsList>
                            </Tabs>


                        </div>

                        {/* Advanced Filters */}
                        {mostrarFiltros && (
                            <div className="mt-4 pt-4 border-t border-gray-700">
                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Price Range */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Rango de Precios</label>
                                        <div className="px-2">
                                            <Slider
                                                value={rangoPrecios}
                                                onValueChange={setRangoPrecios}
                                                max={500}
                                                min={0}
                                                step={10}
                                                className="mb-2"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400">
                                                <span>€{rangoPrecios[0]}</span>
                                                <span>€{rangoPrecios[1]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Filter */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Calificación Mínima</label>
                                        <Select
                                            value={filtroCalificacion.toString()}
                                            onValueChange={(value) => setFiltroCalificacion(Number(value))}
                                        >
                                            <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="0">Todas las calificaciones</SelectItem>
                                                <SelectItem value="4">4+ estrellas</SelectItem>
                                                <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                                                <SelectItem value="4.8">4.8+ estrellas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Features Filter */}
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Características</label>
                                        <div className="space-y-2">
                                            {["Control Remoto", "Resistente al Agua", "RGB", "App Control"].map((feature) => (
                                                <div key={feature} className="flex items-center space-x-2">
                                                    <Checkbox id={feature} className="border-gray-600" />
                                                    <label htmlFor={feature} className="text-xs text-gray-400">
                                                        {feature}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-muted-foreground">
                            Mostrando {productosFiltrados.length} de {productos.length} productos
                        </p>
                    </div>
                    {
                        isVisible ?
                            productosFiltrados.length > 0 ?
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                                    {productosFiltrados.map((producto, i) => (
                                        <Producto key={producto.id} publicacion={producto} />
                                    ))}
                                </div>

                                :
                                <div className="flex flex-col justify-center max-w-xs mx-auto gap-5">
                                    <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-center text-muted-foreground my-2 text-lg ">
                                        Sin resultados
                                    </p>
                                    <Button onClick={() => router.back()} variant="outline" >
                                        <ChevronLeft />
                                        Regresar
                                    </Button>
                                </div> :
                            <div className="flex justify-center">
                                <LoaderCircle className="size-8 animate-spin" />
                            </div>
                    }


                </section>
            </div>
        </div>
    )
}

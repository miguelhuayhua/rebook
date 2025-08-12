"use client"

import { useEffect, useState } from "react"
import { Coleccion, Publicacion } from "@/types/main"
import { Button } from "@/components/ui/button"
import { Loader, Plus } from "lucide-react"
import Link from "next/link"
import { Producto } from "./producto"

export default function ProductListSection() {
    const [isVisible, setIsVisible] = useState(false)
    const [colecciones, setColecciones] = useState<Coleccion[]>([]);
    {/* Hero Section */ }

    useEffect(() => {
        fetch('https://uayua.com/uayua/api/colecciones/getall?fields=nombre,id,publicaciones:imagenes,publicaciones:variantes,publicaciones:caracteristicas,publicaciones:categorias:categoria,publicaciones:titulo,publicaciones:url,publicaciones:id,publicaciones:take=10', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`
            }
        }).then(res => res.json()).then(data => {
            setIsVisible(true);
            setColecciones(data)
        })
    }, [])
    return (
        <section id="productos" className="py-16  backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up text-primary">Nuestros Libros</h2>
                    <p className="text-base animate-fade-in-up animation-delay-200 font-medium">
                        Descubre nuestra colección de libros que te inspirarán y educarán.
                    </p>
                </div>

                {
                    isVisible ?
                        colecciones.map(coleccion => (
                            <div key={coleccion.id}>
                                <div className="flex items-center justify-between w-full">
                                    <h2 className="text-lg my-9 md:text-xl capitalize font-bold text-primary">
                                        {coleccion.nombre}

                                    </h2>
                                    <Button variant="outline" asChild>
                                        <Link href={`/catalogo?coleccion=${coleccion.nombre.toLowerCase()}&categoria=todos`}>
                                            Ver más <Plus />
                                        </Link>
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {coleccion.publicaciones.map((publicacion, i) => (
                                        <Producto key={i} publicacion={publicacion!} />
                                    ))}
                                </div>
                            </div>
                        ))
                        :
                        <div className="flex items-center justify-center h-64">
                            <Loader className="animate-spin h-8 w-8 text-primary" />
                        </div>
                }

                {/* Products Grid */}

            </div>
        </section>
    )
}
"use client"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { Categoria } from "@/types/main"
export default function Footer() {
  const enlaces = ["nosotros", "contacto", "servicios"]
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  useEffect(() => {
    fetch('https://uayua.com/uayua/api/categorias/getall?fields=nombre,id,ruta', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`
      }
    }).then(res => res.json()).then(setCategorias)
  }, [])
  const [colecciones, setColecciones] = useState<Categoria[]>([]);
  useEffect(() => {
    fetch('https://uayua.com/uayua/api/colecciones/getall?fields=nombre,id,ruta', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`
      }
    }).then(res => res.json()).then(setColecciones)
  }, [])
  return (
    <footer className="bg-slate-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="AVM Logo"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-lg font-bold">AVM</span>
            </div>
            <p className="text-slate-300 mb-3 text-sm font-medium leading-relaxed">
              Especialistas en aluminio, ventanas, muebles de melamina y venta de vidrios en Bolivia.
            </p>

          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Negocio</h4>
            <ul className="space-y-2 text-slate-300">
              {enlaces.map((enlace, j) => (
                <li key={j}>

                  <Link href={`/#${enlace}`} className="transition-colors capitalize duration-300 text-sm font-medium">
                    {enlace}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Categorías</h4>
            <ul className="space-y-2 text-slate-300">
              {categorias.map((categoria, j) => (
                <li key={j}>

                  <Link href={`/catalogo?categoria=${categoria.ruta || categoria.id}`} className="transition-colors capitalize duration-300 text-sm font-medium">
                    {categoria.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Colecciones</h4>
            <ul className="space-y-2 text-slate-300">
              {colecciones.map((coleccion, j) => (
                <li key={j}>

                  <Link href={`/catalogo?coleccion=${coleccion.ruta || coleccion.id}`} className="transition-colors capitalize duration-300 text-sm font-medium">
                    {coleccion.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <Separator className="my-6 bg-gray-800" />
        <div className="text-center text-gray-400 animate-fade-in-up animation-delay-800 flex justify-center gap-1">
          <div className="flex items-center gap-2 font-bold text-sm ">
            AVM
          </div>
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()}  Todos los derechos reservados.
          </p>
        </div>

        <small className="flex gap-1 text-gray-500 justify-center mt-8 items-center ">
          <span>Powered by </span> <Image alt="logo"
            width={50} height={20} src='/dark.png' className="mt-1" />
        </small>
      </div>
    </footer >
  )
}
"use client"

import { ChevronRight, Menu, Mountain, Heart } from "lucide-react"
import Link from "next/link"
import { motion, Variant, Variants } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Categoria } from "@/types/main"
import Image from "next/image"

export function Navbar() {
  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.1 } },
  }

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 10, delay: 0.3 } },
  }

  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const pathname = usePathname()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const isHomePage = pathname === "/"
  useEffect(() => {
    fetch('https://uayua.com/uayua/api/categorias/getall?fields=nombre,id', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`
      }
    }).then(res => res.json()).then(data => [...data, { id: "", nombre: "todos" }]).then(data => {
      setCategorias(data);
    })
  }, [])
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 flex items-center  justify-between text-white w-screen p-4 px-8  z-50  transition-none duration-300 ${isScrolled || !isHomePage
        ? "bg-background backdrop-blur-md shadow"
        : "bg-transparent"
        }`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={
              ` ${(isScrolled || !isHomePage) && ('text-primary')}
                  `
            }
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pt-6">
          <SheetTitle className="sr-only">
            Sheet
          </SheetTitle>
          {" "}
          {/* Eliminar padding por defecto del SheetContent */}

          <div className="grid gap-1 py-4 px-4">
            {" "}
            {/* Ajuste de espaciado general del menú */}
            <Link
              href="/catalogo"
              className={
                `flex w-full items-center py-2 px-2 rounded-md hover:bg-muted text-lg font-semibold ${isScrolled && ('text-primary')}`
              }
            >
              Catálogo
            </Link>
            <Collapsible className="grid gap-2">
              {" "}
              {/* Ajuste de espaciado del collapsible */}
              <CollapsibleTrigger className="flex w-full items-center py-2 px-2  rounded-md hover:bg-muted text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                Categorías <ChevronRight className="ml-auto h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-1 pl-4 pr-2 py-2 bg-muted rounded-md">
                  {" "}
                  {/* Ajuste de espaciado y fondo */}

                  {
                    categorias.map((categoria) => (
                      <Link
                        key={categoria.id}
                        href={`/catalogo?categoria=${categoria.nombre}`}
                        className="group grid h-auto w-full justify-start gap-1 py-2 px-2 rounded-md hover:bg-background"
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          {categoria.nombre.charAt(0).toUpperCase() + categoria.nombre.slice(1)}
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Explora nuestra colección de {categoria.nombre}.
                        </div>
                      </Link>
                    ))
                  }
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Link
              href="/#nosotros"
              className="flex w-full items-center py-2 px-2 rounded-md hover:bg-muted text-lg font-semibold"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/#contacto"
              className="flex w-full items-center py-2 px-2 rounded-md hover:bg-muted text-lg font-semibold"
            >
              Contacto
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className=" h-full  ">
        {
          (isScrolled || !isHomePage) ?
            <Image alt={`LOGO`} className="h-8.5" src={"/logo.png"} width={50} height={70} /> :
            <Image alt={`/logo.png`} className="h-9.5" src={`/logo2.png`} width={50} height={70} />
        }

      </Link>
      {/* Centered Navigation Menu for Desktop */}
      <div className="flex-grow hidden sm:flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                href="/catalogo"
                className={
                  ` ${(isScrolled || !isHomePage) && ('text-primary')}
                  `
                }
              >
                Catálogo
              </Link>
            </NavigationMenuLink>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={
                ` ${(isScrolled || !isHomePage) && ('text-primary')}
                  `
              } >
                Categorías
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] p-2">
                  {
                    categorias.map((categoria) => (
                      <NavigationMenuLink key={categoria.id} asChild>
                        <Link
                          href={`/catalogo?categoria=${categoria.nombre}`}
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline">
                            {categoria.nombre.charAt(0).toUpperCase() + categoria.nombre.slice(1)}
                          </div>

                        </Link>
                      </NavigationMenuLink>
                    ))
                  }

                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuLink asChild>
              <Link
                href="/#contacto"
                className={
                  ` ${(isScrolled || !isHomePage) && ('text-primary')}
                  `
                }
              >
                Contacto
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <motion.div className=" flex gap-2" variants={buttonVariants}>
        <Button
          variant="ghost"
          size="icon"
          asChild
          aria-label="Favoritos"
          className={
            ` ${(isScrolled || !isHomePage) && ('text-primary')}
                  `
          }
        >
          <Link href="/favoritos">
            <Heart className="size-4" /></Link>
        </Button>
      </motion.div>
    </motion.header>
  )
}

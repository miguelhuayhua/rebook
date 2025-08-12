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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

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

  const isHomePage = pathname === "/"

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 flex items-center p-4 justify-between text-white w-screen  z-50 px-8 transition-all duration-300 ${isScrolled || !isHomePage
        ? "bg-primary/90 backdrop-blur-md shadow"
        : "bg-transparent"
        }`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden bg-transparent"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {" "}
          {/* Eliminar padding por defecto del SheetContent */}
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            {" "}
            {/* Header del Sheet */}
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Mountain className="h-6 w-6 text-white" />
              <span>BookStore</span>
            </Link>
          </div>
          <div className="grid gap-1 py-4 px-4">
            {" "}
            {/* Ajuste de espaciado general del menú */}
            <Link
              href="/catalogo"
              className="flex w-full items-center py-2 px-2 rounded-md hover:bg-muted text-lg font-semibold"
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
                  <Link
                    href="#"
                    className="group grid h-auto w-full justify-start gap-1 py-2 px-2 rounded-md hover:bg-background"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">Ficción</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Novelas, cuentos y más.
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="group grid h-auto w-full justify-start gap-1 py-2 px-2 rounded-md hover:bg-background"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">No Ficción</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Biografías, historia, ciencia.
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="group grid h-auto w-full justify-start gap-1 py-2 px-2 rounded-md hover:bg-background"
                  >
                    <div className="text-sm font-medium leading-none group-hover:underline">Infantil</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Libros para los más pequeños.
                    </div>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Link
              href="/about"
              className="flex w-full items-center py-2 px-2 rounded-md hover:bg-muted text-lg font-semibold"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contact"
              className="flex w-full items-center py-2 px-2 rounded-md hover:bg-muted text-lg font-semibold"
            >
              Contacto
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className=" hidden sm:flex text-primary-foreground">
        <Mountain className="h-6 w-6" />
        <span className="sr-only">BookStore</span>
      </Link>
      {/* Centered Navigation Menu for Desktop */}
      <div className="flex-grow hidden sm:flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                href="/catalogo"

              >
                Catálogo
              </Link>
            </NavigationMenuLink>
            <NavigationMenuItem>
              <NavigationMenuTrigger >
                Categorías
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] p-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"

                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">Ficción</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Novelas, cuentos y más.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"

                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">No Ficción</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Biografías, historia, ciencia.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="#"

                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">Infantil</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Libros para los más pequeños.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuLink asChild>
              <Link
                href="/contact"

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
        >
          <Link href="/favoritos">
            <Heart className="size-4" /></Link>
        </Button>
      </motion.div>
    </motion.header>
  )
}

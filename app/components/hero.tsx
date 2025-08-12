import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-center bg-black to-secondary text-white overflow-hidden">
      <Image
        src="/fondo.jpg"
        alt="Bookshelf background"
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="relative z-10 px-4 md:px-6 max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Descubre tu próxima gran lectura
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Explora nuestra colección de libros, desde clásicos atemporales hasta los últimos bestsellers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/catalogo">Explorar Catálogo</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
          >
            <Link href="/about">Conoce Más</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Publicacion } from "@/types/main"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { some } from "lodash"
import { toggleFavProduct } from "@/store/reducers/user"

interface ProductoProps {
  publicacion: Publicacion
}

export function Producto({ publicacion }: ProductoProps) {
  const { favProducts } = useSelector((state: RootState) => state.user)
  const isFavorite = some(favProducts, (productId) => productId === publicacion.id)
  const dispatch = useDispatch();
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavProduct({ id: publicacion.id }))
  }

  const defaultPrice =
    publicacion.variantes.length > 0 ? `Bs. ${publicacion.variantes[0].precio.toFixed(2)}` : "Precio no disponible"

  const author = publicacion.caracteristicas.find((char) => char.nombre === "Autor")?.valor
  const genre = publicacion.caracteristicas.find((char) => char.nombre === "Género")?.valor
  const categorias = publicacion.categorias; // Obtener el nombre de la primera categoría
  return (
    <Card className="w-full relative max-w-xs mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/catalogo/${publicacion.id}`} className="block">
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={publicacion.imagenes[0]?.url || "/placeholder.svg?height=600&width=400&query=book-cover-default"}
            alt={publicacion.titulo}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardHeader className="px-3" >
        {categorias.length > 0 && (
          <div className="text-sm flex items-center  font-bold text-primary gap-2 mb-2">
            {
              publicacion.categorias.map((value, index) => <Badge key={index} variant="outline" >
                {value.categoria?.nombre}
              </Badge>)}

          </div>
        )}
        <CardTitle className="text-lg font-semibold line-clamp-2">
          <Link href={`/catalogo/${publicacion.id}`} className="hover:underline">
            {publicacion.titulo}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm line-clamp-1">{publicacion.subtitulo}</CardDescription>
        {author && (
          <CardDescription className=" text-muted-foreground line-clamp-1">Por: {author}</CardDescription>
        )}
        {genre && (
          <CardDescription className=" text-muted-foreground line-clamp-1">Género: {genre}</CardDescription>
        )}

      </CardHeader>
      <CardContent className="px-3">
        <div className="text-xl font-bold text-primary">{defaultPrice}</div>
      </CardContent>
      <CardFooter className="py-4 px-3 pt-0 flex gap-2">
        <Button className="flex-1" asChild>
          <Link href={`/catalogo/${publicacion.id}`}>Ver Detalles</Link>
        </Button>
        <Button onClick={handleToggleFavorite}
          size="icon"
          className={`absolute top-2 right-2 z-10 ${isFavorite && ('text-secondary ')}`} variant="outline" >
          <Heart className={`${isFavorite && ('fill-secondary')}`} />
          <span className="sr-only">Añadir a la lista de deseos</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

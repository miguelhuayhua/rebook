import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Client from './client'

const getProducto = async (id: string) => {
  return await fetch(`https://uayua.com/uayua/api/publicaciones/get?url=${id}&fields=id,titulo,imagenes,subtitulo,coleccion,caracteristicas,estado,variantes:valores,opciones:valores,opciones:id,opciones:nombre,variantes:id,variantes:titulo,variantes:estado,variantes:precio,descripcion,variantes:imagen,categorias:categoria`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`,
      'Origin': 'https://casa-libros.vercel.app'
    }
  }).then(res => res.json())
}

// Generar metadatos dinámicos
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params

  const response = await getProducto(id)
  const producto = response;
  if (producto) {
    const titulo = producto.titulo
    const descripcion = producto.descripcion || producto.subtitulo || `Descubre ${titulo} en nuestra tienda online.`
    const imagenPrincipal = producto.imagenes.length > 0 ? producto.imagenes?.[0].url : '/placeholder.svg'
    const precio = producto.variantes?.[0]?.precio || null
    return {
      title: `${titulo}`,
      description: descripcion,
      keywords: [
        titulo,
       
      ].join(', '),

      // Open Graph
      openGraph: {
        title: titulo,
        description: descripcion,
        type: 'article',
        url: `https://casa-libros.vercel.app/catalogo/${id}`,
        images:
        {
          url: imagenPrincipal,
          width: 800,
          height: 600,
          alt: titulo,
          protocol: "https",
          href: imagenPrincipal
        }
        ,
        siteName: 'REBOOK',
        locale: 'es_ES',
      },

      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title: titulo,
        description: descripcion,
        images: imagenPrincipal ? [imagenPrincipal] : [],
        creator: '@REBOOK',
        site: '@REBOOK',
      },

      // Metadatos para productos/ecommerce
      other: {
        'product:price:amount': precio?.toString() || '',
        'product:price:currency': 'USD', // Ajusta según tu moneda
        'product:availability': producto.estado ? 'in stock' : 'out of stock',
        'product:brand': 'REBOOK', // Ajusta según corresponda
        'product:category': producto.categorias.at(0)?.categoria?.nombre || '',
      },

      // Canonical URL
      alternates: {
        canonical: `https://casa-libros.vercel.app/producto/${id}`,
      },

      // Robots
      robots: {
        index: producto.estado,
        follow: true,
        googleBot: {
          index: producto.estado,
          follow: true,
        },
      },

      // Metadatos adicionales
      category: 'product',
      classification: 'ecommerce',
    }
  }
  else
    return notFound()
}





export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const producto = await getProducto(id);
  if (producto)
    return <Client producto={producto as any} />
  else return notFound();
}
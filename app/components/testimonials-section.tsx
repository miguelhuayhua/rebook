"use client"
import "keen-slider/keen-slider.min.css"

import {
    FacebookIcon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useKeenSlider } from "keen-slider/react"
const testimonios = [
    {
        nombre: "Lucía Mamani",
        negocio: "Residencial en Villa Fátima",
        texto: "Instalaron unas ventanas corredizas de aluminio con vidrio templado en mi sala, ahora entra más luz y se siente mucho más amplio. El trabajo fue rápido y muy prolijo.",
        producto: "ventanas",
        avatar: "LM",
    },
    {
        nombre: "Kevin Quispe",
        negocio: "Taller de carpintería – El Alto",
        texto: "Encargué planchas de melamina para hacer muebles a medida. La calidad es excelente, cortadas al milímetro, y los bordes bien sellados. Muy recomendados.",
        producto: "melamina",
        avatar: "KQ",
    },
    {
        nombre: "Noemí Condori",
        negocio: "Salón de Belleza Ñusta – Sopocachi",
        texto: "Mandé a hacer un espejo grande con marco de vidrio biselado para mi salón. Se ve muy elegante y ha cambiado completamente la estética del local.",
        producto: "vidrio biselado",
        avatar: "NC",
    },
    {
        nombre: "Daniela Salazar",
        negocio: "Manicuría Dani Nails – Miraflores",
        texto: "Me fabricaron un mostrador de melamina blanca con acabado brillante, quedó hermoso y súper funcional. Mis clientas siempre lo elogian.",
        producto: "melamina",
        avatar: "DS",
    },
    {
        nombre: "Jorge Gutiérrez",
        negocio: "Oficina Estudio Creativo – San Miguel",
        texto: "Pedí una mampara de vidrio esmerilado para separar ambientes en la oficina. El resultado fue impecable, se siente privacidad pero sin perder luz natural.",
        producto: "vidrio esmerilado",
        avatar: "JG",
    },
    {
        nombre: "Camila Ríos",
        negocio: "Departamento en Alto Obrajes",
        texto: "Encargué una puerta corrediza de vidrio templado para mi cocina. Se ve moderna y la instalación fue rápida y limpia.",
        producto: "puerta de vidrio",
        avatar: "CR",
    },
    {
        nombre: "Rodrigo Vargas",
        negocio: "AutoTuning RV – La Ceja",
        texto: "Les compré láminas de vidrio polarizado para autos. Muy buena calidad y el acabado profesional. Se nota la diferencia en el calor y la vista.",
        producto: "vidrio polarizado",
        avatar: "RV",
    },
    {
        nombre: "Tatiana López",
        negocio: "Casa de Eventos TL – Calacoto",
        texto: "Mandamos a hacer mesas de vidrio templado para eventos. Son resistentes y dan un toque elegante en las fotos.",
        producto: "mesas de vidrio",
        avatar: "TL",
    },
    {
        nombre: "Álvaro Pinto",
        negocio: "Sala Gamer – La Paz Centro",
        texto: "Instalaron repisas flotantes de melamina en mi sala gamer. Quedaron firmes, bonitas y organizan perfecto mis equipos.",
        producto: "melamina",
        avatar: "AP",
    },
    {
        nombre: "Fernanda Morales",
        negocio: "Departamento FM – Sopocachi",
        texto: "Pedí un espejo de cuerpo entero con borde de aluminio. Excelente calidad, lo uso para mis videos de TikTok y queda genial en mi cuarto.",
        producto: "espejos",
        avatar: "FM",
    },
];


export default function TestimonialSection() {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: {
                    perView: 2,
                    spacing: 40,
                },
            },
            "(min-width: 1024px)": {
                slides: {
                    perView: 3,
                    spacing: 28
                },
            },
        },
    })


    return (
        < section className="py-16 bg-white/80 backdrop-blur-sm" >
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up text-primary">Opiniones de Clientes</h2>
                    <div className="flex justify-center mb-6 items-center">
                        <FacebookIcon className="text-secondary size-4" /> <small>Recolectado de facebook</small>
                    </div>
                    <p className="text-base animate-fade-in-up animation-delay-200 font-medium">
                        Descubre lo que dicen nuestros clientes sobre nuestro trabajo
                    </p>
                </div>
                <div ref={sliderRef} className="keen-slider">

                    {testimonios.map((testimonio, i) => (
                        <div
                            key={i}
                            className="keen-slider__slide "
                        >
                            <Card
                                key={i}
                                className={`bg-white/90 backdrop-blur-sm transition-all duration-500 hover:scale-105 group animate-slide-in-up hover:shadow-lg`}
                                style={{ animationDelay: `${i * 0.2}s` }}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center mb-3">
                                        <Avatar className="mr-2 w-8 h-8">
                                            <AvatarFallback className="text-xs font-semibold">{testimonio.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-semibold">{testimonio.nombre}</p>
                                            <p className="text-xs font-medium">{testimonio.negocio}</p>
                                        </div>
                                    </div>

                                    <p className="mb-3 transition-colors duration-300 text-sm font-medium leading-relaxed">
                                        "{testimonio.texto}"
                                    </p>

                                    <Badge variant="outline" className="text-xs font-medium">
                                        Trabajo Realizado: {testimonio.producto}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}
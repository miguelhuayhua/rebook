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
        nombre: "María Fernanda Quispe",
        negocio: "Lectora apasionada – La Paz",
        texto: "Compré 'No me puedes lastimar' de David Goggins y realmente me motivó a superar mis límites. El envío fue rápido y el libro llegó en perfecto estado.",
        producto: "No me puedes lastimar – David Goggins",
        avatar: "MFQ",
    },
    {
        nombre: "Luis Alberto Mamani",
        negocio: "Corredor amateur – El Alto",
        texto: "'Nunca terminar' me dio un empujón mental para seguir entrenando. Excelente servicio y muy buena atención.",
        producto: "Nunca terminar – David Goggins",
        avatar: "LAM",
    },
    {
        nombre: "Paola Ríos",
        negocio: "Docente – Cochabamba",
        texto: "‘El poder de las palabras’ me ayudó muchísimo en mis clases. Es un libro que inspira y enseña al mismo tiempo.",
        producto: "El poder de las palabras",
        avatar: "PR",
    },
    {
        nombre: "Javier Choque",
        negocio: "Emprendedor – Santa Cruz",
        texto: "‘Las 74 leyes del poder’ es oro puro para los negocios. Me llegó rápido y bien empacado.",
        producto: "Las 74 leyes del poder",
        avatar: "JC",
    },
    {
        nombre: "Andrea Flores",
        negocio: "Estudiante de Filosofía – Sucre",
        texto: "‘Cómo ser un estoico’ me cambió la forma de ver los problemas. Muy recomendado para quien busca paz mental.",
        producto: "Cómo ser un estoico",
        avatar: "AF",
    },
    {
        nombre: "Carlos Villca",
        negocio: "Psicólogo – Tarija",
        texto: "El libro de ‘Psicología oscura’ es muy interesante y bien explicado. Ideal para entender mejor el comportamiento humano.",
        producto: "Psicología oscura",
        avatar: "CV",
    },
    {
        nombre: "Roxana Pinto",
        negocio: "Negocio familiar – La Paz",
        texto: "‘Padre rico padre pobre’ me dio claridad para manejar mejor mi dinero. Excelente calidad de impresión.",
        producto: "Padre rico padre pobre",
        avatar: "RP",
    },
    {
        nombre: "Fernando López",
        negocio: "Freelancer – Oruro",
        texto: "‘Cómo dejar de pensar demasiado’ me ayudó a enfocarme en mis proyectos. Muy buen libro y envío rápido.",
        producto: "Cómo dejar de pensar demasiado",
        avatar: "FL",
    },
    {
        nombre: "Natalia Vargas",
        negocio: "Diseñadora gráfica – La Paz",
        texto: "‘Hábitos atómicos’ me dio estrategias simples pero efectivas para mejorar mi productividad.",
        producto: "Hábitos atómicos",
        avatar: "NV",
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

                                    <Badge className="text-xs font-medium">
                                        Libro: {testimonio.producto}
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
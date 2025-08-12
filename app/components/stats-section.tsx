import { Progress } from "@/components/ui/progress";
const stats = [
    { numero: "750+", etiqueta: "Clientes Satisfechos", progress: 90 },
    { numero: "1.200+", etiqueta: "Proyectos Realizados", progress: 92 },
    { numero: "25+", etiqueta: "Años de Experiencia", progress: 100 },
    { numero: "96%", etiqueta: "Clientes que nos Recomiendan", progress: 96 },
    
];

export default function StatSection() {
    return (
        <section className="py-16 bg-slate-50/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                    {stats.map((estadistica, i) => (
                        <div key={i} className={`animate-fade-in-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className={`text-2xl md:text-3xl font-bold mb-2`}>{estadistica.numero}</div>
                            <div className="text-sm font-medium">{estadistica.etiqueta}</div>
                            <Progress value={estadistica.progress} className="mt-2 h-1" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
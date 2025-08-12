"use client"

import { BookOpen, Globe, Star } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  return (
    <motion.section
      className="py-12 md:py-20 bg-gray-100 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
      }}
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12"
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
          }}
        >
          ¿Por qué elegirnos?
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15, // Ajustado para un escalonamiento más rápido
              },
            },
          }}
        >
          <motion.div
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
            }}
          >
            <BookOpen className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Amplia Selección</h3>
            <p className="text-muted-foreground">Miles de títulos de todos los géneros y autores.</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
            }}
          >
            <Globe className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
            <p className="text-muted-foreground">Entregas rápidas y seguras a tu puerta.</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
            }}
          >
            <Star className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
            <p className="text-muted-foreground">Libros de alta calidad y excelente servicio al cliente.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

"use client"

import { motion } from "framer-motion"

export function AboutSection() {
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
          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
          }}
        >
          Sobre Nosotros
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground max-w-3xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
          }}
        >
          Somos una librería online dedicada a ofrecer una amplia selección de libros para todos los gustos en Bolivia.
          **No contamos con una tienda física**, pero realizamos **entregas personales** para tu comodidad. Nuestra
          misión es fomentar la lectura y el amor por los libros, acercándolos a ti de la manera más conveniente.
        </motion.p>
      </div>
    </motion.section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

export function ContactSection() {
  return (
    <motion.section
      className="py-12 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8 md:mb-12"
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "backIn" } },
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Contáctanos</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            ¿Tienes alguna pregunta o comentario? ¡Nos encantaría escucharte!
          </p>
        </motion.div>
        <motion.div
          className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl"
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: "backIn" } },
          }}
        >
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@ejemplo.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} />
            </div>
            <Button type="submit" className="w-full">
              Enviar Mensaje
            </Button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  )
}

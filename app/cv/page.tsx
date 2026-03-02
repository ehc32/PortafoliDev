'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const CV_URL = '/CertificadoAfiliación.pdf'
const CV_NAME = 'Hector-Fabian-CV.pdf'

export default function CVViewer() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.12),transparent_55%)]" />

      {/* Barra superior minimalista */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/60 backdrop-blur-sm flex-shrink-0">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-2 text-muted-foreground hover:text-card-foreground hover:-translate-x-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans text-sm">Volver</span>
          </Button>
        </Link>

        <span className="text-sm font-semibold text-card-foreground font-sans tracking-tight">
          Hector Fabian — CV
        </span>

        <Button asChild size="sm" className="rounded-full gap-2">
          <a href={CV_URL} download={CV_NAME}>
            <Download className="w-3.5 h-3.5" />
            <span className="font-sans">Descargar</span>
          </a>
        </Button>
      </div>

      {/* Área del PDF — ocupa todo el resto */}
      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground font-sans">Cargando...</p>
            </div>
          </div>
        )}

        <iframe
          src={`${CV_URL}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          title="CV Hector Fabian"
        />
      </div>
    </div>
  )
}
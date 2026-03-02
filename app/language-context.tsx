'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider')
  }
  return context
}

export const translations = {
  es: {
    experience: 'Experiencia',
    available: 'Disponible',
    notAvailable: 'No disponible',
    openToOpportunities: 'Abierto a nuevas oportunidades',
    projects: 'Proyectos',
    exp: 'Experiencia',
    connect: 'Conecta',
    visualizeCV: 'Visualizar CV',
    viewCV: 'CV actualizado • Full Stack Developer • 1 página',
    allProjects: 'Todos los proyectos',
    copyright: '© 2026 Hector Fabian Cardoso Morales',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
    see: 'Ver',
    download: 'Descargar',
    downloadPDF: 'Descargar PDF',
    languages: 'Lenguajes',
    frontend: 'Frontend',
    backend: 'Backend',
    databases: 'Bases de datos',
    tools: 'Herramientas',
  },
  en: {
    experience: 'Experience',
    available: 'Available',
    notAvailable: 'Not available',
    openToOpportunities: 'Open to new opportunities',
    projects: 'Projects',
    exp: 'Experience',
    connect: 'Connect',
    visualizeCV: 'View CV',
    viewCV: 'Updated CV • Full Stack Developer • 1 page',
    allProjects: 'All projects',
    copyright: '© 2026 Hector Fabian Cardoso Morales',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
    see: 'View',
    download: 'Download',
    downloadPDF: 'Download PDF',
    languages: 'Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    databases: 'Databases',
    tools: 'Tools',
  },
}

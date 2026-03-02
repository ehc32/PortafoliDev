'use client'

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Download,
  FileText,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
} from "lucide-react"
import { useLanguage, translations } from "@/app/language-context"
import { useTheme } from "next-themes"
import { useState, useRef, useEffect } from "react"

// ─────────────────────────────────────────────────────────────
// Dropdown genérico reutilizable con animación deslizable
// ─────────────────────────────────────────────────────────────
type DropdownOption = {
  value: string
  label: string
  Icon: React.ElementType
}

function SelectDropdown({
  options,
  value,
  onChange,
}: {
  options: DropdownOption[]
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const current = options.find((o) => o.value === value) ?? options[0]
  const CurrentIcon = current.Icon

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center gap-1.5 px-3 py-1.5
          rounded-full border border-border bg-card
          text-sm font-sans text-card-foreground
          hover:bg-secondary/70 transition-colors duration-150
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        "
      >
        <CurrentIcon className="w-3.5 h-3.5" />
        <span>{current.label}</span>
        <ChevronDown
          className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Panel deslizable */}
      <div
        className={`
          absolute right-0 mt-2 w-36 z-50
          bg-card border border-border rounded-2xl shadow-xl
          overflow-hidden
          transition-all duration-200 origin-top-right
          ${open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }
        `}
      >
        {options.map(({ value: val, label, Icon }) => (
          <button
            key={val}
            onClick={() => {
              onChange(val)
              setOpen(false)
            }}
            className={`
              w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-sans
              hover:bg-secondary/60 transition-colors duration-100
              ${value === val ? "text-primary font-semibold" : "text-card-foreground"}
            `}
          >
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{label}</span>
            {value === val && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}


function AboutText({
  text,
  expandLabel,
  collapseLabel,
}: {
  text: string
  expandLabel: string
  collapseLabel: string
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative">
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? "max-h-96" : "max-h-[4.5rem]"
          }`}
      >
        <p className="text-card-foreground leading-relaxed font-sans text-sm">
          {text}
        </p>
      </div>

      {/* Fade gradient cuando está colapsado */}
      {!expanded && (
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      )}

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-70 transition-opacity font-sans"
      >
        <span>{expanded ? collapseLabel : expandLabel}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>

  )
}
// ─────────────────────────────────────────────────────────────
// Opciones de tema e idioma
// ─────────────────────────────────────────────────────────────
const THEME_OPTIONS: DropdownOption[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
]

// Banderas como componentes simples (no requieren librerías externas)
const FlagES = () => <span className="text-[13px] leading-none">🇪🇸</span>
const FlagEN = () => <span className="text-[13px] leading-none">🇺🇸</span>

const LANG_OPTIONS: DropdownOption[] = [
  { value: "es", label: "Español", Icon: FlagES },
  { value: "en", label: "English", Icon: FlagEN },
]

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const CV_URL = "/CertificadoAfiliación.pdf"
const CV_NAME = "Hector-Fabian-CV.pdf"

const PROFILE_ES = {
  initials: "FM",
  name: "Hector Fabian Cardoso Morales",
  location: "Colombia",
  about: `Soy Hector Fabian Cardoso Morales, desarrollador de software en Colombia con 3 años de experiencia creando
  aplicaciones web escalables y soluciones a medida. Me especializo en desarrollo frontend y full-stack,
  construyendo experiencias fluidas, optimizando flujos de trabajo y mejorando el rendimiento.
  Cuando no estoy programando, exploro nuevas tecnologías web y aporto a la comunidad.`,
  status: {
    available: true,
    subtitle: "Abierto a nuevas oportunidades",
    stats: [
      { label: "Proyectos", value: "4+" },
      { label: "Experiencia", value: "3 años" },
    ],
  },
  experience: [
    { initials: "WG", role: "Full Stack Developer", company: "Want n Get", period: "2025 - Present" },
    { initials: "FD", role: "Full Stack Developer", company: "FUNDASOFTMISS", period: "2025" },
    { initials: "FR", role: "Frontend Developer", company: "Freelance", period: "3 meses" },
    { initials: "SN", role: "Aprendiz / Full Stack", company: "SENA", period: "Dic 2024 - Jun 2025" },
  ],
  links: {
    github: "https://github.com/TUUSUARIO",
    linkedin: "https://www.linkedin.com/in/TUPERFIL",
    email: "mailto:hcardoso@wantnget.com.co",
  },
}

const PROFILE_EN = {
  initials: "FM",
  name: "Hector Fabian Cardoso Morales",
  location: "Colombia",
  about: `I am Hector Fabian Cardoso Morales, a software developer in Colombia with 3 years of experience creating
  scalable web applications and custom solutions. I specialize in frontend and full-stack development,
  building fluid experiences, optimizing workflows, and improving performance.
  When I'm not programming, I explore new web technologies and contribute to the community.`,
  status: {
    available: true,
    subtitle: "Open to new opportunities",
    stats: [
      { label: "Projects", value: "4+" },
      { label: "Experience", value: "3 years" },
    ],
  },
  experience: [
    { initials: "WG", role: "Full Stack Developer", company: "Want n Get", period: "2025 - Present" },
    { initials: "FD", role: "Full Stack Developer", company: "FUNDASOFTMISS", period: "2025" },
    { initials: "FR", role: "Frontend Developer", company: "Freelance", period: "3 months" },
    { initials: "SN", role: "Apprentice / Full Stack", company: "SENA", period: "Dec 2024 - Jun 2025" },
  ],
  links: {
    github: "https://github.com/TUUSUARIO",
    linkedin: "https://www.linkedin.com/in/TUPERFIL",
    email: "mailto:hcardoso@wantnget.com.co",
  },
}

const SKILLS_ES = {
  Lenguajes: ["JavaScript", "TypeScript", "Java"],
  Frontend: ["React", "Next.js", "Vue.js"],
  Backend: ["Node.js", "NestJS", "Spring Boot"],
  "Bases de datos": ["MongoDB", "PostgreSQL"],
  Herramientas: ["Git", "Vercel"],
}

const SKILLS_EN = {
  Languages: ["JavaScript", "TypeScript", "Java"],
  Frontend: ["React", "Next.js", "Vue.js"],
  Backend: ["Node.js", "NestJS", "Spring Boot"],
  Databases: ["MongoDB", "PostgreSQL"],
  Tools: ["Git", "Vercel"],
}

const PROJECTS = [
  {
    title: "E-Commerce Platform Mercampo",
    description:
      "Plataforma e-commerce desarrollada para catálogo y compras, enfocada en experiencia de usuario, navegación rápida y despliegue en la nube.",
    tags: ["React", "Node.js", "PostgreSQL"],
    links: [{ label: "Demo", url: "https://mercampo-fronted-9l6n.vercel.app/" }],
  },
  {
    title: "ChatBot SAAVE Arquitectos",
    description:
      "Chatbot para atención y contacto con usuarios, integrado con flujos y panel de control para administración y seguimiento.",
    tags: ["Next.js", "TypeScript", "Integración", "Panel"],
    links: [
      { label: "Sitio", url: "https://saave-nu.vercel.app/" },
      { label: "Panel", url: "https://saave-panel-control.vercel.app/login" },
    ],
  },
  {
    title: "Landing Corporación Admipsalud Consultores",
    description:
      "Landing page corporativa optimizada para conversión: secciones claras, diseño responsive y performance orientado a SEO.",
    tags: ["Next.js", "TypeScript"],
    links: [{ label: "Demo", url: "https://lading-page-ecru-nine.vercel.app/" }],
  },
  {
    title: "Plataforma de Mantenimiento",
    description:
      "Sistema de gestión de mantenimiento para equipos: registro, control de estados y flujo de trabajo para seguimiento operativo.",
    tags: ["NestJS", "TypeScript", "MongoDB", "Vue.js"],
    links: [{ label: "Demo", url: "https://plaforma-mantenimiento-frontend.vercel.app/" }],
  },
]

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function Portfolio() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  const PROFILE = language === "es" ? PROFILE_ES : PROFILE_EN
  const SKILLS = language === "es" ? SKILLS_ES : SKILLS_EN
  const CV_DESC = language === "es"
    ? "CV actualizado • Full Stack Developer • 1 página"
    : "Updated CV • Full Stack Developer • 1 page"

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.12),transparent_55%)]" />

      <div className="max-w-6xl mx-auto">

        {/* ── Barra superior: idioma + tema ── */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <SelectDropdown
            options={LANG_OPTIONS}
            value={language}
            onChange={(val) => setLanguage(val as "es" | "en")}
          />
          <SelectDropdown
            options={THEME_OPTIONS}
            value={theme ?? "system"}
            onChange={setTheme}
          />
        </div>

        {/* ── Grid principal ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 auto-rows-min items-start">
          {/* About — 2 cols, 2 filas */}
          <Card className="md:col-span-2 md:row-span-2 p-6 bg-card border border-border rounded-2xl shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary font-sans">{PROFILE.initials}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-card-foreground font-sans">{PROFILE.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-sans">{PROFILE.location}</span>
                    </div>
                  </div>
                </div>

                {/* Texto con expand/collapse */}
                <AboutText text={PROFILE.about} expandLabel={language === "es" ? "Ver más" : "Read more"} collapseLabel={language === "es" ? "Ver menos" : "Show less"} />
              </div>
              <div className="mt-5 space-y-3">
                {Object.entries(SKILLS).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-xs font-semibold text-muted-foreground font-sans mb-2">{group}</p>
                    <div className="flex flex-wrap gap-2">
                      {(items as string[]).map((skill) => (
                        <Badge key={skill} variant="secondary" className="font-sans text-xs rounded-full">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Experience */}
          <Card className="md:col-span-2 p-12 bg-card border border-border rounded-2xl shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-bold text-card-foreground mb-4 font-sans">{t.experience}</h3>
            <div className="space-y-3">
              {PROFILE.experience.map((exp) => (
                <div key={exp.role + exp.company} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary font-sans">{exp.initials}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans text-sm">{exp.role}</h4>
                    <p className="text-xs text-muted-foreground font-sans">
                      {exp.company} • {exp.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Status — 1 col, 2 filas: contenido ordenado sin padding excesivo */}
          <Card className="md:col-span-1 md:row-span-1 p-15 bg-card border border-border rounded-2xl shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col h-full gap-6">

              {/* Indicador disponible */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${PROFILE.status.available ? "bg-primary animate-pulse" : "bg-muted"}`} />
                  <h3 className="font-semibold text-card-foreground font-sans text-sm">
                    {PROFILE.status.available ? t.available : t.notAvailable}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  {PROFILE.status.subtitle}
                </p>
              </div>

              {/* Separador */}
              <div className="border-t border-border" />

              {/* Stats */}
              <div className="space-y-4">
                {PROFILE.status.stats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted-foreground font-sans">{s.label}</span>
                    <span className="text-2xl font-bold text-card-foreground font-sans leading-none">{s.value}</span>
                  </div>
                ))}
              </div>

            </div>
          </Card>

          {/* Connect */}
          <Card className="md:col-span-1 p-11 bg-card border border-border rounded-2xl shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col h-full">
              <h3 className="font-semibold text-card-foreground mb-4 font-sans">{t.connect}</h3>
              <div className="flex-1 flex flex-col justify-center space-y-3">
                <a href={PROFILE.links.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200">
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-sans">GitHub</span>
                </a>
                <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200">
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-sans">LinkedIn</span>
                </a>
                <a href={PROFILE.links.email}
                  className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-sans">Email</span>
                </a>
              </div>
            </div>
          </Card>

          {/* CV Preview */}
          <Card className="md:col-span-2 lg:col-span-2 p-6 bg-card border border-border rounded-2xl shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-bold text-card-foreground mb-4 font-sans">{t.visualizeCV}</h3>
            <div className="rounded-2xl border border-border bg-background/40 p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-card-foreground font-sans truncate">{CV_NAME}</p>
                <p className="text-sm text-muted-foreground font-sans line-clamp-1">{CV_DESC}</p>
                <p className="text-xs text-muted-foreground font-sans mt-1">PDF</p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="secondary" className="rounded-full">
                  <Link href="/cv">{t.see}</Link>
                </Button>
                <Button asChild className="rounded-full">
                  <a href={CV_URL} download="Hector-Fabian-CV.pdf">
                    <Download className="w-4 h-4 mr-2" />
                    {t.download}
                  </a>
                </Button>
              </div>
            </div>
          </Card>

        </div>

        {/* ── Todos los proyectos ── */}
        <section id="all-projects" className="mt-10">
          <h3 className="text-lg font-bold text-card-foreground font-sans mb-4">{t.allProjects}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project) => (
              <Card
                key={project.title}
                className="p-6 rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mt-2 font-sans">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs rounded-full font-sans">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.links.map((l) => (
                        <Button key={l.url} asChild size="sm" variant="secondary" className="rounded-full">
                          <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button asChild size="sm" variant="outline" className="rounded-full">
                    <a href={project.links[0].url} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <footer className="mt-12 text-center">
          <p className="text-muted-foreground text-sm font-sans">{t.copyright}</p>
        </footer>
      </div>
    </div>
  )
}
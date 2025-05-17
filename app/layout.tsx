import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>R7 Print Manager</title>
        <meta
          name="description"
          content="Sistema de gestão para empresas de comunicação visual, gráficas e serviços de impressão"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };

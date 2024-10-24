import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"
import { siteConfig } from "@/config/site"
import { Outfit } from "next/font/google"
import { Providers } from "@/components/providers"

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "900"],
  variable: "--font-outfit",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${outfit.variable}`}
    >
      <body
        cz-shortcut-listen="true"
        className={`min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}

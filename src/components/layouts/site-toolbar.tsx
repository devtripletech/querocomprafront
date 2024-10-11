import Link from "next/link"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { ChevronLeftIcon } from "lucide-react"
import type { SidebarNavItem } from "@/types"

type CategoriesButton = {
  id: number
  label: string
  cor: string
  icon: keyof typeof Icons
}
const categoriesButton = [
  { id: 1, label: "eletrônicos", icon: "eletronicos", cor: "#2E55BF" },
  { id: 2, label: "moda", icon: "moda", cor: "#D04DAB" },
  { id: 3, label: "casa", icon: "casa", cor: "#E27335" },
  { id: 4, label: "saúde", icon: "saude", cor: "#E44747" },
  { id: 5, label: "esportes", icon: "esportes", cor: "#25A577" },
  { id: 6, label: "entretenimento", icon: "entretenimento", cor: "#91439E" },
  { id: 7, label: "automotivo", icon: "automotivo", cor: "#8C8C8C" },
  { id: 8, label: "alimentação", icon: "alimentacao", cor: "#56A6F0" },
] as CategoriesButton[]

export function SiteToolbar() {
  return (
    <div className="container flex flex-col gap-5">
      <div className=" flex items-center justify-between gap-2 mt-2">
        <div className="flex  items-center  w-full h-12 rounded-full border border-input bg-background px-3 py-2 text-base ring-offset-background ">
          <Icons.search size={18} className="mr-2 text-input" />
          <input
            placeholder="Procure por um produto"
            className="file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Button
          variant="outline"
          className="border-input px-8 text-input font-light"
        >
          Buscar
        </Button>
      </div>
      <div className="flex items-center justify-between xl:justify-start gap-1 xl:gap-5">
        {categoriesButton.map((category) => {
          const Icon = category.icon ? Icons[category.icon] : ChevronLeftIcon

          return (
            <Link
              key={category.id}
              href="/"
              style={{ backgroundColor: category.cor }}
              className="text-primary-foreground h-12 px-3 xl:px-4 py-2 inline-flex items-center justify-center rounded-full text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="flex items-center gap-3 md:hidden:gap-3">
                <Icon className="h-6 w-6 " />
                <span className="hidden xl:block text-white">
                  {category.label}
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

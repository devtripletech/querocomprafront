import { Icons } from "../icons"
import { AspectRatio } from "../ui/aspect-ratio"

export function HomeBanner() {
  return (
    <div className="relative h-80 bg-[#2E55BF] flex justify-center items-center rounded-3xl">
      <div className="text-6xl font-medium text-white flex flex-col z-10">
        <span> Quanto você quer pagar?</span>
        <span> Você decide!</span>
      </div>
      <div className="absolute inset-0">
        <Icons.banner className="h-full pl-20 object-cover opacity-30" />
      </div>
    </div>
  )
}

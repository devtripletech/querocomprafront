import { Skeleton } from "@/components/ui/skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

export default function AccountLoading() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center">
        <h2 className="text-xl">Dados de acesso</h2>
      </div>
      <div className="flex flex-col">
        <div className="rounded-md border px-6 py-8 gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-5 w-20" />
              <div className="flex  w-full items-center rounded-md border px-4 ">
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-20" />
              <div className="flex w-full items-center rounded-md border px-4 ">
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

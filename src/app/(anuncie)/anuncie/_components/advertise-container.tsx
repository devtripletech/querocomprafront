"use client"

import * as React from "react"
import { AdvertiseStep1 } from "./advertise-step1"
import { AdvertiseStep2 } from "./advertise-step2"
import { AdvertiseStep3 } from "./advertise-step3"
import { AddProductForm } from "@/components/forms/add-product-form"
import { useQuery } from "@tanstack/react-query"
import { listCategoriesAction } from "@/app/_actions/categories"

export function AdvertiseContainer() {
  const [step, setStep] = React.useState<string>("step1")

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => listCategoriesAction(),
  })

  return (
    <>
      {step === "step2" ? (
        <AdvertiseStep2 setStep={setStep} categories={categories ?? []} />
      ) : // <AddProductForm categories={categories ?? []} />
      step === "step3" ? (
        <AdvertiseStep3 setStep={setStep} />
      ) : (
        <AdvertiseStep1 setStep={setStep} />
      )}
    </>
  )
}

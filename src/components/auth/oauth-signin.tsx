"use client"

import * as React from "react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: string
}[]

export function OAuthlogin() {
  const [isLoading, setIsLoading] = React.useState(false)

  async function oauthlogin() {
    if (isLoading) return null
    try {
      setIsLoading(true)
    } catch (error) {
      setIsLoading(false)
      const unknownError = "Something went wrong, please try again."
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => void oauthlogin()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}

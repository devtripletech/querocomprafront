import { type z } from "zod"
import { type FileWithPath } from "react-dropzone"
import { type userPrivateMetadataSchema } from "@/lib/validations/auth"
import type {
  cartItemSchema,
  cartLineItemSchema,
  checkoutItemSchema,
} from "@/lib/validations/cart"
import type { Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export interface StoredFile {
  id: string
  name: string
  url: string
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export interface Category {
  title: Product["category"]
  image: string
  icon: React.ComponentType<{ className?: string }>
  subcategories: Subcategory[]
}

export interface Subcategory {
  title: string
  description?: string
  image?: string
  slug: string
}
export interface Store {
  id: string
  userId: string
  name: string
  description: string
  slug: string
  createdAt: Date
  active: string
  stripeAccountId: string
}

export interface CuratedStore {
  id: Store["id"]
  name: Store["name"]
  description?: Store["description"]
  stripeAccountId?: Store["stripeAccountId"]
  productCount?: number
}

export type CartItem = z.infer<typeof cartItemSchema>

export type CheckoutItem = z.infer<typeof checkoutItemSchema>

export type CartLineItem = z.infer<typeof cartLineItemSchema>

// export type StripePaymentStatus = Stripe.PaymentIntent.Status

export interface SubscriptionPlan {
  id: "basic" | "standard" | "pro"
  name: string
  description: string
  features: string[]
  stripePriceId: string
  price: number
}

export interface UserSubscriptionPlan extends SubscriptionPlan {
  stripeSubscriptionId?: string | null
  stripeCurrentPeriodEnd?: string | null
  stripeCustomerId?: string | null
  isSubscribed: boolean
  isCanceled: boolean
  isActive: boolean
}

export interface Image {
  id: string
  name: string
  url: string
}

export interface Product {
  id: number
  name: string
  description: string
  images?: Image[]
  price: string
  inventory: number
  rating: number
  storeId: number
  createdAt: Date
  updatedAt: Date
  tags?: string[] | null
  category: productsCategoryType
  subcategory: string
}

export interface Stores {
  id: number
  userId: string
  name: string
  description: string
  slug: string
  active: boolean
  stripeAccountId: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  primaryEmailAddressId: string
  emailAddresses: EmailAddresses[]
  email: string
}

export interface EmailAddresses {
  id: string
  emailAddress: string
}

export enum productsCategoryType {
  Service = "service",
  Product = "product",
}

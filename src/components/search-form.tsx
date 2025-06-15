import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}>
            Søk QR-koder
          </Label>
          <SidebarInput
            id="search"
            placeholder="Søk QR-koder..."
            className="pl-8"
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable' }}
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}

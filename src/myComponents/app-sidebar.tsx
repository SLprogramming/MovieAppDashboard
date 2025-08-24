import { Gem , Users, TicketCheck, CreditCard,  Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Users",
    url: "/users",
    icon:Users,
  },
  {
    title: "Purchase",
    url: "/purchase",
    icon: TicketCheck,
  },
  {
    title: "Plans",
    url: "/plans",
    icon: Gem ,
  },
  {
    title: "Payment",
    url: "/payment",
    icon: CreditCard ,
  },
  // {
  //   title: "Notification",
  //   url: "#",
  //   icon: Bell ,
  // },
  {
    title: "Setting",
    url: "#",
    icon: Settings ,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
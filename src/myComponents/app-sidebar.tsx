import { Gem , Users, TicketCheck, CreditCard,  Settings ,MessageCircleMore } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { useStoreSelector } from "@/store/store"
import { useMemo } from "react"

type SidebarTitle = "Users" | "Purchase" | "Plans" | "Payment" | "Setting" | "Message";

const items: { title: SidebarTitle; url: string; icon: any }[] = [
  { title: "Users", url: "/users", icon: Users },
  { title: "Purchase", url: "/purchase", icon: TicketCheck },
  { title: "Plans", url: "/plans", icon: Gem },
  { title: "Payment", url: "/payment", icon: CreditCard },
  { title: "Message", url: "/message", icon: MessageCircleMore },
  { title: "Setting", url: "#", icon: Settings },
];


export function AppSidebar() {
  const {purchaseHistory} = useStoreSelector(store => store?.purchase)
const badge: Record<SidebarTitle, number> = useMemo(() => {
  return {
    Purchase: purchaseHistory.filter(e => e.status === "pending").length || 0,
    Users: 0,
    Plans: 0,
    Payment: 0,
    Setting: 0,
    Message: 0,
  };
}, [purchaseHistory]);

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
                    {badge[item.title] > 0 && <Badge className="absolute scale-90 right-0">{badge[item.title]}</Badge>}
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
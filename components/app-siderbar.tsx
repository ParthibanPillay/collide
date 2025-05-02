import { Calendar, Delete, File, Folder, Home, Inbox, Search, Settings, Star, TrashIcon } from "lucide-react"

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

// Menu items.
const items = [
    {
        title: "All files",
        url: "#",
        icon: File,
    },
    {
        title: "Folders",
        url: "/",
        icon: Folder,
    },
    {
        title: "Starred",
        url: "/api/files/fileId/star/route.ts",
        icon: Star,
    },
    {
        title: "Trashed files",
        url: "#",
        icon: TrashIcon,
    }
]

export function AppSidebar() {
    return (
        <Sidebar className="bg-[#121211] border border-black ">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-center">Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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

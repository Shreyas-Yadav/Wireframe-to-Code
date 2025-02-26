import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
} from "@/components/ui/sidebar"
import { CircleDollarSign, Home, Inbox } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Workspace",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Design",
        url: "/design",
        icon: Inbox,
    },
    {
        title: "Credits",
        url: "/credits",
        icon: CircleDollarSign,
    },
]

export function AppSidebar() {
    const path = usePathname()
    console.log(path);
    
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4 flex justify-center items-center'>
                    <Image src={'/logo.png'} alt='logo' width={50} height={50}/>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                                // <SidebarMenuItem key={item.title} className='p-2'>
                                //     <SidebarMenuButton asChild className=''>
                                <a href={item.url} key={index}
                                 className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${path === item.url ? 'bg-gray-200' : ''}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                                //     </SidebarMenuButton>
                                // </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {/* <SidebarFooter>
                <h2 className='p-2 text-gray-400 text-sm'>Copyright @Tubeguruji</h2>
            </SidebarFooter> */}
        </Sidebar>
    )
}
"use client"
import Image from "next/image"
import { button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu
} from "@/components/ui/sidebar"
import { sideBarOptions } from "@/services/Constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function AppSidebar() {
  const path = usePathname();
  console.log(path);
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-5 gap-3">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[120px]"
        />

        <button className="  mt-5 w-full flex items-center  justify-center gap-1 px-4 py-3 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
          <Plus size={20} />
          Create New Interview
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {sideBarOptions.map((option,index) => (
                        <SidebarMenuItem key={index} className='p-1'>
                            <SidebarMenuButton asChild className={`p-5 ${path === option.path ?  ' bg-blue-50' : ''}`}>
                                <Link href={option.path}>
                                <option.icon className={` ${path === option.path ? 'text-primary' : ''}`}/>
                                <span className={`text-[16px] font-medium ${path === option.path ? 'text-primary' : ''}`}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup >
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

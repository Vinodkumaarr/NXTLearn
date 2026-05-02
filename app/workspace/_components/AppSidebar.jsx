"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";

const SideBarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: Book,
    path: "/workspace/my-courses",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  {
    title: "AI Tools",
    icon: PencilRulerIcon,
    path: "/workspace/ai-tools",
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing",
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path: "/workspace/profile",
  },
];

function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      {/* Logo */}
      <SidebarHeader className="p-4">
        <Image src="/logo.svg" alt="logo" width={45} height={40} />
      </SidebarHeader>

      <SidebarContent>
        
        {/* Create Course Button */}
        <SidebarGroup>
          <AddNewCourseDialog>
          <Button className="w-full">Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index) => (
                <SidebarMenuButton key={index} asChild className={"p-5"}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 text-[17px] p-2 rounded-md 
                    ${
                    path.includes(item.path)
                    ? "text-primary bg-purple-100"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 text-sm text-gray-400">
        © 2025 NexLearn
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

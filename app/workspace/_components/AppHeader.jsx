import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

function AppHeader() {
  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      {/* Sidebar Toggle Button */}
       <SidebarTrigger />

      {/* Clerk User Button (Profile/Sign out) */}
      <UserButton />
    </div>
  );
}

export default AppHeader;



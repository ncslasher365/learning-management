"use client";

import Loading from "@/components/Loading";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ChaptersSidebar from "./user/courses/[courseId]/ChaptersSidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathname
  );

  useEffect(() => {
    if (isCoursePage) {
      const match = pathname.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathname]);

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please, sign in to access this page!</div>;

  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="dashboard">
            <div className="dashboard__content">
                {courseId && <ChaptersSidebar />}
                <div 
                  className={cn(
                    "dashboard__main", 
                    isCoursePage && "dashboard__main--not-course"
                  )} 
                  style={{ height: "100vh" }}
                  >
                    <Navbar isCoursePage={isCoursePage} />
                    <main className="dashboard__body">{children}</main>
                </div>
            </div>
        </div>
    </SidebarProvider>
  );
}

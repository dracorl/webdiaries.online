"use client"

import {useAppStore} from "@/stores/appStore"
import Navbar from "@/components/layout/Navbar"
import BlogArchive from "@/components/main/BlogArchive"
import TagList from "@/components/main/TagList"
import MobileSidebar from "@/components/layout/MobileSidebar"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  const {isLeftDrawerOpen, setLeftDrawerOpen} = useAppStore()

  return (
    <div className="drawer">
      <input
        id="left-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isLeftDrawerOpen}
        readOnly
      />

      {/* Ana içerik */}
      <div className="bg-base-200 text-base-content drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar />
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Sol panel */}
            <div className="shadow-md bg-base-300 text-base-content hidden md:block md:col-span-3 p-4 h-screen sticky top-0 overflow-auto">
              <BlogArchive />
            </div>

            {/* Ana içerik (dinamik kısım) */}
            <div className="bg-base-200 md:col-span-7 mt-4">{children}</div>

            {/* Sağ panel */}
            <div className="shadow-md bg-base-300 text-base-content hidden md:block md:col-span-2 p-4 h-screen sticky top-0 overflow-auto">
              <TagList />
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Side (mobil görünüm) */}
      <MobileSidebar />
    </div>
  )
}

export default MainLayout

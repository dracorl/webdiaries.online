"use client"

import {useAppStore} from "@/stores/appStore"
import BlogArchive from "@/components/main/BlogArchive"
import TagList from "@/components/main/TagList"
import ThemeSelector from "@/components/ui/ThemeSelector"
import SearchBox from "@/components/ui/SearchBox"

const MobileSidebar = () => {
  const {setLeftDrawerOpen} = useAppStore()

  return (
    <div className="drawer-side">
      <label
        htmlFor="left-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
        onClick={() => setLeftDrawerOpen(false)}
      ></label>
      <ul className="menu p-2 w-80 min-h-full bg-base-200 text-base-content">
        <li className="mt-20">
          <ThemeSelector />
        </li>
        <li className="mt-5">
          <SearchBox />
        </li>
        <li className="mt-5">
          <BlogArchive />
        </li>
        <li className="mt-5">
          <TagList />
        </li>
      </ul>
    </div>
  )
}

export default MobileSidebar

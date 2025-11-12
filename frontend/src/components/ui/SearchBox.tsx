"use client"

import {FaSearch} from "react-icons/fa"
import {useState, type ChangeEvent, type KeyboardEvent} from "react"
import {useRouter} from "next/navigation"
import {useAppStore} from "@/stores/appStore"

const SearchBox = () => {
  const [search, setSearch] = useState<string>("")
  const router = useRouter()
  const {setLeftDrawerOpen} = useAppStore()

  const handleSearch = () => {
    if (search.trim() === "") return

    router.push(`/search?search=${encodeURIComponent(search.trim())}`)

    setLeftDrawerOpen(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <label className="input input-bordered flex items-center gap-2 text-base-content">
      <input
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={search}
        type="text"
        className="grow"
        placeholder="Search"
      />
      <FaSearch onClick={handleSearch} className="cursor-pointer" />
    </label>
  )
}

export default SearchBox

"use client"

import SearchBox from "@/components/ui/SearchBox"
import ThemeSelector from "@/components/ui/ThemeSelector"
import Loading from "@/components/ui/Loading"
import Link from "next/link"
import {useAppStore} from "@/stores/appStore"
import {FiMenu} from "react-icons/fi"

const Navbar = () => {
  const {hostnamePrefix, toggleLeftDrawer} = useAppStore()

  return (
    <>
      {/* 1. Üst Navigasyon Çubuğu */}
      <div className="fixed top-0 left-0 right-0 md:relative w-full navbar bg-neutral text-neutral-content z-50 shadow-md">
        {/* Sol Çekmeceyi Açma Butonu (Mobil) */}
        <div className="flex-none lg:hidden">
          <button
            onClick={toggleLeftDrawer}
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobil Başlık */}
        <div className="flex-1 lg:hidden">
          <Link
            href="/about"
            className="base-content btn btn-ghost text-xl font-thin italic"
          >
            {hostnamePrefix || <Loading />}
          </Link>
        </div>

        {/* Masaüstü Navigasyon */}
        <div className="flex-none items-center w-full hidden lg:flex">
          {/* Sol - Başlık */}
          <div className="flex-1">
            <Link
              href="/about"
              className="base-content btn btn-ghost text-xl font-thin italic"
            >
              {hostnamePrefix || <Loading />}
            </Link>
          </div>

          {/* Orta - Arama Kutusu */}
          <div className="flex-1 flex justify-center">
            <div className="base-content">
              <SearchBox />
            </div>
          </div>

          {/* Sağ - Tema Seçici */}
          <div className="flex-1 flex justify-end">
            <ThemeSelector />
          </div>
        </div>
      </div>

      {/* 2. Mobil Görünüm İçin İçerik Kaydırma Boşluğu */}
      <div className="pt-16 block md:hidden"></div>
    </>
  )
}

export default Navbar

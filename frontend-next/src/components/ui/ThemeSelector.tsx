"use client"

import {useEffect, useState, type ChangeEvent} from "react"

const firstLetterUppercase = (string: string): string => {
  if (!string) return ""
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const themes: string[] = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset"
]

const ThemeSelector = () => {
  const [theme, setTheme] = useState<string>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Client-side kontrolü
    if (typeof window !== "undefined") {
      // localStorage'dan temayı oku
      const savedTheme = localStorage.getItem("theme")
      console.log("Saved theme from localStorage:", savedTheme)

      // HTML'de data-theme attribute'unu kontrol et
      const htmlTheme = document.documentElement.getAttribute("data-theme")
      console.log("Current HTML data-theme:", htmlTheme)

      if (savedTheme && themes.includes(savedTheme)) {
        setTheme(savedTheme)
        applyTheme(savedTheme)
      } else if (htmlTheme && themes.includes(htmlTheme)) {
        setTheme(htmlTheme)
        localStorage.setItem("theme", htmlTheme)
      } else {
        // Varsayılan tema
        applyTheme("light")
      }
    }
  }, [])

  const applyTheme = (themeName: string) => {
    // HTML elementine data-theme attribute'unu ekle
    document.documentElement.setAttribute("data-theme", themeName)
    // localStorage'a kaydet
    localStorage.setItem("theme", themeName)
    console.log("Applied theme:", themeName)
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value
    setTheme(selectedTheme)
    applyTheme(selectedTheme)
  }

  // SSR ile hydration uyumsuzluğunu önlemek için
  if (!mounted) {
    return (
      <select className="select select-bordered text-base-content" disabled>
        <option>Loading themes...</option>
      </select>
    )
  }

  return (
    <select
      value={theme}
      className="select select-bordered text-base-content"
      onChange={handleChange}
    >
      {themes.map(t => (
        <option key={t} value={t}>
          {firstLetterUppercase(t)}
        </option>
      ))}
    </select>
  )
}

export default ThemeSelector

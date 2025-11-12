"use client"

import {FaArrowLeft} from "react-icons/fa"
import {useRouter} from "next/navigation"

const BackButton = () => {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center ml-1 md:-ml-1 pb-4 mt-4 hover:opacity-80 transition-opacity group"
      title="Back"
    >
      <FaArrowLeft
        size={25}
        className="group-hover:-translate-x-1 transition-transform"
      />
      <div className="ml-2 text-2xl font-bold">Back</div>
    </button>
  )
}

export default BackButton

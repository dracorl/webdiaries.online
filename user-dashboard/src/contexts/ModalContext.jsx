import {createContext, useContext, useState} from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

const ModalContext = createContext()

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalConfig, setModalConfig] = useState({
    title: "",
    description: "",
    content: null
  })

  const openModal = (title, description, ContentComponent) => {
    setModalConfig({
      title,
      description,
      content: ContentComponent
    })
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalConfig({title: "", description: "", content: null})
  }

  return (
    <ModalContext.Provider value={{openModal, closeModal}}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="font-arOne sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{modalConfig.title}</DialogTitle>
            {modalConfig.description && (
              <DialogDescription>{modalConfig.description}</DialogDescription>
            )}
          </DialogHeader>
          {modalConfig.content}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error("useModal must be used within a ModalProvider")
  return context
}

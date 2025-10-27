import {useState} from "react"
import TipTap from "../components/TipTap"
import {useModal} from "../contexts/ModalContext"
import SavePostForm from "../components/forms/SavePostForm"

const CreateBlogPost = () => {
  const [editorContent, setEditorContent] = useState("")
  const {openModal} = useModal()
  const handleOpenSaveModal = () => {
    openModal("Save Post", "", <SavePostForm editorContent={editorContent} />)
  }
  return (
    <div className="mx-2 my-4 divide-y min-h-screen font-arOne">
      <TipTap
        openModal={handleOpenSaveModal}
        setEditorContent={setEditorContent}
      />
    </div>
  )
}
export default CreateBlogPost

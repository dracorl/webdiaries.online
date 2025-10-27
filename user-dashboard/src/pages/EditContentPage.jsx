import {useQuery, gql} from "@apollo/client"
import {useState} from "react"
import TipTap from "../components/TipTap"
import {useParams} from "react-router-dom"
import Loading from "../components/main/Loading"
import {useModal} from "../contexts/ModalContext"
import EditPostForm from "../components/forms/EditPostForm"

const CONTENT_QUERY = gql`
  query Blog($blogId: ID!) {
    blog(id: $blogId) {
      id
      content
      title
      tags {
        id
        name
      }
    }
  }
`

//I passed the blogId param to EditContentModal but it is undefined in that component???
const EditContentPage = () => {
  const [editorContent, setEditorContent] = useState("")
  const {blogId} = useParams()
  const {openModal} = useModal()
  const {data, loading} = useQuery(CONTENT_QUERY, {
    variables: {blogId},
    fetchPolicy: "network-only", // "cache-first" is the default,
    onCompleted: data => {
      setEditorContent(data.blog.content)
    }
  })
  const handleOpenSaveModal = () => {
    openModal(
      "Edit Blog Post",
      "",
      <EditPostForm
        blogId={blogId}
        currentTitle={data.blog.title}
        currentTags={data.blog.tags}
        editorContent={editorContent}
      />
    )
  }

  if (!loading && data) {
    return (
      <div className="mx-2 my-4 divide-y min-h-screen font-arOne">
        <TipTap
          openModal={handleOpenSaveModal}
          editorContent={data.blog.content}
          setEditorContent={setEditorContent}
        />
      </div>
    )
  }
  return (
    <div className="h-screen relative">
      <Loading />
    </div>
  )
}
export default EditContentPage

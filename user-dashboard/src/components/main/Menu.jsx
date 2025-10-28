import {FaPlus, FaList, FaChartBar, FaCog, FaSignInAlt} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import {Button} from "@/components/ui/button"
import {useAuth} from "@/contexts/AuthContext"

const Menu = ({onOpenChange}) => {
  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLinkClick = () => {
    onOpenChange(false) // Drawer'ı kapat
  }

  const handleLogout = () => {
    onOpenChange(false)
    logout()
    navigate("/")
  }

  return (
    <div className="space-y-4 mx-2">
      <Button asChild className="w-full mt-10" onClick={handleLinkClick}>
        <Link to="/create">
          <FaPlus className="text-lg mr-2" />
          Create New Post
        </Link>
      </Button>

      <div className="text-foreground w-56 rounded-lg p-2 space-y-1">
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLinkClick}
        >
          <Link to="/posts">
            <FaList className="text-lg mr-2" />
            Blog Posts
          </Link>
        </Button>

        <Button variant="ghost" className="w-full justify-start">
          <FaChartBar className="text-lg mr-2" />
          Statistics
        </Button>

        <Button
          asChild
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLinkClick}
        >
          <Link to="/settings">
            <FaCog className="text-lg mr-2" />
            Settings
          </Link>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <FaSignInAlt className="text-lg mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Menu

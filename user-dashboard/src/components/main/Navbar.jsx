import {useState, useEffect} from "react"
import {useNavigate, Link} from "react-router-dom"
import {useAuth} from "../../contexts/AuthContext"
import {Button} from "@/components/ui/button"
import {TypeAnimation} from "react-type-animation"
import {useModal} from "../../contexts/ModalContext"
import LoginForm from "../forms/LoginForm"

const Navbar = ({onDrawerOpen}) => {
  const navigate = useNavigate()
  const {loggedIn, logout, getUsername} = useAuth()
  const [username, setUsername] = useState(null)
  const {openModal} = useModal()

  useEffect(() => {
    if (loggedIn) {
      const fetchUsername = async () => {
        try {
          const result = await getUsername()
          setUsername(result)
          // Eğer username alınamazsa oturumu kapat
          if (!result) {
            logout()
            navigate("/login")
          }
        } catch (error) {
          logout()
          navigate("/login")
        }
      }
      fetchUsername()
    }
  }, [loggedIn, getUsername, logout, navigate])

  const loginAction = () => {
    openModal("Login", "Log in to your account", <LoginForm />)
  }

  const logoutAction = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="font-arOne bg-gray-200/30 shadow-md flex items-center justify-between w-full h-16 px-4 border-b">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        {loggedIn && username && (
          <Link
            to={`https://${username}.webdiaries.online`}
            target="_blank"
            className="flex items-center gap-1 md:gap-2 hover:opacity-80 transition-opacity"
          >
            <TypeAnimation
              className="text-xs md:text-sm max-w-[100px] md:max-w-none truncate"
              sequence={[
                `https://${username}.webdiaries.online`,
                1000,
                "",
                1000
              ]}
              speed={50}
              repeat={Infinity}
            />
          </Link>
        )}
        {!loggedIn && (
          <TypeAnimation
            sequence={[
              "Ideas deserve to be heard",
              1000,
              "Write what you feel",
              1000,
              "Your voice. Your story.",
              1000,
              "Thoughts that connect us",
              1000,
              "Words shape the world",
              1000,
              "Speak through your stories",
              1000
            ]}
            speed={50}
            repeat={Infinity}
            className="text-xs md:text-sm"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        {loggedIn && (
          <>
            <Button
              variant="default"
              onClick={logoutAction}
              className="text-xs px-2 md:px-4 hidden md:inline"
            >
              <span className="hidden md:inline">Log Out</span>
            </Button>
            <Button variant="default" size="icon" onClick={onDrawerOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </Button>
          </>
        )}
        {!loggedIn && (
          <Button
            variant="default"
            onClick={loginAction}
            className="text-xs px-2 md:px-4 z-50"
          >
            LOG IN
          </Button>
        )}
      </div>
    </header>
  )
}

export default Navbar

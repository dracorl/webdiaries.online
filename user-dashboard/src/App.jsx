// App.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Landing from "@/components/main/Landing"
import PostsPage from "./pages/PostsPage"
import CreateBlogPostPage from "./pages/CreateBlogPostPage"
import EditContentPage from "./pages/EditContentPage"
import SettingsPage from "./pages/SettingsPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/main/ProtectedRoute"
import PublicOnlyRoute from "./components/main/PublicOnlyRoute"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route index element={<Landing />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/create" element={<CreateBlogPostPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/posts/:blogId/edit" element={<EditContentPage />} />
      </Route>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

const App = () => <RouterProvider router={router} />

export default App

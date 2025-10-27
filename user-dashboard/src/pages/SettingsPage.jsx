import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import BioForm from "../components/forms/BioForm"
import EmailForm from "../components/forms/EmailForm"
import PasswordForm from "../components/forms/PasswordForm"
import SocialLinksForm from "../components/forms/SocialLinksForm"

const SettingsPage = () => {
  return (
    <Tabs defaultValue="bio" className="w-full h-screen font-arOne">
      {/* Sabit Tab Başlıkları */}
      <div className="sticky top-0 bg-background drop-shadow-xl">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="bio" className="text-sm">
            Bio
          </TabsTrigger>
          <TabsTrigger value="email" className="text-sm">
            Email
          </TabsTrigger>
          <TabsTrigger value="password" className="text-sm">
            Password
          </TabsTrigger>
          <TabsTrigger value="links" className="text-sm">
            Links
          </TabsTrigger>
        </TabsList>
      </div>

      {/* İçerik Alanı */}
      <div className="mt-4">
        <TabsContent key="bio" value="bio">
          <div className="max-w-3xl mx-auto bg-card rounded-lg p-6 drop-shadow-xl">
            <BioForm />
          </div>
        </TabsContent>

        <TabsContent value="email">
          <div className="max-w-xl mx-auto bg-card rounded-lg p-6 drop-shadow-xl">
            <EmailForm />
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className="max-w-xl mx-auto bg-card rounded-lg p-6 drop-shadow-xl">
            <PasswordForm />
          </div>
        </TabsContent>

        <TabsContent value="links">
          <div className="max-w-3xl mx-auto bg-card rounded-lg p-6 drop-shadow-xl">
            <SocialLinksForm />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default SettingsPage

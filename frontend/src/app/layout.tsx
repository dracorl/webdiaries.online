import "./globals.css"
import type {Metadata} from "next"
import {headers} from "next/headers"
import {HostnameProvider} from "@/providers/HostnameProvider"
import {ApolloWrapper} from "@/providers/ApolloWrapper"
import MainLayout from "@/components/layout/MainLayout"
import {AuthorProvider} from "@/providers/AuthorProvider"
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const subdomain = host.split(".")[0]
  const siteName = subdomain ? subdomain : "webdiary"

  return {
    title: `${siteName}'s webdiary`,
    description: `${siteName} webdiary blog platform`,
    openGraph: {
      title: `${siteName}'s webdiary`,
      description: `${siteName} webdiary blog platform`
    }
  }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <HostnameProvider>
            <AuthorProvider>
              <MainLayout>{children}</MainLayout>
            </AuthorProvider>
          </HostnameProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}

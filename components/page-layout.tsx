import Layout from "@/components/layout/Layout"

interface PageLayoutProps {
  children: React.ReactNode
  breadcrumbTitle?: string
}

export default function PageLayout({ children, breadcrumbTitle }: PageLayoutProps) {
  return <Layout breadcrumbTitle={breadcrumbTitle}>{children}</Layout>
}


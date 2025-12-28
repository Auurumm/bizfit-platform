import Layout from "@/components/layout/Layout"
import PageHeader from '@/components/sections/PageHeader'
import Section1 from '@/components/sections/contact/Section1'
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Contact Us" />
                <Section1 />
            </Layout>
        </>
    )
}
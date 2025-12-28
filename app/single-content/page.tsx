import Layout from "@/components/layout/Layout"
import PageHeader from '@/components/sections/PageHeader'
import Section1 from '@/components/sections/single-content/Section1'
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="Our attorney team" />
                <Section1 />
            </Layout>
        </>
    )
}
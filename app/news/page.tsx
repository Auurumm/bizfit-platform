import Layout from "@/components/layout/Layout"
import PageHeader from '@/components/sections/PageHeader'
import Section1 from '@/components/sections/news/Section1'
import Pagination from '@/components/elements/Pagination'
export default function Home() {
    return (
        <>
            <Layout>
                <PageHeader title="News & Blog" />
                <Section1 />
                <Pagination />
            </Layout>
        </>
    )
}
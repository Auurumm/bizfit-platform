import Layout from "@/components/layout/Layout"
import PageHeader from '@/components/sections/PageHeader'
import Section1 from '@/components/sections/single-service/Section1'
export default function Home() {
	return (
		<>
			<Layout>
				<PageHeader title="Law Services" />
				<Section1 />
			</Layout>
		</>
	)
}
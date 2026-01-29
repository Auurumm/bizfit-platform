import Layout from "@/components/layout/Layout"
import PageHeader from '@/components/sections/PageHeader'
import Section1 from '@/components/sections/about/Section1'
import Section2 from '@/components/sections/about/Section2'
import Section3 from '@/components/sections/about/Section3'
export default function Home() {
	return (
		<>
			<Layout>
				<PageHeader title="About Company" />
				<Section1 />
				<Section2 />
				<Section3 />
			</Layout>
		</>
	)
}
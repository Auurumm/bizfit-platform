import Layout from "@/components/layout/Layout"
import PageHeader from '@/components/sections/PageHeader'
import Section4 from '@/components/sections/home/Section4'
import Section1 from '@/components/sections/practice-area/Section1'
export default function Home() {
	return (
		<>
			<Layout>
				<PageHeader title="Practice areas" />
				<Section4 />
				<Section1 />
			</Layout>
		</>
	)
}
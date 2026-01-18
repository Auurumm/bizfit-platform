import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HomeButtonProps {
  size?: "default" | "sm" | "lg" | "icon"
}

export default function HomeButton({ size = "default" }: HomeButtonProps) {
  return (
    <Link href="/">
      <Button size={size}>
        홈으로 돌아가기
      </Button>
    </Link>
  )
}


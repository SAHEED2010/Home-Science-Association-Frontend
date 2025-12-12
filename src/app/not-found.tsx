import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-4 bg-muted/40">
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <FileQuestion className="h-10 w-10 text-muted-foreground" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
                <p className="text-lg text-muted-foreground">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
            </div>
            <Link href="/">
                <Button>Go back home</Button>
            </Link>
        </div>
    )
}

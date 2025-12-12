import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-8">
            <div className="space-y-4 w-full max-w-3xl">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-[100px] rounded-xl" />
                    <Skeleton className="h-[100px] rounded-xl" />
                    <Skeleton className="h-[100px] rounded-xl" />
                </div>
            </div>
        </div>
    )
}

export default function ParentChildrenPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
                <p className="text-muted-foreground">View your children's information</p>
            </div>

            <div className="rounded-lg border bg-card p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Children Coming Soon</h2>
                <p className="text-muted-foreground">Your children's profiles will be available here</p>
            </div>
        </div>
    );
}

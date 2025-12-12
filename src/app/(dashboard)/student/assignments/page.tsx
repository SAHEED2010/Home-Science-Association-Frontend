export default function StudentAssignmentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Assignments</h1>
                <p className="text-muted-foreground">View and submit your assignments</p>
            </div>

            <div className="rounded-lg border bg-card p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Assignments Coming Soon</h2>
                <p className="text-muted-foreground">Your assignments will be available here</p>
            </div>
        </div>
    );
}

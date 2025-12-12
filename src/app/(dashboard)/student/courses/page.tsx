export default function StudentCoursesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
                <p className="text-muted-foreground">View your enrolled courses</p>
            </div>

            <div className="rounded-lg border bg-card p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">Courses Coming Soon</h2>
                <p className="text-muted-foreground">Your course list will be available here</p>
            </div>
        </div>
    );
}

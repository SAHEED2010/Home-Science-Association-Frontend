import { Quote } from "lucide-react";

export default function TestimonialsPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <main className="flex-1">
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-6 lg:px-12 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">Voices of HSA</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Hear from our students, parents, and alumni about their experiences and the impact HSA has had on their lives.
                        </p>
                    </div>
                </section>

                <section className="py-20 bg-background">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {[
                                {
                                    text: "HSA has been a second home to me. The teachers are supportive, and the environment encourages you to be your best self.",
                                    author: "Chidinma O.",
                                    role: "Class of 2023",
                                    type: "Alumni"
                                },
                                {
                                    text: "Enrolling my children in HSA was the best decision. The moral and academic standard is second to none.",
                                    author: "Mr. & Mrs. Adebayo",
                                    role: "Parents",
                                    type: "Parent"
                                },
                                {
                                    text: "I love the science labs! We get to do real experiments, which makes learning so much fun.",
                                    author: "Tolu A.",
                                    role: "SS2 Student",
                                    type: "Student"
                                },
                                {
                                    text: "The discipline here is what sets it apart. It prepares you for the real world.",
                                    author: "Dr. Ibrahim",
                                    role: "Parent",
                                    type: "Parent"
                                },
                                {
                                    text: "Being the Head Boy taught me leadership skills that I still use today in university.",
                                    author: "Emeka U.",
                                    role: "Former Head Boy",
                                    type: "Alumni"
                                },
                                {
                                    text: "The extracurricular activities are amazing. From debate club to sports, there's something for everyone.",
                                    author: "Sarah K.",
                                    role: "JSS3 Student",
                                    type: "Student"
                                },
                            ].map((t, i) => (
                                <div key={i} className="break-inside-avoid bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                                    <p className="text-muted-foreground mb-6 leading-relaxed">"{t.text}"</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-foreground">{t.author}</p>
                                            <p className="text-xs text-primary font-medium">{t.role}</p>
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{t.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

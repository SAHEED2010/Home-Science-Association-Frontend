"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS = [
    { time: "08:00 - 08:45", type: "Subject" },
    { time: "08:45 - 09:30", type: "Subject" },
    { time: "09:30 - 10:15", type: "Subject" },
    { time: "10:15 - 10:45", type: "Break" },
    { time: "10:45 - 11:30", type: "Subject" },
    { time: "11:30 - 12:15", type: "Subject" },
    { time: "12:15 - 12:45", type: "Break" },
    { time: "12:45 - 13:30", type: "Subject" },
    { time: "13:30 - 14:00", type: "Subject" }
];

// Mock Schedule - In a real app this would come from an API
const SCHEDULE: any = {
    "Monday": ["Mathematics", "English", "Physics", "Break", "Chemistry", "Biology", "Break", "Geography", "Civic"],
    "Tuesday": ["English", "Mathematics", "Further Math", "Break", "Economics", "Physics", "Break", "Data Proc.", "Biology"],
    "Wednesday": ["Chemistry", "Physics", "Mathematics", "Break", "Agric Sc.", "English", "Break", "Sports", "Sports"],
    "Thursday": ["Biology", "Chemistry", "English", "Break", "Further Math", "Economics", "Break", "Geography", "Mathematics"],
    "Friday": ["Mathematics", "Physics", "Chemistry", "Break", "Civic", "Biology", "Break", "Clubs", "Clubs"]
};

export default function StudentTimetablePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Class Timetable</h1>
                <p className="text-muted-foreground">First Term 2023/2024 Academic Session</p>
            </div>

            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>Primary classroom: SS 2A</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-6 border-b">
                            <div className="p-4 font-bold bg-muted/50 border-r">Time / Day</div>
                            {DAYS.map(day => (
                                <div key={day} className="p-4 font-bold bg-muted/30 text-center border-r last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>
                        {PERIODS.map((period, index) => (
                            <div key={index} className="grid grid-cols-6 border-b last:border-b-0 hover:bg-muted/5 transition-colors">
                                <div className="p-3 text-sm font-medium border-r flex items-center bg-muted/10">
                                    <span className="text-muted-foreground">{period.time}</span>
                                </div>
                                {DAYS.map(day => {
                                    const subject = SCHEDULE[day][index];
                                    const isBreak = subject === "Break";
                                    return (
                                        <div key={day + index} className={`p-3 border-r last:border-r-0 text-center flex items-center justify-center ${isBreak ? 'bg-muted/20' : ''}`}>
                                            {isBreak ? (
                                                <Badge variant="secondary" className="font-normal text-muted-foreground">BREAK</Badge>
                                            ) : (
                                                <div className="font-medium text-sm">{subject}</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

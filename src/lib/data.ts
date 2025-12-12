export const USERS = {
    admin: {
        name: "Dr. Adewale",
        role: "Principal",
        email: "principal@hsa.edu.ng",
        avatar: "/images/avatar-principal.png",
    },
    teacher: {
        name: "Mrs. Okonkwo",
        role: "Teacher",
        email: "t.okonkwo@hsa.edu.ng",
        avatar: "/images/avatar-teacher.png",
        subjects: ["Mathematics", "Physics"],
    },
    student: {
        name: "Chinedu Okafor",
        role: "Student",
        email: "chinedu.o@hsa.edu.ng",
        grade: "SS2",
        avatar: "/images/avatar-student.png",
    },
    parent: {
        name: "Mr. Okafor",
        role: "Parent",
        email: "p.okafor@gmail.com",
        children: ["Chinedu Okafor"],
    },
};

export const KPIS = [
    { label: "Total Students", value: "1,250", change: "+5%", icon: "Users" },
    { label: "Total Teachers", value: "85", change: "0%", icon: "GraduationCap" },
    { label: "Attendance Today", value: "92%", change: "-1%", icon: "CalendarCheck" },
    { label: "Revenue (Term)", value: "₦45.2M", change: "+12%", icon: "Banknote" },
];

export const RECENT_ACTIVITIES = [
    {
        id: 1,
        user: "Mrs. Okonkwo",
        action: "posted an assignment",
        target: "SS2 Mathematics",
        time: "2 hours ago",
    },
    {
        id: 2,
        user: "Admin",
        action: "sent an announcement",
        target: "Mid-Term Break",
        time: "5 hours ago",
    },
    {
        id: 3,
        user: "Chinedu Okafor",
        action: "submitted assignment",
        target: "Physics Lab Report",
        time: "1 day ago",
    },
];

export const CLASSES = [
    { id: "ss1-a", name: "SS1 A", students: 45, teacher: "Mr. Ibrahim" },
    { id: "ss2-b", name: "SS2 B", students: 42, teacher: "Mrs. Okonkwo" },
    { id: "jss3-c", name: "JSS3 C", students: 50, teacher: "Ms. Adebayo" },
];

export const COURSES = [
    { id: "MATH-SS2", title: "Mathematics", class: "SS2", modules: 12, teacher: "Mrs. Okonkwo" },
    { id: "PHY-SS1-3", title: "Physics", class: "SS1-SS3", modules: 10, teacher: "Mr. Ibrahim" },
    { id: "ENG-JSS3", title: "English Language", class: "JSS3", modules: 8, teacher: "Ms. Adebayo" },
    { id: "CHEM-SS2-3", title: "Chemistry", class: "SS2-SS3", modules: 11, teacher: "Dr. Alabi" },
    { id: "BIO-SS1-2", title: "Biology", class: "SS1-SS2", modules: 9, teacher: "Mr. Okafor" },
    { id: "GEOG-JSS1-3", title: "Geography", class: "JSS1-JSS3", modules: 6, teacher: "Mr. Ibrahim" },
];

export const STUDENTS = [
    {
        id: "HSA/2023/001",
        name: "Chinedu Okafor",
        class: "SS2 Science",
        gender: "Male",
        guardian: "Mr. Okafor",
        phone: "08012345678",
        status: "Active",
        fees: "Paid",
    },
    {
        id: "HSA/2023/002",
        name: "Amina Yusuf",
        class: "SS2 Science",
        gender: "Female",
        guardian: "Mrs. Yusuf",
        phone: "08087654321",
        status: "Active",
        fees: "Pending",
    },
    {
        id: "HSA/2023/003",
        name: "David Mark",
        class: "SS1 Art",
        gender: "Male",
        guardian: "Dr. Mark",
        phone: "08055555555",
        status: "Suspended",
        fees: "Paid",
    },
    {
        id: "HSA/2023/004",
        name: "Sarah Johnson",
        class: "JSS3 A",
        gender: "Female",
        guardian: "Mr. Johnson",
        phone: "08099999999",
        status: "Active",
        fees: "Paid",
    },
    {
        id: "HSA/2023/005",
        name: "Ibrahim Musa",
        class: "SS3 Commercial",
        gender: "Male",
        guardian: "Alhaji Musa",
        phone: "07011112222",
        status: "Active",
        fees: "Overdue",
    },
];

export const TEACHERS = [
    {
        id: "T001",
        name: "Mrs. Okonkwo",
        subject: "Mathematics",
        classes: ["SS2 Science", "SS2 Art"],
        phone: "08011112222",
        email: "t.okonkwo@hsa.edu.ng",
        status: "Active",
    },
    {
        id: "T002",
        name: "Mr. Ibrahim",
        subject: "Physics",
        classes: ["SS1 Science", "SS3 Science"],
        phone: "08022223333",
        email: "m.ibrahim@hsa.edu.ng",
        status: "Active",
    },
    {
        id: "T003",
        name: "Ms. Adebayo",
        subject: "English Language",
        classes: ["JSS3 A", "JSS3 B"],
        phone: "08033334444",
        email: "a.adebayo@hsa.edu.ng",
        status: "On Leave",
    },
    {
        id: "T004",
        name: "Dr. Alabi",
        subject: "Chemistry",
        classes: ["SS2 Science", "SS3 Science"],
        phone: "08044445555",
        email: "d.alabi@hsa.edu.ng",
        status: "Active",
    },
    {
        id: "T005",
        name: "Mr. Okafor",
        subject: "Biology",
        classes: ["SS1 Science", "SS2 Science"],
        phone: "08055556666",
        email: "c.okafor@hsa.edu.ng",
        status: "Active",
    },
];

export const EXAMS = [
    { id: 1, title: "First Term Examination 2023/2024", type: "Main Exam", startDate: "2023-12-01", endDate: "2023-12-15", status: "Completed" },
    { id: 2, title: "Mid-Term Test (2nd Term)", type: "Test", startDate: "2024-02-20", endDate: "2024-02-24", status: "Completed" },
    { id: 3, title: "Second Term Examination 2023/2024", type: "Main Exam", startDate: "2024-03-25", endDate: "2024-04-05", status: "Completed" },
    { id: 4, title: "Third Term Examination 2023/2024", type: "Main Exam", startDate: "2024-07-10", endDate: "2024-07-24", status: "Scheduled" },
];

export const GRADES = [
    { studentId: "HSA/2023/001", studentName: "Chinedu Okafor", subject: "Mathematics", score: 85, grade: "A", examId: 3 },
    { studentId: "HSA/2023/001", studentName: "Chinedu Okafor", subject: "English", score: 78, grade: "B", examId: 3 },
    { studentId: "HSA/2023/001", studentName: "Chinedu Okafor", subject: "Physics", score: 92, grade: "A+", examId: 3 },
    { studentId: "HSA/2023/002", studentName: "Amina Yusuf", subject: "Mathematics", score: 65, grade: "C", examId: 3 },
    { studentId: "HSA/2023/002", studentName: "Amina Yusuf", subject: "English", score: 88, grade: "A", examId: 3 },
];

export const PAYMENTS = [
    { id: "INV-001", student: "Chinedu Okafor", amount: "₦150,000", type: "Tuition Fee", date: "2024-01-15", status: "Paid" },
    { id: "INV-002", student: "Amina Yusuf", amount: "₦150,000", type: "Tuition Fee", date: "2024-01-20", status: "Pending" },
    { id: "INV-003", student: "David Mark", amount: "₦25,000", type: "Uniform Fee", date: "2024-02-10", status: "Paid" },
    { id: "INV-004", student: "Sarah Johnson", amount: "₦10,000", type: "Excursion", date: "2024-03-05", status: "Paid" },
    { id: "INV-005", student: "Ibrahim Musa", amount: "₦150,000", type: "Tuition Fee", date: "2024-01-10", status: "Overdue" },
];

export const ANNOUNCEMENTS = [
    { id: 1, title: "Mid-Term Break", content: "The school will be on mid-term break from Feb 22nd to Feb 23rd.", date: "2024-02-15", author: "Principal", audience: "All" },
    { id: 2, title: "PTA Meeting", content: "Parent-Teacher Association meeting scheduled for next Saturday at 10 AM.", date: "2024-03-01", author: "Admin", audience: "Parents" },
    { id: 3, title: "Inter-House Sports", content: "Annual Inter-House Sports competition coming up next month. Get ready!", date: "2024-03-10", author: "Sports Director", audience: "Students" },
    { id: 4, title: "Staff Meeting", content: "Mandatory staff meeting on Monday regarding curriculum updates.", date: "2024-03-15", author: "Principal", audience: "Teachers" },
];

// Temporary mock data for pages not yet migrated to API
export const ATTENDANCE = [
    { id: 1, student: "Chinedu Okafor", date: "2024-12-10", status: "Present", class: "SS2 Science" },
    { id: 2, student: "Amina Yusuf", date: "2024-12-10", status: "Absent", class: "SS2 Science" },
    { id: 3, student: "David Mark", date: "2024-12-10", status: "Late", class: "SS1 Art" },
];

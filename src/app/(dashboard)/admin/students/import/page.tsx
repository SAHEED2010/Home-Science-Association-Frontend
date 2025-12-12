"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Download, FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { bulkImportAPI } from "@/services/api";

export default function BulkImportPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState<any>(null);
    const [importing, setImporting] = useState(false);
    const [importResults, setImportResults] = useState<any>(null);

    const downloadTemplate = () => {
        const csvContent = `name,email,studentId,guardianName,guardianEmail,guardianPhone,gender,dob,address,phone,branch,classId
John Doe,john.doe@student.com,STU-2024-001,Mrs. Jane Doe,jane.doe@parent.com,+234 801 000 0001,Male,2010-05-15,123 Main St,+234 802 000 0001,Main,
Mary Smith,mary.smith@student.com,STU-2024-002,Mr. Tom Smith,tom.smith@parent.com,+234 801 000 0002,Female,2011-03-20,456 Oak Ave,+234 802 000 0002,Main,`;

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student-import-template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const parseCSV = (text: string) => {
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim());
        const students = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const student: any = {};

            headers.forEach((header, index) => {
                student[header] = values[index] || '';
            });

            students.push(student);
        }

        return students;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewData(null);
            setImportResults(null);
        }
    };

    const handlePreview = async () => {
        if (!file) return;

        setLoading(true);
        try {
            const text = await file.text();
            const students = parseCSV(text);

            const response = await bulkImportAPI.preview(students);
            setPreviewData(response.data);
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to preview file');
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async () => {
        if (!previewData || previewData.valid === 0) return;

        setImporting(true);
        try {
            const validStudents = previewData.validStudents.map((s: any) => s.data);
            const response = await bulkImportAPI.execute(validStudents);

            setImportResults(response.data);
            setPreviewData(null);
            setFile(null);
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to import students');
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/students">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Bulk Student Import</h1>
                    <p className="text-muted-foreground">
                        Upload CSV file to create multiple students and parent accounts
                    </p>
                </div>
            </div>

            {/* Instructions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Instructions
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold">CSV Format Requirements:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            <li><strong>Required columns:</strong> name, email, studentId, guardianName, guardianEmail</li>
                            <li><strong>Optional columns:</strong> guardianPhone, gender, dob, address, phone, branch, classId</li>
                            <li>First row must be column headers</li>
                            <li>Email addresses must be unique</li>
                            <li>Student IDs must be unique</li>
                        </ul>
                    </div>
                    <Button onClick={downloadTemplate} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Template
                    </Button>
                </CardContent>
            </Card>

            {/* Upload */}
            {!importResults && (
                <Card>
                    <CardHeader>
                        <CardTitle>Upload CSV File</CardTitle>
                        <CardDescription>Select your CSV file containing student data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                            <Button onClick={handlePreview} disabled={!file || loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Preview
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Preview Results */}
            {previewData && (
                <Card>
                    <CardHeader>
                        <CardTitle>Preview Results</CardTitle>
                        <CardDescription>
                            {previewData.total} records found - {previewData.valid} valid, {previewData.invalid} with errors
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {previewData.invalid > 0 && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
                                <h4 className="font-semibold text-destructive flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Errors Found ({previewData.invalid})
                                </h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {previewData.errors.map((error: any, idx: number) => (
                                        <div key={idx} className="text-sm bg-background p-2 rounded">
                                            <p className="font-medium">Row {error.row}: {error.data.name || 'Unknown'}</p>
                                            <ul className="text-destructive list-disc list-inside">
                                                {error.errors.map((err: string, i: number) => (
                                                    <li key={i}>{err}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {previewData.valid > 0 && (
                            <div className="space-y-2">
                                <h4 className="font-semibold text-green-600 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Valid Students ({previewData.valid})
                                </h4>
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="max-h-80 overflow-y-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-muted">
                                                <tr>
                                                    <th className="p-2 text-left">Name</th>
                                                    <th className="p-2 text-left">Email</th>
                                                    <th className="p-2 text-left">Student ID</th>
                                                    <th className="p-2 text-left">Guardian</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {previewData.validStudents.map((item: any, idx: number) => (
                                                    <tr key={idx} className="border-t">
                                                        <td className="p-2">{item.data.name}</td>
                                                        <td className="p-2">{item.data.email}</td>
                                                        <td className="p-2">{item.data.studentId}</td>
                                                        <td className="p-2">{item.data.guardianName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setPreviewData(null)}>
                                Cancel
                            </Button>
                            {previewData.valid > 0 && (
                                <Button onClick={handleImport} disabled={importing}>
                                    {importing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Importing {previewData.valid} Students...
                                        </>
                                    ) : (
                                        `Import ${previewData.valid} Students`
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Import Results */}
            {importResults && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Import Complete!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-2xl font-bold text-green-700">{importResults.studentsCreated}</p>
                                <p className="text-sm text-green-600">Students Created</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-2xl font-bold text-blue-700">{importResults.parentsCreated}</p>
                                <p className="text-sm text-blue-600">Parents Created</p>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <p className="text-2xl font-bold text-purple-700">{importResults.parentsReused}</p>
                                <p className="text-sm text-purple-600">Parents Reused</p>
                            </div>
                        </div>

                        <div className="bg-primary/10 p-4 rounded-lg">
                            <p className="text-sm">
                                ✓ All students and parents have been created successfully<br />
                                ✓ Login credentials have been sent via email<br />
                                ✓ Parents can now login and view their children
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Link href="/admin/students">
                                <Button>View Students</Button>
                            </Link>
                            <Button variant="outline" onClick={() => {
                                setImportResults(null);
                                setFile(null);
                            }}>
                                Import More
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

import axios from 'axios';

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://home-science-association-backend.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});



// Attendance API
export const attendanceAPI = {
    getAll: (params?: any) => api.get('/attendance', { params }),
    getById: (id: string) => api.get(`/attendance/${id}`),
    create: (data: any) => api.post('/attendance', data),
    update: (id: string, data: any) => api.put(`/attendance/${id}`, data),
    delete: (id: string) => api.delete(`/attendance/${id}`),
    getStats: (studentId: string, params?: any) => api.get(`/attendance/stats/${studentId}`, { params }),
    bulkCreate: (records: any[]) => api.post('/attendance/bulk', { records }),
};

// Students API
export const studentsAPI = {
    getAll: () => api.get('/students'),
    getById: (id: string) => api.get(`/students/${id}`),
    create: (data: any) => api.post('/students', data),
    update: (id: string, data: any) => api.put(`/students/${id}`, data),
    delete: (id: string) => api.delete(`/students/${id}`),
};

// Teachers API
export const teachersAPI = {
    getAll: () => api.get('/teachers'),
    getById: (id: string) => api.get(`/teachers/${id}`),
    create: (data: any) => api.post('/teachers', data),
    update: (id: string, data: any) => api.put(`/teachers/${id}`, data),
    delete: (id: string) => api.delete(`/teachers/${id}`),
};

// Classes API
export const classesAPI = {
    getAll: () => api.get('/classes'),
    getById: (id: string) => api.get(`/classes/${id}`),
    create: (data: any) => api.post('/classes', data),
    update: (id: string, data: any) => api.put(`/classes/${id}`, data),
    delete: (id: string) => api.delete(`/classes/${id}`),
};

// Exams API
export const examsAPI = {
    getAll: (params?: any) => api.get('/exams', { params }),
    getById: (id: string) => api.get(`/exams/${id}`),
    create: (data: any) => api.post('/exams', data),
    update: (id: string, data: any) => api.put(`/exams/${id}`, data),
    delete: (id: string) => api.delete(`/exams/${id}`),
};

// Results API
export const resultsAPI = {
    getAll: (params?: any) => api.get('/results', { params }),
    getById: (id: string) => api.get(`/results/${id}`),
    create: (data: any) => api.post('/results', data),
    update: (id: string, data: any) => api.put(`/results/${id}`, data),
    delete: (id: string) => api.delete(`/results/${id}`),
    recordBulk: (data: any) => api.post('/results/bulk', data),
};

// Payments API
export const paymentsAPI = {
    getAll: (params?: any) => api.get('/payments', { params }),
    getById: (id: string) => api.get(`/payments/${id}`),
    create: (data: any) => api.post('/payments', data),
    update: (id: string, data: any) => api.put(`/payments/${id}`, data),
    delete: (id: string) => api.delete(`/payments/${id}`),
};

// Announcements API
export const announcementsAPI = {
    getAll: (params?: any) => api.get('/announcements', { params }),
    getById: (id: string) => api.get(`/announcements/${id}`),
    create: (data: any) => api.post('/announcements', data),
    update: (id: string, data: any) => api.put(`/announcements/${id}`, data),
    delete: (id: string) => api.delete(`/announcements/${id}`),
};

// Courses API
export const coursesAPI = {
    getAll: () => api.get('/courses'),
    getById: (id: string) => api.get(`/courses/${id}`),
    create: (data: any) => api.post('/courses', data),
    update: (id: string, data: any) => api.put(`/courses/${id}`, data),
    delete: (id: string) => api.delete(`/courses/${id}`),
};

// Parent API
export const parentAPI = {
    getDashboard: () => api.get('/parent/dashboard'),
    getChildDetails: (childId: string) => api.get(`/parent/children/${childId}`),
    getChildAttendance: (childId: string) => api.get(`/parent/children/${childId}/attendance`),
    getChildGrades: (childId: string) => api.get(`/parent/children/${childId}/grades`),
    getChildFees: (childId: string) => api.get(`/parent/children/${childId}/fees`),
};

// Bulk Import API
export const bulkImportAPI = {
    preview: (students: any[]) => api.post('/bulk-import/preview', { students }),
    execute: (students: any[]) => api.post('/bulk-import/execute', { students }),
};

// Auth API
export const authAPI = {
    login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials),
    register: (userData: any) => api.post('/auth/register', userData),
    forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token: string, password: string) => api.post('/auth/reset-password', { token, password }),
    generate2FA: () => api.post('/auth/2fa/generate'),
    verify2FA: (data: { token: string }) => api.post('/auth/2fa/verify', data),
};

// Assignments API
export const assignmentsAPI = {
    getAll: (params?: any) => api.get('/assignments', { params }),
    getById: (id: string) => api.get(`/assignments/${id}`),
    create: (data: any) => api.post('/assignments', data),
    update: (id: string, data: any) => api.put(`/assignments/${id}`, data),
    delete: (id: string) => api.delete(`/assignments/${id}`),
};

// Resources API
export const resourcesAPI = {
    getAll: (params?: any) => api.get('/resources', { params }),
    getById: (id: string) => api.get(`/resources/${id}`),
    create: (data: FormData) => api.post('/resources', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id: string) => api.delete(`/resources/${id}`),
};

// Student Dashboard API
export const studentAPI = {
    getDashboard: () => api.get('/students/dashboard'),
};

// Analytics API
export const analyticsAPI = {
    getAdminStats: () => api.get('/analytics/admin'),
};

export default api;

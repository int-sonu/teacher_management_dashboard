import axios from 'axios';
import type { Teacher, TeacherFormData } from '../types/teacher';

const API_BASE_URL = '/api';

const teacherApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTeachers = () => teacherApi.get<Teacher[]>('/Teachers');
export const getTeacherById = (id: number) => teacherApi.get<Teacher>(`/Teachers/${id}`);
export const createTeacher = (data: TeacherFormData) => teacherApi.post<Teacher>('/Teachers', data);
export const updateTeacher = (id: number, data: TeacherFormData) => teacherApi.put<Teacher>(`/Teachers/${id}`, data);
export const deleteTeacher = (id: number) => teacherApi.delete(`/Teachers/${id}`);

export default teacherApi;

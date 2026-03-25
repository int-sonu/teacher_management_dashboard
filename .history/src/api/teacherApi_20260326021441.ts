import axios from 'axios';
import type { Teacher, TeacherFormData } from '../types/teacher';

const API_BASE_URL = '/api';

const teacherApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET all (Swagger may return $values)
export const getTeachers = () => teacherApi.get<any>('/Teachers');

// GET by id
export const getTeacherById = (id: number) =>
  teacherApi.get<Teacher>(`/Teachers/${id}`);

// POST
export const createTeacher = (data: TeacherFormData) =>
  teacherApi.post<Teacher>('/Teachers', data);

// PUT (no response body)
export const updateTeacher = (id: number, data: TeacherFormData) =>
  teacherApi.put(`/Teachers/${id}`, data);

// DELETE
export const deleteTeacher = (id: number) =>
  teacherApi.delete(`/Teachers/${id}`);

export default teacherApi;
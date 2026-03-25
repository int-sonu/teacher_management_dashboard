import client from "./axiosClient";
import type { Teacher, TeacherFormData } from "../types/teacher";

export const getTeachers = async (): Promise<Teacher[]> => {
  const res = await client.get(`/Teachers`);
  return res.data;
};

export const getTeacherById = async (id: number): Promise<Teacher> => {
  const res = await client.get(`/Teachers/${id}`);
  return res.data;
};

export const createTeacher = async (data: TeacherFormData): Promise<Teacher> => {
  const res = await client.post(`/Teachers`, data);
  return res.data;
};

export const updateTeacher = async (id: number, data: TeacherFormData): Promise<Teacher> => {
  const res = await client.put(`/Teachers/${id}`, data);
  return res.data;
};

export const deleteTeacherApi = async (id: number): Promise<number> => {
  await client.delete(`/Teachers/${id}`);
  return id;
};
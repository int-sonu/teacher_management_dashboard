import axios from "axios";

const API_URL = "/api"; // 🔥 FIXED

export const getTeachers = async () => {
  const res = await axios.get(`${API_URL}/Teachers`);
  return res.data;
};

export const getTeacherById = async (id: number) => {
  const res = await axios.get(`${API_URL}/Teachers/${id}`);
  return res.data;
};

export const createTeacher = async (data: any) => {
  const res = await axios.post(`${API_URL}/Teachers`, data);
  return res.data;
};

export const updateTeacher = async (id: number, data: any) => {
  const res = await axios.put(`${API_URL}/Teachers/${id}`, data);
  return res.data;
};

export const deleteTeacherApi = async (id: number) => {
  await axios.delete(`${API_URL}/Teachers/${id}`);
  return id;
};
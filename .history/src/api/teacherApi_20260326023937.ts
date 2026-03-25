import axios from "axios";

const API_URL = "/api";

// GET ALL
export const getTeachers = async () => {
  const res = await axios.get(`${API_URL}/Teachers`);
  return res.data;
};

// 🔥 GET BY ID (ADDED)
export const getTeacherById = async (id: number) => {
  const res = await axios.get(`${API_URL}/Teachers/${id}`);
  return res.data;
};

// ADD
export const createTeacher = async (data: any) => {
  const res = await axios.post(`${API_URL}/Teachers`, data);
  return res.data;
};

// UPDATE
export const updateTeacher = async (id: number, data: any) => {
  const res = await axios.put(`${API_URL}/Teachers/${id}`, data);
  return res.data;
};

// DELETE
export const deleteTeacherApi = async (id: number) => {
  await axios.delete(`${API_URL}/Teachers/${id}`);
  return id;
};
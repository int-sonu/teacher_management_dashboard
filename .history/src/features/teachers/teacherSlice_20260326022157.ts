import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/teacherApi";

export interface Teacher {
  id: number;
  name: string;
  subject: string;
}

interface TeacherState {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  teachers: [],
  selectedTeacher: null,
  loading: false,
  error: null,
};

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async () => await api.getTeachers()
);

export const fetchTeacherById = createAsyncThunk(
  "teachers/fetchById",
  async (id: number) => await api.getTeacherById(id)
);

export const addTeacher = createAsyncThunk(
  "teachers/add",
  async (data: Teacher) => await api.createTeacher(data)
);

export const updateTeacher = createAsyncThunk(
  "teachers/update",
  async ({ id, data }: { id: number; data: Teacher }) =>
    await api.updateTeacher(id, data)
);

export const deleteTeacher = createAsyncThunk(
  "teachers/delete",
  async (id: number) => await api.deleteTeacherApi(id)
);

// 🔥 Slice
const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })

      // ADD
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })

      // UPDATE
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) state.teachers[index] = action.payload;
      })

      // DELETE
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(
          (t) => t.id !== action.payload
        );
      })

      // DETAILS
      .addCase(fetchTeacherById.fulfilled, (state, action) => {
        state.selectedTeacher = action.payload;
      });
  },
});

export default teacherSlice.reducer;
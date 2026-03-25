import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../api/teacherApi';
import type { Teacher, TeacherState, TeacherFormData } from '../../types/teacher';

const initialState: TeacherState = {
  teachers: [],
  selectedTeacher: null,
  loading: false,
  error: null,
  status: 'idle',
};

// ✅ FETCH ALL
export const fetchTeachers = createAsyncThunk('teachers/fetchAll', async () => {
  const response = await api.getTeachers();
  return response.data.value || [];
});

// ✅ FETCH BY ID
export const fetchTeacherById = createAsyncThunk(
  'teachers/fetchById',
  async (id: number) => {
    const response = await api.getTeacherById(id);
    return response.data;
  }
);

// ✅ ADD
export const addTeacher = createAsyncThunk(
  'teachers/add',
  async (data: TeacherFormData) => {
    const response = await api.createTeacher(data);
    return response.data;
  }
);

// ✅ UPDATE (🔥 FIX HERE)
export const updateTeacher = createAsyncThunk(
  'teachers/update',
  async ({ id, data }: { id: number; data: TeacherFormData }) => {
    await api.updateTeacher(id, data);

    // 🔥 RETURN MANUAL DATA (VERY IMPORTANT)
    return { id, ...data };
  }
);

// ✅ DELETE
export const deleteTeacher = createAsyncThunk(
  'teachers/delete',
  async (id: number) => {
    await api.deleteTeacher(id);
    return id;
  }
);

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    clearTeacherError: (state) => {
      state.error = null;
    },
    selectTeacher: (state, action: PayloadAction<Teacher | null>) => {
      state.selectedTeacher = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchTeachers.fulfilled, (state, action: PayloadAction<Teacher[]>) => {
        state.loading = false;
        state.status = 'succeeded';
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch teachers';
      })

      // FETCH BY ID
      .addCase(fetchTeacherById.fulfilled, (state, action: PayloadAction<Teacher>) => {
        state.selectedTeacher = action.payload;
      })

      // ADD
      .addCase(addTeacher.fulfilled, (state, action: PayloadAction<Teacher>) => {
        state.teachers.push(action.payload);
      })

      // UPDATE (🔥 FIXED)
      .addCase(updateTeacher.fulfilled, (state, action: PayloadAction<Teacher>) => {
        const index = state.teachers.findIndex(
          (t) => t.id === action.payload.id
        );

        if (index !== -1) {
          state.teachers[index] = {
            ...state.teachers[index],
            ...action.payload,
          };
        }
      })

      // DELETE
      .addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<number>) => {
        state.teachers = state.teachers.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export const { clearTeacherError, selectTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
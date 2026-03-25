export interface Teacher {
  id: number;
  name: string;
  subject: string;
  email?: string;
  phone?: string;
  address?: string;
  age?: number;
  joiningDate?: string;
}

export interface TeacherFormData {
  name: string;
  subject: string;
  email?: string;
  phone?: string;
  address?: string;
  age?: number;
}

export interface TeacherState {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

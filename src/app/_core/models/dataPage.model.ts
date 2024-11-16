import { Student } from "./Student";

export interface DataPage {
	filter: string;
	studentsGrades: Student[];
	selectedStudent: Student | null;
  isNewRow: boolean;
}



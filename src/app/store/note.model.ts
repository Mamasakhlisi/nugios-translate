import { IObjProperties } from "./note.interfaces";

export interface NoteStateModel {
    files: IObjProperties;
    activeFile: string;
}
export interface dataModel {
  id?: number;
  code?: string;
  name?: string;
  note?: string;
}
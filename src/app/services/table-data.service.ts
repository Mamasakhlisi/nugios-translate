import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetJsonData } from '../store/note.actions';
import {
  IObjUnknownProperties,
  ISortedDataWithTable,
} from '../store/note.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  selectedFile?: File;
  sortedDataWithTable: ISortedDataWithTable[] = [];
  constructor(private store: Store) {
  }

  setSelectedFile(event: Event, name: string, createNew: boolean) {
    this.selectedFile = (event.target as HTMLInputElement).files?.[0];
    if (!this.selectedFile) {
      return;
    }
    const fileName = this.selectedFile.name.split('.')[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      const flattenObject = (obj: IObjUnknownProperties, prefix = '') =>
        Object.keys(obj).reduce((acc: IObjUnknownProperties, k: string) => {
          const pre = prefix.length ? `${prefix}.` : '';
          if (
            typeof obj[k] === 'object' &&
            obj[k] !== null &&
            Object.keys(obj[k]).length > 0
          )
            Object.assign(acc, flattenObject(obj[k], pre + k));
          else acc[pre + k] = obj[k];
          return acc;
        }, {});
      try {
        Object.entries(
          flattenObject(JSON.parse(<string>fileReader.result))
        ).map((item) =>
          this.sortedDataWithTable.push({ key: item[0], value: item[1] })
        );
        this.store
        .dispatch(
          new SetJsonData(this.sortedDataWithTable, createNew ? name : fileName)
        )
        .subscribe(() => (this.sortedDataWithTable = []));
      } catch {
        alert('Error: Invalid JSON Format')
        return false;
      }
      return true;
    };

    fileReader.onerror = (error) => {
      alert('error');
      console.log(error);
    };
  }
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TableDataService } from 'src/app/services/table-data.service';
import {
  EditRow,
  GenerateObjects,
  SetCreatedJsonData,
} from 'src/app/store/note.actions';
import {
  IObjProperties,
  ISortedDataWithTable,
} from 'src/app/store/note.interfaces';
import { dataModel } from 'src/app/store/note.model';
import { NoteState } from 'src/app/store/note.state';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-trt-table',
  templateUrl: './trt-table.component.html',
  styleUrls: ['./trt-table.component.css'],
})
export class TrtTableComponent implements OnInit, OnDestroy {
  @Select(NoteState.files_data) files$?: Observable<IObjProperties>;
  @ViewChild(Table) private dataTable: any;
  jsonName = new FormControl('');
  editRow: string = '';
  files: ISortedDataWithTable[] = [];
  filesKeys: string[] = [];
  fileName: string = '';
  createNew: boolean = false;
  private subs: Subscription[] = [];

  constructor(private store: Store, private tableService: TableDataService) {
    if (this.files$) {
      const sub1 = this.files$.subscribe((data) => {
        return (this.files = data[this.fileName]);
      });
      this.subs.push(sub1);
    }
  }

  ngOnInit(): void {
    this.getFileKeys();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  getFileKeys() {
    if (this.files$) {
      const sub3 = this.files$?.subscribe(
        (x) => (this.filesKeys = Object.keys(x))
      );
      this.subs.push(sub3);
    }
  }
  setFileDataForTable(name: string) {
    this.fileName = name;
    if (this.files$) {
      const sub2 = this.files$?.subscribe((data) => {
        return (this.files = data[name]);
      });
      this.subs.push(sub2);
    }
  }
  onCreateNew() {
    this.createNew = !this.createNew;
  }
  public onRowEditInit(data: string) {
    this.dataTable.editingRowKeys = { [data]: true };
  }

  onRowEditSave(key: string) {
    this.store.dispatch(new EditRow(key,this.jsonName.value,this.fileName))
    this.jsonName.setValue('')
  }

  onFileNameChange(event: Event) {
    this.fileName = (event.target as HTMLInputElement).value;
  }
  generateObjects() {
    this.store.dispatch(new GenerateObjects());
  }
  createObjects() {
    this.store.dispatch(new SetCreatedJsonData(this.fileName));
  }
  onFileChanged(event: Event) {
    this.tableService.setSelectedFile(event, this.fileName, this.createNew);
  }
}

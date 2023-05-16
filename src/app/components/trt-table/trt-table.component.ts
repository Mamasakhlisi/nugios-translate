import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TableDataService } from 'src/app/services/table-data.service';
import { EditRow, SetCreatedJsonData } from 'src/app/store/note.actions';
import {
  IObjProperties,
  ISortedDataWithTable,
} from 'src/app/store/note.interfaces';
import { NoteState } from 'src/app/store/note.state';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-trt-table',
  templateUrl: './trt-table.component.html',
  styleUrls: ['./trt-table.component.css'],
})
export class TrtTableComponent implements OnInit, OnDestroy {
  @Input() darkMode: boolean = true;
  @Select(NoteState.files_data) files$?: Observable<IObjProperties>;
  @Select(NoteState.active_file) activeFile$?: Observable<string>;
  @ViewChild(Table) private dataTable!: Table;
  @ViewChild('table') table: Table | undefined;
  jsonName = new FormControl('');
  files: ISortedDataWithTable[] = [];
  filesKeys: string[] = [];
  fileName: string = '';
  createNew: boolean = false;

  private subs: Subscription[] = [];

  constructor(private store: Store, private tableService: TableDataService) {}

  ngOnInit(): void {
    // Get data with filename
    if (this.activeFile$) {
      const sub1 = this.activeFile$?.subscribe((x) =>
        this.files$?.subscribe((data) => {
          return (this.files = data[this.fileName]);
        })
      );
      this.subs.push(sub1);
    }

    this.getFileKeys();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.table!.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }
  // Get stored files object keys {ka: [],....} = ka ...
  getFileKeys() {
    if (this.files$) {
      const sub3 = this.files$?.subscribe(
        (x) => (this.filesKeys = Object.keys(x))
      );
      this.subs.push(sub3);
    }
  }

  // Files tab Changer
  setFileDataForTable(name: string) {
    this.fileName = name;
    if (this.files$) {
      const sub2 = this.files$?.subscribe((data) => {
        return (this.files = data[name]);
      });
      this.subs.push(sub2);
    }
  }

  // Checkbox of create file
  onCreateNew() {
    this.createNew = !this.createNew;
  }

  // row edit
  public onRowEditInit(data: string) {
    this.dataTable.editingRowKeys = { [data]: true };
  }

  // row save
  onRowEditSave(key: string) {
    this.store.dispatch(new EditRow(key, this.jsonName.value, this.fileName));
    this.jsonName.reset();
  }

  // row edit cancel
  onRowEditCancel() {
    this.jsonName.reset();
  }
  // file value changer
  onFileNameChange(event: Event) {
    this.fileName = (event.target as HTMLInputElement).value;
    (event.target as HTMLInputElement).value = '';
  }

  // Create new empty file submit
  createObjects() {
    this.store.dispatch(new SetCreatedJsonData(this.fileName));
    const subActiveFilee = this.activeFile$?.subscribe((x) => {
      this.fileName = x;
    });
    if (subActiveFilee) {
      this.subs.push(subActiveFilee);
    }
  }

  // Json select handler
  onFileChanged(event: Event) {
    this.tableService.setSelectedFile(event, this.fileName, this.createNew);
    const subActiveFile = this.activeFile$?.subscribe(
      (x) => (this.fileName = x)
    );
    if (subActiveFile) {
      this.subs.push(subActiveFile);
    }
  }

  clear(table: Table) {
    table.clear();
  }
}

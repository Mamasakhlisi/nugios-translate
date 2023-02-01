import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TableDataService } from 'src/app/services/table-data.service';
import {
  IObjProperties,
  IObjUnknownProperties,
  ISortedDataWithTable,
} from 'src/app/store/note.interfaces';
import { NoteState } from 'src/app/store/note.state';

@Component({
  selector: 'app-trt-table-create-item',
  templateUrl: './trt-table-create-item.component.html',
  styleUrls: ['./trt-table-create-item.component.css'],
})
export class TrtTableCreateItemComponent {
  @Select(NoteState.files_data) files$?: Observable<IObjProperties>;
  file: any;
  sortedDataWithTable: ISortedDataWithTable[] = [];
  constructor(private tableService: TableDataService, private store: Store) {
  }

  getFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files?.[0];
  }

  onFileChanged(event: Event) {
    //  this.tableService.setSelectedFile(event,name)
  }
  download() {
    var dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({}));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem?.setAttribute('href', dataStr);
    dlAnchorElem?.setAttribute('download', 'scene.json');
  }
  downloadJson() {
    const unflattenObject = (obj: IObjUnknownProperties) =>
      Object.keys(obj).reduce((res, k) => {
        k.split('.').reduce(
          (acc: { [key: string]: string }, e: string, i: number, keys) =>
            acc[e] ||
            (acc[e] = isNaN(Number(keys[i + 1]))
              ? keys.length - 1 === i
                ? obj[k]
                : {}
              : []),
          res
        );
        return res;
      }, {});

    this.store.subscribe((x) =>
      console.log(
        unflattenObject(
          x.note.files['en'].reduce(
            (a: any, v: any) => ({ ...a, [v.key]: v.value }),
            {}
          )
        )
      )
    );
  }
}

import { Component, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  IObjProperties,
  ISortedDataWithTable,
} from 'src/app/store/note.interfaces';
import { NoteState } from 'src/app/store/note.state';

@Component({
  selector: 'app-trt-data-download',
  templateUrl: './trt-data-download.component.html',
  styleUrls: ['./trt-data-download.component.css'],
})
export class TrtDataDownloadComponent {
  @Input() fileName: string = '';
  @Select(NoteState.files_data) files$?: Observable<IObjProperties>;
  constructor(private store: Store) {}

  downloadJson() {
    const unflattenObject = (obj: any) =>
      Object.keys(obj).reduce((res, k: string) => {
        console.log(obj)

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

    this.store.subscribe((x) => {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(
          JSON.stringify(
            unflattenObject(
              x.note.files[this.fileName].reduce(
                (a: IObjProperties, v: ISortedDataWithTable) => ({
                  ...a,
                  [v.key as keyof ISortedDataWithTable]: v.value,
                }),
                {}
              )
            )
          )
        );
      const dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem?.setAttribute('href', dataStr);
      dlAnchorElem?.setAttribute('download', `${this.fileName}.json`);
    });
  }
}

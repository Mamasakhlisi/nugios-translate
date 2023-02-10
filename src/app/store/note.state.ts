import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SetJsonData,
  GenerateObjects,
  SetCreatedJsonData,
  EditRow,
} from './note.actions';
import { NoteStateModel } from './note.model';
import { ISortedDataWithTable } from './note.interfaces';

@State<NoteStateModel>({
  name: 'note',
  defaults: {
    files: {},
    activeFile: '',
  },
})
@Injectable()
export class NoteState {
  constructor() {}

  // Actions

  @Action(EditRow)
  EditRow(ctx: StateContext<NoteStateModel>, { key, value, lang }: EditRow) {
    const state = ctx.getState();
    const changedFile = state.files[lang].map((item) => {
      return (item.value =
        item.key === key
          ? { key: item.key, value: value }
          : { key: item.key, value: item.value });
    });
    ctx.setState({
      ...state,
      files: { ...state.files, [lang]: changedFile },
      activeFile: lang,
    });
  }

  @Action(SetCreatedJsonData)
  SetCreatedJsonData(
    ctx: StateContext<NoteStateModel>,
    { lang }: SetCreatedJsonData
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      files: { ...state.files, [lang]: [] },
      activeFile: lang,
    });
    ctx.dispatch(new GenerateObjects());
  }

  @Action(SetJsonData)
  SetJsonData(ctx: StateContext<NoteStateModel>, { data, lang }: SetJsonData) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      files: { ...state.files, [lang]: data },
      activeFile: lang,
    });
    ctx.dispatch(new GenerateObjects());
  }

  @Action(GenerateObjects)
  GenerateObjects(ctx: StateContext<NoteStateModel>) {
    const state = ctx.getState();
    const transformFiles = (files: any) => {
      const props = Object.keys(files);
      const newdData: any = [];

      props.forEach((prop) => {
        // all file name
        const fileNames = props.filter((x) => x !== prop);
        // ვიღებთ ყველა პროპის მნიშვნელობებს გარდა მიმდინარე პროპს
        const values = fileNames.reduce(
          (a: string[], c) => a.concat(files[c]),
          []
        );
        //  ვფილტრავთ ყველა მნიშვნელობა რომელიც არ არის მიმდინარე პროპის მნიშვნელობებში და ვამატებთ მიმდინარე პროპის მნიშვნელობებს
        const newValue: ISortedDataWithTable[] = values
          .filter((x: any) => {
            return !files[prop].some((y: any) => y.key === x.key);
          })
          .map((x: any) => {
            return { ...x, value: '' };
          })
          .concat(files[prop]);
        const result: ISortedDataWithTable[] = newValue.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t.key === thing.key)
        );
        newdData.push(result);
      });

      return props.reduce((a, c, i) => ({ ...a, [c]: newdData[i] }), {});
    };
    ctx.patchState({
      files: transformFiles(state.files),
    });
  }
  // Selectors

  @Selector([NoteState])
  static files_data(state: NoteStateModel): NoteStateModel['files'] {
    return state.files;
  }

  @Selector([NoteState])
  static active_file(state: NoteStateModel): NoteStateModel['activeFile'] {
    return state.activeFile;
  }
}

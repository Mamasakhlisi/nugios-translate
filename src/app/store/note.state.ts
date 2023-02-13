import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SetJsonData,
  GenerateObjects,
  SetCreatedJsonData,
  EditRow,
} from './note.actions';
import { NoteStateModel } from './note.model';
import { ISortedDataWithTable, LoadedFile } from './note.interfaces';
import { IsActiveMatchOptions } from '@angular/router';

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
    const found = state.files[lang].find(it=>it.key === key);
    if(found){
      found.value = value;
    }
    ctx.setState({
      ...state,
      files: { ...state.files},
      activeFile: lang,
    });
    
    // const changedFile = state.files[lang].map((item) => {
    //   console.log(item)
    //   return (
    //     item.key === key
    //       ? { key: item.key, value: value }
    //       : { key: item.key, value: item.value });
    // });
    
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
    const transformFiles = (files: LoadedFile) => {
      const props = Object.keys(files);
      const newdData: ISortedDataWithTable[][] = [];
      
      props.forEach((prop: string) => {
        // all file name
        const fileNames = props.filter((x) => x !== prop);
        // ვიღებთ ყველა პროპის მნიშვნელობებს გარდა მიმდინარე პროპს
        const values = fileNames.reduce(
          (a: ISortedDataWithTable[], c) => a.concat(files[c as keyof LoadedFile]),
          []
        );
        //  ვფილტრავთ ყველა მნიშვნელობა რომელიც არ არის მიმდინარე პროპის მნიშვნელობებში და ვამატებთ მიმდინარე პროპის მნიშვნელობებს
        const newValue: ISortedDataWithTable[] = values
          .filter((x: ISortedDataWithTable) => {
            return !files[prop as keyof LoadedFile].some((y: ISortedDataWithTable) => y.key === x.key);
          })
          .map((x: ISortedDataWithTable) => {
            return { ...x, value: '' } as ISortedDataWithTable;
          })
          .concat(files[prop as keyof LoadedFile]);
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

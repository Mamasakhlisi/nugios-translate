import { ISortedDataWithTable } from './note.interfaces';

export class SetJsonData {
  static readonly type = '[JSON] SET JSON DATA';
  constructor(public data: ISortedDataWithTable[], public lang: string) {}
}

export class SetCreatedJsonData {
  static readonly type = '[JSON] SET CREATED JSON DATA';
  constructor(public lang: string) {}
}

export class EditRow {
  static readonly type = "[JSON] EDIT ROW"
  constructor(public key: string, public value: string | null, public lang: string) {}
}
export class GenerateObjects {
  static readonly type = '[NOTE] Generate json data';
}

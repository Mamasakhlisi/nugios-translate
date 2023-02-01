export interface ISelectedFile {
    lastModified?: number;
    lastModifiedDate? : Date;
    webkitRelativePath?: string;
    name?: string;
    size?: number;
    type?: string;
}

export interface ISortedDataWithTable {
    key?: string| null ;
    value?: string | unknown | null;
}

export interface IObjProperties {
    [key: string] : ISortedDataWithTable[];
}

export interface IObjUnknownProperties {
    [key: string]: any;
}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {RippleModule} from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import {CheckboxModule} from 'primeng/checkbox';

import { AppComponent } from './app.component';
import { TrtTableComponent } from './components/trt-table/trt-table.component';
import { TrtTableCreateItemComponent } from './components/trt-table-create-item/trt-table-create-item.component';
import {NgxsModule} from '@ngxs/store'
import { NoteState } from './store/note.state';

@NgModule({
  declarations: [
    AppComponent,
    TrtTableComponent,
    TrtTableCreateItemComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    RadioButtonModule,
    FileUploadModule,
    CheckboxModule,
    NgxsModule.forRoot([NoteState])
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

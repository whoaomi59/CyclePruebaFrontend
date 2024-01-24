import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* Elementoos de PrimeNG */
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';

@NgModule({
    exports:[
        ButtonModule,
        CardModule,
        ConfirmDialogModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        InputNumberModule,
        MenuModule,
        ProgressSpinnerModule,
        SelectButtonModule,
        RadioButtonModule,
        TableModule,
        ToolbarModule,
        ToastModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimeNgModule { }
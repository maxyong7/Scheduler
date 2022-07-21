import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';








const material = [
  MatDialogModule,
  MatIconModule,
  FormsModule,
  MatButtonModule,
  MatTableModule,
  MatCardModule,
  MatDividerModule,
  ScrollingModule,
  MatInputModule,
  MatSelectModule,
  NgxMaterialTimepickerModule,
  MatSnackBarModule,
  MatSliderModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { OverlayModule } from "@angular/cdk/overlay";

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss'],
  standalone: true,
  imports: [MatButtonModule, OverlayModule]
})
export class GetConfirmComponent implements OnInit {
  msg !: string


  constructor(
     private _matDialogRef : MatDialogRef<GetConfirmComponent> ,
      @Inject(MAT_DIALOG_DATA) data:string) {
      
   }

  ngOnInit(): void {
  }

  onClose(flag : boolean){
    this._matDialogRef.close(flag)
  }
}

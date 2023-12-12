import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-help',
  templateUrl: './dialog-help.component.html',
  styleUrls: ['./dialog-help.component.scss']
})
export class DialogHelpComponent implements OnInit {

  pdfUrl: any = "";
  videoUrl: any = "";

  constructor(
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.pdfUrl =  this.sanitizer.bypassSecurityTrustResourceUrl("/assets/" + this.data + ".pdf")
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("/assets/" + this.data + ".mp4")
  }

}

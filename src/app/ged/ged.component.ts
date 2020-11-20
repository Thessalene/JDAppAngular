import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { finalize } from 'rxjs/operators';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-ged',
  templateUrl: './ged.component.html',
  styleUrls: ['./ged.component.scss']
})
export class GedComponent implements OnInit {

  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  myDropzone;

  constructor( @Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService) { }
  
  ngOnInit() {
    
  }

  config: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFiles: 10,
    clickable: true,
    acceptedFiles: 'application/pdf',
    createImageThumbnails: true,
    
  }

  onUploadSuccess(event : Event){
    console.log("SUCCESS");
  }

  onUploadError(event : Event){
    console.log("ERROR");
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  save() {
   // var name = this.selectedImage.name;
    console.log("ID " + this.id);
    const fileRef = this.storage.ref("factures/" + name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.fileService.insertImageDetails(this.id,this.url);
          alert('Upload Successful');
        })
      })
    ).subscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileService } from 'src/app/services/file.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  //Form
  uploadForm: FormGroup;
  selectedImage: any = null;
  url: string | ArrayBuffer;
  id:string;
  file:string;

  selectedOption:string;
  typeSelected2:string;
  selectedOption2:string;
  radioSelected:string;

  doctype = [
    "Facture fournisseur",
    "Facture client",
    "Devis",
    "Bon de commande",
    "Bon de livraison",
    "Salarié",
    "Autres",
  ];

  fournisseurs = [
    "Fournisseur 1",
    "Fournisseur 2",
    "Fournisseur 3",
    "Fournisseur 4"
  ];

  clients = [
    "Client 1",
    "Client 2",
    "Client 3",
    "Client 4"
  ];

  salaries = [
    "Salarié 1",
    "Salarié 2",
    "Salarié 3",
    "Salarié 4"
  ];
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private fileService: FileService) { }

  ngOnInit(): void {
    this.initForm();
    this.fileService.getImageDetailList();
  }

  initForm() {
    this.uploadForm = new FormGroup({
      'doctype': new FormControl(null, Validators.required),
      'doctype_detailed': new FormControl(null), //client, fournisseur ou employé
      'docDate': new FormControl(null, Validators.required),
      'montant_tva': new FormControl(),
      'montant_ttc': new FormControl(),
      'exampleRadios': new FormControl(),

})}

onSubmit(){

}

  onSelectDocType(){
    this.selectedOption= this.uploadForm.value.doctype;
  }

  onSelectCFType(){
    this.typeSelected2=this.selectedOption2;
  }

  onItemChange(value){
    this.radioSelected= value.target.value;

 }
  

  showPreview(event: any) {
    console.log("SHOW PREVIEW ");
    this.selectedImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  save() {
    var name = this.selectedImage.name;
    console.log("Save name : " + name);
    /*const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          console.log("Download url : " + this.url);
          this.fileService.insertImageDetails(this.id,this.url); //insert into realtime database
          this.savetoFirestore();
          alert('Upload Successful');
        })
      })
    ).subscribe();*/
  }

  savetoFirestore() {
    this.firestore.collection('TestCollection').add({
      id: this.id,
      name : this.selectedImage.name,
      field: this.url
    })
      .then(res => {
        console.log("Response : " + JSON.stringify(res));
      })
      .catch(e => {
        console.log("Response (error): " + JSON.stringify(e));
      })
  }

}

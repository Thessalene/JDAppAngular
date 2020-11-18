import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileService } from 'src/app/services/file.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { DatePipe } from '@angular/common';
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
  id: string;
  file: string;
  selectedOption: string;
  myDate: string;

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

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.initForm();
    this.selectedOption = this.doctype[0];
  }

  initForm() {
    this.uploadForm = new FormGroup({
      'doc_type': new FormControl(null, Validators.required),
      'doc_number': new FormControl(null, Validators.required),
      'doc_type_detailed': new FormControl(null), //client, fournisseur ou employé
      'docDate': new FormControl(null, Validators.required),
      'montant_tva': new FormControl(),
      'montant_ttc': new FormControl(),
      'exampleRadios': new FormControl(null, Validators.required),

    })
  }

  onSubmit() {
    console.log(this.uploadForm.value)
  }

  onSelectDocType() {
    this.selectedOption = this.uploadForm.value.doc_type;
    this.uploadForm.setValue({ doc_type: this.selectedOption, doc_number: "000", doc_type_detailed: "none", docDate: "none", montant_tva: "none", montant_ttc: "none", exampleRadios: "none" });
  }

  /*onSelectCFType(){
    this.typeSelected2=this.selectedOption2;
  }

  onItemChange(value){
    this.radioSelected= value.target.value;
 }*/


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
    if (this.selectedImage == null) {
      alert("Veuillez choisir un document");
    } else {
      var name = this.selectedImage.name;
      console.log("Save name : " + name);
      var path = "factures/" + name;
      var fileRef = this.storage.ref(path);

      const filePath = 'factures/'+name;
      const task = this.storage.upload(filePath, this.selectedImage).then(() => {
        const ref = this.storage.ref(filePath);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          const Url = url; // for ts
          this.url = url // with this you can use it in the html
          console.log("URL : " + Url);
          this.savetoFirestore();
        })
      });

        /*this.storage.upload(path, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.url = url;
              console.log("Download url : " + this.url);
              //this.fileService.insertImageDetails(this.id, this.url); //insert into realtime database
              this.savetoFirestore();
              alert('Upload Successful');
            })
          })
        ).subscribe();*/
      }


  }

    savetoFirestore() {
      var factobject = {
        doctype: this.uploadForm.value.doc_type,
        name: this.selectedImage.name,
        fact_date: this.uploadForm.value.docDate,
        fact_number: this.uploadForm.value.doc_number,
        provider : this.uploadForm.value.doc_type_detailed,
        ttc: this.uploadForm.value.montant_ttc,
        tva: this.uploadForm.value.montant_tva,
        url: this.url,
        deposit_date: Date()
      }

      var objectToSave;

      if(this.uploadForm.value.doc_type == ""){

      } else {

      }

      //this.firestore.collection('TestCollection')
      var providerCode = "EXP"
      var idDocument = "FACT_" + providerCode + "_" + this.uploadForm.value.doc_number + "_OCT20";

      this.myDate = Date();
      let latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      console.log("NEW DATE : " + latest_date);

      const collectionRef = this.firestore.collection('Factures_test');
      collectionRef.doc("FACT_2020").collection("OCT20").doc(idDocument).set({
        doctype: this.uploadForm.value.doc_type,
        name: this.selectedImage.name,
        fact_date: this.uploadForm.value.docDate,
        fact_number: this.uploadForm.value.doc_number,
        provider : this.uploadForm.value.doc_type_detailed,
        ttc: this.uploadForm.value.montant_ttc,
        tva: this.uploadForm.value.montant_tva,
        url: this.url,
        deposit_date: latest_date
      })
        .then(res => {
          console.log("Response : " + JSON.stringify(res));
          alert("document téléchargé avec succès.")
        })
        .catch(e => {
          console.log("Response (error): " + JSON.stringify(e));
          alert("Erreur de téléchargement.")
        })
    }

  }

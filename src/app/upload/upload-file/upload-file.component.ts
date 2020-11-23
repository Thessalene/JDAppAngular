import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileService } from 'src/app/services/file.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { FACTURES_COLLECTION, FACTURES_CODE, MONTH_ARRAY} from '../../models/constants';
import { getPath } from '../../models/enums/eDocumentType';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  urlTest:string;

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

  constructor(private _formBuilder: FormBuilder, private firestore: AngularFirestore, private storage: AngularFireStorage, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.initForm();
    this.selectedOption = this.doctype[0];
    this.urlTest="https://firebasestorage.googleapis.com/v0/b/jdapp-dev.appspot.com/o/factures%2FFAC0001.pdf?alt=media&token=3bb09624-c856-421d-89ea-fdfdecb76c2f";
  }

  initForm() {
    this.uploadForm = new FormGroup({
      doc_type : new FormControl(null, Validators.required),
      doc_number : new FormControl(null, Validators.required),
      doc_type_detailed : new FormControl(null, Validators.required), //client, fournisseur ou employé
      docDate: new FormControl(null, Validators.required),
      montant_tva: new FormControl(null, [Validators.required]),
      montant_ttc: new FormControl(null, [Validators.required]),
      exampleRadios: new FormControl(null),
    })
  }

  onSubmit() {
    console.log(this.uploadForm.value)
  }

  onSelectDocType() {
    this.selectedOption = this.uploadForm.value.doc_type;
    this.uploadForm.setValue({ doc_type: this.selectedOption, doc_number: "", doc_type_detailed: "", docDate: "", montant_tva: "", montant_ttc: "", exampleRadios: "" });
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
    console.log(this.uploadForm.value)
    if (this.selectedImage == null) {
      alert("Veuillez choisir un document");
    } else {
      var name = this.selectedImage.name;
      console.log("Save name : " + name);

      const filePath = getPath(this.uploadForm.value.doc_type) + name;
      console.log("Path : " + filePath);

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


      if(this.uploadForm.value.doc_type == ""){

      } else {

      }

      //format date
      this.myDate = Date();
      let latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      console.log("NEW DATE : " + latest_date);

      var month = "";
      var year = "";
      var yer = new Date(this.uploadForm.value.docDate)
      
      console.log("DATE MONTH : " + yer.getUTCMonth());
      console.log("DATE YEAR : " + yer.getFullYear());

      var lastDigitYear = yer.getFullYear().toString().substr(yer.getFullYear().toString().length - 2);

      var providerCode = "EXP"
      var idDocument = FACTURES_CODE + "_" + providerCode + "_" + this.uploadForm.value.doc_number + "_" + MONTH_ARRAY[yer.getUTCMonth()-1] + lastDigitYear;


      const collectionRef = this.firestore.collection('Factures_test');
      collectionRef.doc(FACTURES_CODE + "_" + yer.getFullYear()).collection("OCT20").doc(idDocument).set({
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
          Swal.fire('Déversement terminé', 'Document téléchargé avec succès.!', 'success')
        })
        .catch(e => {
          console.log("Response (error): " + JSON.stringify(e));
          alert("Erreur de téléchargement.");
          Swal.fire('Echec du déversement', 'Erreur de téléchargement. veuillez réessayer ultérieurement.', 'error')
        })
    }

  }

import { Inject, Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //Variables
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    id:'',
    url:''
  };
  msg:string = 'error';

  constructor(private firestore: AngularFirestore, private firebase : AngularFireDatabase, private storage: AngularFireStorage) { }


  onInit(){
    const collectionRef = this.firestore.collection('salariés');
    //collectionRef.doc("rCHxlvceAN2c2cGlw7WB").collection("bulletins_paie").doc("MNa0okjJf0h1t8WVcJiU").collection("NOV20").valueChanges().subscribe(ss => this.bulletinsArray=ss);
  }

  insertImageDetails(id,url) {
    this.dataSet = {
      id : id,
      url: url
    };
    this.imageDetailList.push(this.dataSet);
  }
}
export interface Data{
  id:string;
  url:string;
}

import { Inject, Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

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

  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase) { }

  //Functions
  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(id,url) {
    this.dataSet = {
      id : id,
      url: url
    };
    this.imageDetailList.push(this.dataSet);
  }

  getImage(value){
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => { return item.payload.val();  });
        this.fileList.forEach(element => {
          if(element.id===value)
          this.msg = element.url;
        });
        if(this.msg==='error')
          alert('Aucun fichier trouvé');
        else{
          window.open(this.msg);
          this.msg = 'Erreur';
        }
      }
    );
  }
}
export interface Data{
  id:string;
  url:string;
}

import { Component, OnInit, Testability } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import * as functions from '@angular/fire/functions';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FACTURES_CODE, MONTH_ARRAY, UNDERSCORE, SEPARATOR, FACTURES_COLLECTION, dataTest } from '../models/constants';
import { noUndefined } from '@angular/compiler/src/util';
import { AngularFireDatabase } from '@angular/fire/database';
import { MyDoc } from '../models/MyDoc/mydoc';
import { map } from 'rxjs/operators';


/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

export class DocumentObject {
  month: string;
  documents: string[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  myArray: any[] = [];
  MONTHS = ["OCT", "NOV", "DEC"];
  datatestNew: any;

  monthArray = this.MONTHS;
  map = new Map<string, string[]>();
  docObject = new DocumentObject();
  docObjectList: DocumentObject[] = [];

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  constructor(private storage: AngularFirestore, private db: AngularFireDatabase, private afFun: AngularFireFunctions) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);
      this.datatestNew=dataTest;

      this.refresh();
  }

  ngOnInit(): void {
    this.MONTHS.forEach(month => {
      this.myArray=[];
      var path = FACTURES_COLLECTION + SEPARATOR + FACTURES_CODE + UNDERSCORE + "2020" + SEPARATOR + month + "20";

      const collectionRef = this.storage.collection(path);
      const collectionInstance = collectionRef.valueChanges();
      collectionInstance.pipe(
      map((user: Array<any>) => {
        console.log("IN MAP : " + month);

        let result:Array<MyDoc> = [];
        if (user) {
          user.forEach((erg) => {
            //console.log("ERG : " + JSON.stringify(erg))
            result.push(
              new MyDoc(
                erg.name,
                erg.doctype,
                erg.fact_date,
                erg.fact_number,
                erg.provider,
                erg.deposit_date,
                erg.url,
                erg.tva,
                erg.ttc
              
                ));
          });
        }
        return result; // <<<=== missing return
      }))
      .subscribe(snapshot => {
        //console.log("Docs : " + JSON.stringify(snapshot))
        this.myArray = snapshot;

        this.docObject = {
          month: month,
          documents: this.myArray
        }

        this.myArray.forEach(doc => {
          console.log("Doc array " + JSON.stringify(doc))
          this.datatestNew[0].children.push({
            name: doc.name,
            type: "file",
            children: []
          });
        })
        this.docObjectList.push(this.docObject);
      });
      console.log("DATA TEST " + JSON.stringify(this.datatestNew))

      this.refresh();
      //console.log("Docs oBJECT : " + JSON.stringify(this.docObjectList))
    })

  }

  refresh(){
    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.datatestNew;
  }

  getObjects() {
    return this.docObjectList;
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
      level: level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode): FileNode[] | null | undefined {
    return node.children;
  }
}
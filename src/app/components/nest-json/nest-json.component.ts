import { Component, Input } from '@angular/core'; 
import { TreeModule, TreeDropDirective, TreeNode, TreeModel } from 'angular-tree-component';

import { Nested } from '../../models/NestJson';
 
  
@Component({  
    selector: 'nest',
    templateUrl: './nest-json.component.html',
    styleUrls: ['./nest-json.component.css']
})  

export class NestJSONComponent {  
    nodes: any;
    nodes1: any;
    nodes2: any;
    copy: any;
    dataTable: any;
    headerTable: string[];
    
    options = {
      allowDrag: true,
      allowDrop: false,
    };
    options1 = {
      actionMapping: { mouse: 
        { drop: 
          (tree:TreeModel, node:TreeNode, $event:any, {from, to}) => 
          { 
            this.nodes1 = [];
            var clone = JSON.parse(JSON.stringify(from.data));
            this.nodes1.push(clone); 
            node.treeModel.update(); 
            this.headerTable = this.arrayDataOfNest(this.nodes1);
            console.log(this.headerTable);
          } 
        } 
      }, 
      allowDrag: true, 
      allowDrop: true
    };
    options2 = {
      actionMapping: { mouse: 
        { drop: 
          (tree:TreeModel, node:TreeNode, $event:any, {from, to}) => 
          { 
            this.nodes2 = [];
            var clone = JSON.parse(JSON.stringify(from.data));
            this.nodes2.push(clone); 
            node.treeModel.update(); 
            this.dataTable.push(this.arrayDataOfNest(this.nodes2));
            console.log(this.dataTable);
          } 
        } 
      }, 
      allowDrag: true, 
      allowDrop: true
    };


    constructor(){
        this.nodes = [];
        this.nodes1 = [];
        this.nodes2 = [];
        this.dataTable = [];
        
        var data = { name: "John", age:[31,25,29], city:  { asd: "data", rdf : { asd: "data", cabezera : ["Arturo", "Jaime", "Mario"]}}};
        // [31,25,15]
        // { asd: "data", rdf : "cosa"}
        var n2 = new Nested("dato", []);

        var n = new Nested("dato", [n2]);

        //console.log(n);


        this.nodes = this.recursiveNest(data);
        console.log(this.nodes);
        this.copy = JSON.parse(JSON.stringify(this.nodes));
    }

    recursiveNest(data): Array<Nested>{
      if(typeof data == "object"){
        var keys = Object.keys(data);
        var array = [];
        keys.forEach(element => {
          var array2 = this.recursiveNest(data[element]);
          array.push(new Nested(element, array2));
        });
        return array;
      }else{
        return [new Nested(data, [])];
      }
    }


    arrayDataOfNest(data): Array<string>{
      var aux = [];
      try {
        data[0].children.forEach(element => {
          aux.push(element.children[0].name)
        });
      } catch (error) {
        console.log("El dato proporcionado para esta functión no es una Array de datos");
      }
      return aux;
    }

} 
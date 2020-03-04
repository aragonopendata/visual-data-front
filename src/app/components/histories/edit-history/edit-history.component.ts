import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HistoriesService } from '../../../services/histories.service';
import { History, Content } from '../../../models/History';
import { Router } from '@angular/router';
import { Category } from '../../../models/Category';


@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss']
})
export class EditHistoryComponent implements OnInit {

  categories: Category[];
  contents: Content[]=[];
  historyModel: History = {};

  @ViewChild('addContent') addContentButton: ElementRef;

  constructor(private _historiesService: HistoriesService, private _route: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this._historiesService.getCategories().subscribe( (categories: Category[]) => {
      this.categories = categories;
		},err => {
      console.log('Error al obtener las categorias');
    });
  }

  newContent( newContent: Content ){
    console.log(newContent)
    this.contents.push(newContent);
    this.falseClickAddContent();
  }

  falseClickAddContent(){
    this.addContentButton.nativeElement.click();
  }

  saveHistory(){
    this._route.navigateByUrl("/")

  }

}
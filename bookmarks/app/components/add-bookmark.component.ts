// ====== ariel duarte ======
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Bookmark } from '../model/bookmark';
import { BookmarkService } from '../services/bookmark.service';

import {Observable} from 'rxjs/Rx';

@Component({
    templateUrl: 'app/views/add-bookmark.html',
    providers: [ BookmarkService ]
})

export class AddBookmarkComponent implements OnInit{
  public newBookmark: Bookmark;
  public id = "";
  public nameParam = "";
  public authorParam = "";
  public categoryParam = "";
  public descriptionParam = "";
  public urlParam = "";
  public typeParam = "";
  public codeParam = "";
  public imageParam = "";
  public tagsParam = "";
  public createdDTParam = "";
  constructor(private _bookmarkService: BookmarkService,
              private _router: Router,
              private _actroute: ActivatedRoute){

  }

  onSubmit(){
    // Variable to hold a reference of addComment/updateComment
    let bookmarkOperation:Observable<Bookmark[]>;
    bookmarkOperation = this._bookmarkService.addBookmark(this.createNewDocumentBody(this.newBookmark));
    // Subscribe to observable
    bookmarkOperation.subscribe(
      response => {
         console.log(response);
          // Empty model
          this.newBookmark = new Bookmark(this.id, this.nameParam, this.authorParam, this.descriptionParam,  this.urlParam, this.typeParam, this.codeParam, this.imageParam, this.categoryParam, this.tagsParam, this.createdDTParam);
          // Switch editing status
          this._router.navigate(["bookmarks"]);
      },
      err => {
          // Log errors if any
          console.log(err);
        });


  }

createNewDocumentBody(_newBookmark: Bookmark): Object {
  let body = {
    "name" : _newBookmark.name,
    "author" : _newBookmark.author,
    "description" : _newBookmark.description,
    "url" : _newBookmark.url,
    "type" : _newBookmark.type,
    "code" : _newBookmark.code,
    "image" : _newBookmark.image,
    "category" : _newBookmark.category,
    "tags" : _newBookmark.tags,
    "createdDT" : _newBookmark.createdDT
  }
  return body;
}

ngOnInit(){
  this._actroute.params.forEach((params: Params) => {
    this.nameParam = params['name'];
    this.authorParam = params['author'];
    this.categoryParam = params['category'];
    this.descriptionParam = params['description'];
    this.urlParam = params['url'];
    this.typeParam = params['type'];
    this.tagsParam = params['tags'];
    this.createdDTParam = params['createdDT'];
    this.newBookmark = new Bookmark(this.id, this.nameParam, this.authorParam, this.descriptionParam,  this.urlParam, this.typeParam, this.codeParam, this.imageParam, this.categoryParam, this.tagsParam, this.createdDTParam);
    });
  }
}

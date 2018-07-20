import {Injectable, HostListener} from '@angular/core'
import { Component, OnInit,EventEmitter, Output, ViewChildren, ElementRef} from '@angular/core';
import {MatButton} from '@angular/material';

import * as Rx from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../../models/film.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FilmService implements OnInit{
    restAPIURL: string = "localhost:3000/officialscript/";
    films: Film[] = [

    ];
    constructor(private http: HttpClient){

    }
    ngOnInit(){

    }
    ngAfterViewInit(){
    }

    getFilmScript(title: String){
        return this.http.get(this.restAPIURL + title,{responseType: 'text'}).pipe(catchError(e=>{
            throw e;
        }));
    }
}

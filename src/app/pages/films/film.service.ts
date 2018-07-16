import {Injectable, HostListener} from '@angular/core'
import { Component, OnInit,EventEmitter, Output, ViewChildren, ElementRef} from '@angular/core';
import {MatButton} from '@angular/material';

import * as Rx from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Film } from '../../models/film.model';

@Injectable()
export class FilmService implements OnInit{
    restAPIURL: string = "https://blackasmidnight.com:8443/";
    films: Film[] = [

    ];
    constructor(private http: HttpClient){

    }
    ngOnInit(){

    }
    ngAfterViewInit(){
    }

    getFilmScript(title: String){
        return this.http.get(this.restAPIURL + title,{responseType: 'text'}).catch(e=>{
            throw e;
        });
    }
}

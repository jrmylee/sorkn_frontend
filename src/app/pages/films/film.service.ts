import {Injectable, HostListener} from '@angular/core'
import { Component, OnInit,EventEmitter, Output, ViewChildren, ElementRef} from '@angular/core';
import {MatButton} from '@angular/material';

import * as Rx from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FilmService implements OnInit{
    restAPIURL: string = "http://34.209.77.190:3000/officialscript/";
    constructor(private http: HttpClient){

    }
    ngOnInit(){

    }
    ngAfterViewInit(){
    }

    getFilmScript(title: String){
        console.log(this.restAPIURL + title);

        return this.http.get(this.restAPIURL + title,{responseType: 'text'}).catch(e=>{
            throw e;
        });
    }
}

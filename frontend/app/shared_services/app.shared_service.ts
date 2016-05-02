import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';

@Injectable()
export class AppSharedService {

  num: number;

  constructor() {

    console.log("--> initialize --> appSharedService");

    this.num = parseInt(Math.random() * 1000);
  }

}
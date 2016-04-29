import { Component, OnInit, Input } from 'angular2/core';
import {RouteParams} from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
        <h2>{{hero.name}} details!</h2>
        <div>
            <label>id: </label>{{hero.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name" />
        </div>
        <button (click)="goBack()">Back</button>
    </div>
  `
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack() {
    window.history.back();
  }
}
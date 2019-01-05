<header id="header" role="banner">
  <h1><img class="logo" src="images/header_logo.png" alt="{{title}}"></h1>

  <img class="user-icon" src="{{user.iconUrlMedium}}">

  <div class="notification-button">0</div>

  <div class="navigation">

    <div #target class="navigation-rotate">
      <div class="navigation-item" *ngFor="let stream of viewStreams">{{stream.name}}</div>
    </div>

    <div class="navigation-cover-left-1"></div>
    <div class="navigation-cover-left-2"></div>
    <div class="navigation-cover-right-1"></div>
    <div class="navigation-cover-right-2"></div>

    <div class="navigation-arrow-left" (click)="onClickPrevStream()"><</div>
    <div class="navigation-arrow-right" (click)="onClickNextStream()">></div>

  </div>

</header>
<div class="header-margin"></div>

<!-- この部分が各ページに切り替わる -->
<router-outlet></router-outlet>

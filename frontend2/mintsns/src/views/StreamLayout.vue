<header id="header" role="banner">
  <h1><img class="logo" src="images/header_logo.png" alt="1"/></h1>

  <img class="user-icon" src="">

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

<router-view></router-view>

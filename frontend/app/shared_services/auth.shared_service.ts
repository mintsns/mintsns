import {Injectable} from "angular2/core";
import {User} from "../models/user";

@Injectable()
export class AuthSharedService {

  // ログインユーザー
  // ログインしている場合はここにユーザーデータが入る
  loginUser: User;

  constructor() {
    
    console.log("--> initialize --> authSharedService");

    // [mock] ログインしていることにする
    this.loginUser = {
      id: 1,
      name: "mintsns",
      iconUrl: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlLarge: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlMedium: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlSmall: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      isMe: true,
      email: "",
      password: ""
    };
  }

  // ログインしているか
  isLogin() {
    return !!this.loginUser;
  }

  // ログインユーザーの取得
  getLoginUser() {
    return this.loginUser;
  }

  // TODO: 実際にログインしているか通信して検証する

  // TODO: ログアウトする

  // TODO: ログインする

  // TODO: アイコンの取得




}
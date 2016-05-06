import {User} from "../models/user";
import {Injectable} from "angular2/core";

@Injectable()
export class UserService {

  constructor() {
    console.log("--> initialize --> UserService");
  }

  // TODO: 非同期でIDを指定してユーザーの情報を取得する
  getUserWithId(id: number): Promise<User> {
    return Promise.resolve({
      id: 1,
      name: "mintsns",
      iconUrl: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlLarge: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlMedium: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlSmall: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      isMe: true
    });
  };

}


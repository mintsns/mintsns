export class User {
  id: number;
  name: string;
  iconUrl: string;
  iconUrlSmall: string;
  iconUrlMedium: string;
  iconUrlLarge: string;
  email: string;
  password: string;
  // 自分の場合 true になる
  isMe: boolean;
}

// TODO: タグを加える
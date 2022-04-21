export type BTTVEmote = {
  code: string;
  id: string;
  imageType: string;
  userId: string;
};

export type FFZEmote = {
  id: number;
  name: string;
  height: number;
  width: number;
  public: boolean;
  hidden: boolean;
  modifier: boolean;
  offset: null;
  margins: null;
  css: null;
  owner: {
    _id: number;
    name: string;
    display_name: string;
  };
  urls: {
    [key: string]: string;
  };
  status: number;
  usage_count: number;
  created_at: string;
  last_updated: string;
};

export type STVEmote = {
  id: string;
  name: string;
  owner: {
    id: string;
    twitch_id: string;
    login: string;
    display_name: string;
    role: {
      id: string;
      name: string;
      position: number;
      color: number;
      allowed: number;
      denied: number;
      default: boolean;
    };
  };
  visibility: number;
  visibility_simple: any[];
  mime: string;
  status: number;
  tags: any[];
  width: number[];
  height: number[];
  urls: string[][];
};

export type TwitchEmote = {
  id: string;
  format: string[];
  images: {
    url_1x: string;
    url_2x: string;
    url_4x: string;
  };
  name: string;
  scale: string[];
  theme_mode: string[];
};

export type TwitchBadgeVersion = {
  id: string;
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
};

export type TwitchBadge = {
  set_id: string;
  versions: TwitchBadgeVersion[];
};

export type ChatTwitchBadge = {
  set_id: string;
  version: string;
};

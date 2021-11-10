export type States = {
  is_banned: boolean;
  ban_reason: string;
};

export type City = {
  id: number;
  name: string;
  area: string;
  region: string;
  country: Country;
};

export type Country = {
  id: number;
  name: string;
};

export type Skill = {
  id: number;
  name: string;
  categories: null;
};

export type Category = {
  id: number;
  name: string;
  skills: Skill[];
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  sex: string;
  avatar_url: string;
  city: City | null;
  states: States;
  master: {
    addresses: Address[];
    moderator_message: string | null;
    city: City | null;
    comments_count: number;
    id: number;
    rating: number;
    status: string;
    services: Service[] | null;
    skills: Skill[] | null;
    is_visible: boolean;
  };
};
export type Address = {
  address: string;
  id: number;
  lat: number;
  lon: number;
};
export type Service = {
  cost: number;
  description: string;
  id: number;
  skills: Skill[] | null;
  title: string;
  photos: Photo[] | null;
};

export type Photo = {
  id: number;
  service_id: number;
  url: string;
  sort: number;
};

export type MasterConnect = {
  connected_at?: string;
  id: number;
  user: User;
  master_id: number;
  comment: string;
  status: ConnectStatus;
  rating: number;
  created_at: Date;
  updated_at: Date;
  services: Service[];
  vk_user_id: string;
};

export type UserConnect = {
  connected_at?: string;
  id: number;
  user_id: number;
  master_profile: User;
  comment: string;
  status: ConnectStatus;
  rating: number;
  created_at: Date;
  updated_at: Date;
  services: Service[];
};

export enum ConnectStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  FINISHED = "finished",
  CANCELED_BY_MASTER = "canceled_by_master",
  HISTORY = "history",
  CANCELED_BY_USER = "canceled_by_user",
  CANCELED_BY_TIMEOUT = "canceled_by_timeout",
}
export type Feedback = {
  id: number;
  connection: UserConnect;
  message: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    sex: string;
    avatar_url: string;
    city: null;
    states: {
      is_banned: false;
      ban_reason: string;
    };
    master: null;
  };
};

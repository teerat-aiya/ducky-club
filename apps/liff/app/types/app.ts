
export type Workspace = {
  id: number;
  name: string;
  type: string;
  location: string;
  capital: number;
  description: string;
  image: string;
  active: boolean;
}

export type Activity = {
  id: string;
  workspace: string;
  start_time: string;
  end_time: string;
  purpose: string;
  line_user_id: string;
  status: string;
  user_profile: string;
  created_at: string;
};

export type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

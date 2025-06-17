export type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export type Channel = {
  status: string;
  followers: number;
  targetedReaches: number;
  blocks: number;
}
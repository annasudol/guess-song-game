export interface TrackType {
  artist: string;
  songUrl: string;
  externalUrl: string;
  title: string;
  img: string;
}

export interface PlayListItemsTypes {
  name: string;
  image?: string;
  tracks: TrackType[];
}
export interface PlayListTypes {
  [id: string]: PlayListItemsTypes;
}

import { useEffect, useState } from 'react';
import { TrackType, PlayListTypes } from "../state/playList/types";



export const useFetchPlaylist = (playlistIds: string[], token: string) => {
    const [playlistInfo, setPlaylistInfo] = useState<PlayListTypes[]>([]);
    const [error, setError] = useState(false);

    useEffect((): void => {
        const fetchPlaylistData = async (id: string, token: string): Promise<any> => {
            try {
                const url = await new Request(`https://api.spotify.com/v1/playlists/${id}`, {
                    headers: new Headers({
                        Authorization: 'Bearer ' + token,
                    }),
                });

                const response = await fetch(url);
                const responseData = await response.json();
                if (!responseData.ok) {
                    setError(true);
                    throw new Error(responseData.message);
                }

                const tracks = responseData.tracks?.items?.reduce((acc: TrackType[], item: any): TrackType[] => {
                    if (item?.track.preview_url) {
                        const img = item.track.album.images[2].url;
                        const artist = item.track.artists.map((artist: { name: string }) => artist.name).join(', ');

                        const externalUrl = item.track.external_urls.spotify;
                        const title = item.track.name;
                        const track = {
                            artist,
                            externalUrl,
                            img,
                            songUrl: item.track.preview_url,
                            title,
                        };

                        return [...acc, track];
                    }

                    return acc;
                }, []);

                const playlistInfoData: PlayListTypes = {
                    [responseData.id]: {
                        image: responseData.images && responseData.images[0].url,
                        name: responseData.name,
                        tracks,
                    },
                }
                setPlaylistInfo([...playlistInfo, playlistInfoData])
            } catch (err) {
                console.warn("cannot find user's scores", err.message);
            }
        };

        playlistIds.map(id => fetchPlaylistData(id, token));

    }, [playlistIds]);




    return { playlistInfo, error }
}
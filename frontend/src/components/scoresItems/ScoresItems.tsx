import { getToken } from '../../state/user/selectors';
import React, { FunctionComponent, ReactElement, useEffect, useState, useMemo } from 'react';
import { useSelector } from "react-redux";
import { useFetchPlaylist } from "../../hooks";
import { PlaylistItem, ScoresDBPropsGrouped, ErrorMessage } from ".."

export const ScoresItems: FunctionComponent<{ playlistIds: string[], scoresDB: ScoresDBPropsGrouped[] }> = ({ playlistIds, scoresDB }): ReactElement => {
    const token = useSelector(getToken);
    const [data, setData] = useState([]);
    const { playlistInfo, error } = useFetchPlaylist(playlistIds, token);

    useEffect(() => {
        !error && setData([...data, ...playlistInfo]);
    }, [playlistInfo, error]);

    if (error) {
        return (<ErrorMessage message="ups..., Error, something went wrong" />)
    }


    return (
        <div className="flex w-full flex-wrap">
            {!scoresDB.length && (
                <h3 className="font-alba text-orange-500 text-3xl mt-10">You don&apos;t have any games records yet</h3>
            )}
            {scoresDB?.map((info: ScoresDBPropsGrouped) => {
                const id = Object.keys(info)[0];
                const date = info[id].date;
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const dateFormatted = new Date(date).toLocaleDateString(undefined, options);
                const playlist = data.filter(item => Object.keys(item)[0] === id)[0];
                const name = playlist && Object.values(playlist)[0]['name'];

                return (
                    <div className="w-full md:w-1/3 min-w-64 flex" key={id}>
                        <div className="w-1/3 max-w-24">
                            {playlist && <PlaylistItem playlist={playlist} />}
                        </div>
                        <div className="w-2/3 pl-4 pt-6">
                            <h3 className="font-alba text-orange-500 text-xl -mb-2">
                                {name?.length > 12 ? `${name?.slice(0, 12)}...` : name}
                            </h3>
                            <span className="font-OpenSans text-light-gray text-xs opacity-50">{dateFormatted}</span>
                            <p className="font-albaSuper text-jellyBean text-2xl">{info[id].points} p.</p>
                        </div>
                    </div>
                );

            })}
        </div>
    );
};
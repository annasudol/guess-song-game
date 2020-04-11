import React, { FunctionComponent, ReactElement } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { TrackType } from '../../state/playList/types';
import { useSelector } from 'react-redux';
import { getGameTracks } from '../../state/game/selectors';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: 'transparent',
      maxWidth: 460,
      marginBottom: theme.spacing(2),
    },
  }),
);

export const ListSongs: FunctionComponent = (): ReactElement => {
  const classes = useStyles();
  const songs = useSelector(getGameTracks);
  return (
    <List dense className={classes.root}>
      <div className="flex justify-center">
        <div className="w-full">
          {songs?.map((song: TrackType, index: number) => {
            return (
              <a href={song.externalUrl} target="_blank" rel="noopener noreferrer" key={index}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt={song.artist} src={song.img} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<span className="text-xl text-pink-700 font-alba">{song['artist']}</span>}
                    secondary={<span className="text-sm text-white">{song.title}</span>}
                  />
                </ListItem>
              </a>
            );
          })}
        </div>
      </div>
    </List>
  );
};

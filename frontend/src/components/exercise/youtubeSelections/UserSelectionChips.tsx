import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import {
  Recommendation,
  YoutubeListProp,
} from '../../../types/recommendationTypes';
import YoutubeAPI from '../../../services/YoutubeApi';

const UserSelectionChips: React.FC<YoutubeListProp> = ({
  userRecoSelectList,
  setYoutubeVideoList,
}) => {
  const [chipData, setChipData] =
    React.useState<Recommendation[]>(userRecoSelectList);

  const handleDelete = (chipToDelete: Recommendation) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  const handleChipClick =
    (name: string, id: number) => async (event: React.MouseEvent) => {
      const response = YoutubeAPI.getYoutubeVideo(name, id);

      setYoutubeVideoList(await response);
    };
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data.id}>
            <Chip
              color="secondary"
              icon={icon}
              label={data.name}
              onDelete={data.name === 'React' ? handleDelete(data) : undefined}
              onClick={handleChipClick(data.name, data.id)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default UserSelectionChips;

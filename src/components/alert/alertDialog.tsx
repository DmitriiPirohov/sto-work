import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

interface MyComponentProps {
  openPoper: boolean,
  mistake: Array<number>,
}

export const Alert: React.FC<MyComponentProps> = ({openPoper, mistake}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if(openPoper) {
      // setAnchorEl()
      // handleClick(event?.currentTarget)
    }
  }, [openPoper])

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Popover
        id={id}
        open={openPoper}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{
          margin: '40px 0 0 50px'
        }}
      >
        <Typography className={classes.typography}>
          {mistake.length !== 0
          ?
            <>Заповніть будьласка виділені поля</>
            :
            <>Дані збережено! Оновіть сторінку для подальшої роботи.</>
        }
        </Typography>
      </Popover>
    </div>
  );
}
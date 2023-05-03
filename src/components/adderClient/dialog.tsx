import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TransitionProps } from '@material-ui/core/transitions';
import { WorkAdder } from '../workAdder/WorkAdder';
import { TableForPrice } from '../tableForPrice/TableForPrice';
import { Alert } from '../alert/alertDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

export const Transition = React.forwardRef(function Transition (
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface MyComponentProps {
  choosenClient?: (par: any) => void;
  client?: string | number;
}

export const FullScreenDialog: React.FC<MyComponentProps> = ({ choosenClient, client }) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(choosenClient !== undefined) {
      choosenClient('');
    }

    setOpen(false);
  };

  const styleButton = {
    color: 'white',
    borderColor: 'white',
    '&:hover': {
    }
  }

  const a = new Date();
  const month = (+(a.getMonth() + 1)) < 10 ? `0${a.getMonth() + 1}` : (a.getMonth() + 1);

  const json = localStorage.getItem('clientsSto');
  let clients: any = [];
  if(json !== null) {
    clients = JSON.parse(json);
  }

  const [numberAuto, SetNumberAuto] = useState<string>('');
  const [name, SetName] = useState<string>('');
  const [phoneNumber, SetPhoneNumber] = useState<string>('');
  const [auto, SetAuto] = useState<string>('');
  const [date, SetDate] = useState<string>(`${a.getDate()}.${month}.${a.getFullYear()}`);
  const [arrayOfError, SetArrayOfError] = useState<Array<number>>([]);
  const [work, SetWork] = useState<Array<any>>([]);
  const [saved, SetSaved] = useState(false);


  const inputs = ['Номер авто', 'Номер телефону', 'Ім\'я', 'Марка та модель авто'];
  const inputsValue = [numberAuto, phoneNumber, name, auto];
  const inputsFunctions = [SetNumberAuto, SetPhoneNumber, SetName, SetAuto];

  const save = () => {
    SetSaved(true)
    if(!client) {
      if(numberAuto === '') {
        SetArrayOfError(prev => [...prev, 0]);
      }

      if(phoneNumber === '') {
        SetArrayOfError(prev => [...prev, 1]);
      }

      if(auto === '') {
        SetArrayOfError(prev => [...prev, 3]);
      }

      if(numberAuto !== '' && phoneNumber !== '' && auto !== '') {
        const clientJson = JSON.stringify([
          ...clients,
          {
            number: `${clients.length + 1}`,
            id: `${date}${numberAuto}`,
            Name: name,
            Date: date,
            AutoNumber: numberAuto,
            Auto: auto,
            Number: phoneNumber,
            Summ: '',
            repair: [],
            parts: {},
          }
        ]
        );

        localStorage.setItem('clientsSto', clientJson);
        SetNumberAuto('');
        SetPhoneNumber('');
        SetAuto('');

        setTimeout(() => {
          SetSaved(false);
          handleClose();
        }, 3000);
      }
    }

    if(client) {
      const choosenClient = clients.filter((a: { id: string | number | undefined; }) => a.id === client);

      choosenClient[0].repair = work;
      choosenClient[0].Summ = `${work.map(a => a.summ).reduce((a, b) => a + b, 0)}грн.`;

      const clientJson = JSON.stringify([
        ...clients.filter((a: { id: string | number | undefined; }) => a.id !== client), ...choosenClient
      ]
      );

      localStorage.setItem('clientsSto', clientJson);

      setTimeout(() => {
        SetSaved(false);
        handleClose();
      }, 3000);
    }
  }

  const deleteUser = () => {
    if(clients !== null) {
      const clientJson = JSON.stringify(clients.filter((a: { id: string | number | undefined; }) => a.id !== client));
      localStorage.setItem('clientsSto', clientJson);
      handleClose();
    }
  }

  useEffect(() => {
    if(numberAuto !== '') {
      SetArrayOfError(prev => prev.filter(a => a !== 0));
    }

    if(phoneNumber === '') {
      SetArrayOfError(prev => prev.filter(a => a !== 1));
    }

    if(auto === '') {
      SetArrayOfError(prev => prev.filter(a => a !== 3));
    }
  }, [numberAuto, phoneNumber, auto]);

  useEffect(() => {
    if(client !== undefined && client !== '') {
      handleClickOpen();
      SetWork(clients.filter((a: string | number | any) => a.id === client)[0].repair)
    }

    if(client === undefined || client === '') {
      SetWork([]);
    }
  }, [client]);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={styleButton}
      >
        Додати клієнта
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>

            {
              !saved
                ?
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => save()}
                  style={{
                    margin: '0 50px 0 100px',
                    width: 100,
                    border: '1px solid white',
                  }}
                >
                  save
                </Button>
                :
                // <CircularProgress />
                <>
                  <CircularProgress color="secondary" style={{ margin: '0 0 0 120px' }} />
                  <Alert openPoper={saved} mistake={arrayOfError} />
                </>

            }



            {
              client && client !== undefined && clients !== undefined &&
              <>
                <WorkAdder SetWork={SetWork} work={work} />

                <Typography>
                  Клієнт: {clients.filter((a: { id: string | number; }) => a.id === client)[0].Auto}
                  <span style={{ padding: '0 0 0 15px' }}>
                    {clients.filter((a: { id: string | number; }) => a.id === client)[0].AutoNumber}
                  </span>
                </Typography>

                <Button onClick={() => deleteUser()} style={{ margin: '0 0 0 280px', width: 100, color: 'white' }}>
                  видалити кліента
                </Button>
              </>
            }
          </Toolbar>
        </AppBar>
        <List>

          <form noValidate autoComplete="on" style={{ padding: 50, display: 'flex', flexDirection: 'column', gap: 15 }}>
            {
              !client &&
              inputs.map((input, i) =>
                <TextField
                  key={i}
                  id="outlined-basic"
                  label={input}
                  variant="outlined"
                  required={i === 0 || i === 1 || i === 3}
                  error={arrayOfError.includes(i) ? true : false}
                  style={{ width: 500 }}
                  value={inputsValue[i]}
                  onChange={(e) => inputsFunctions[i](e.target.value)}
                />
              )
            }
          </form>

        </List>

        {
          client &&
          <TableForPrice work={work} />
        }
      </Dialog>
    </div >
  );
}

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface objectOfWork {
  id: string,
  nameWork: string;
  countOfWorkOrParts: number;
  price: number;
  summ: number;
}

interface MyComponentProps {
  SetWork: (par: any) => void;
  work: Array<objectOfWork>;
}

export const WorkAdder: React.FC<MyComponentProps> = ({ SetWork, work }) => {
  const [open, setOpen] = React.useState(false);
  const [nameWork, SetNameWork] = useState('');
  const [countOfWorkOrParts, SetCountOfWorkOrParts] = useState(1);
  const [price, SetPrice] = useState(0);
  const [switchText, SetSwitchText] = useState('Додати роботу, чи запчастину.');
  const [deleteItem, SetDeleteItem] = useState(true);
  const [percent, SetPercent] = useState<number>(0);
  const [totallPrice, SetTotallPrice] = useState<number>(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if(deleteItem) {
      SetWork([...work, { id: `${nameWork}${price}`, nameWork: nameWork, countOfWorkOrParts: countOfWorkOrParts, price: totallPrice, summ: (totallPrice * countOfWorkOrParts) }]);
    setOpen(false);
    SetPrice(0);
    SetCountOfWorkOrParts(1);
    SetNameWork('');
    } else {
      setOpen(false);
    }
  }

  const handleChange = () => {
    switch(switchText) {
      case 'Додати роботу, чи запчастину.':
        SetSwitchText('Видалити роботу чи запчастину');
        SetDeleteItem(false)
        break;

      default:
        SetSwitchText('Додати роботу, чи запчастину.');
        SetDeleteItem(true);
        break;
    }
  }

  const deleteItemSubmit = (par: string) => {
    SetWork((prev: any[]) => prev.filter((el: { id: string; }) => el.id !== par))
  }

 useEffect(() => {
  SetTotallPrice(+(price + (price * (percent / 100))).toFixed(2));
  // console.log(totallPrice);

 }, [price, percent])

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ margin: '0 20px 0 10px', width: 300, color: 'white', border: '1px solid white' }}>
        Додати роботу/запчасттину
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/*  */}
        <DialogTitle id="alert-dialog-slide-title">{switchText}</DialogTitle>

        <Button
          style={{ width: 200, margin: '0 0 10px 25px', border: '1px solid red', color: 'red' }}
          onClick={handleChange}
        >
          {
            deleteItem ?
            <>Видалити із списку</>
            : <>Додати в список</>
          }
        </Button>

        <DialogContent>
          {
            deleteItem ?
              <>
                <TextField
                  id="outlined-search"
                  label="Назва роботи"
                  type="name"
                  variant="outlined"
                  style={{ width: 500, margin: '0 0 10px 0' }}
                  value={nameWork}
                  onChange={(e) => SetNameWork(e.target.value)}
                />

                <TextField
                  id="outlined-search"
                  label="Ціна"
                  type="number"
                  variant="outlined"
                  style={{ width: 500, margin: '0 0 10px 0' }}
                  value={price}
                  onChange={(e) => SetPrice(+e.target.value)}
                />

                <TextField id="outlined-search"
                  label="Кількість"
                  type="number"
                  variant="outlined"
                  style={{ width: 500, margin: '0 0 10px 0' }}
                  value={countOfWorkOrParts}
                  onChange={(e) => SetCountOfWorkOrParts(+e.target.value)}
                />

                <TextField id="outlined-search"
                  label="%"
                  type="number"
                  variant="outlined"
                  style={{ width: 500 }}
                  value={percent}
                  onChange={(e) => SetPercent(+e.target.value)}
                />
              </> :
              <>
                {
                  work.map((element, i) => (
                    <>
                      <ol key={element.id}
                        style={{
                          border: '1px solid black', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderRadius: '5px', textAlign: 'center', alignItems: 'center'}}>
                        {i + 1 + ' ' + element.nameWork + ' ' + element.summ}
                        {}
                        <Button onClick={() => deleteItemSubmit(element.id)}>
                          <DeleteForeverRoundedIcon />
                        </Button>
                      </ol>

                    </>
                  ))
                }
              </>
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

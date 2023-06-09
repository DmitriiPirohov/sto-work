import React, { useState } from 'react';

interface objectOfWork {
  nameWork: string;
  countOfWorkOrParts: number;
  price: number;
  summ: number;
}

interface MyComponentProps {
  work: Array<objectOfWork>;
  km: string | number;
}

const style = {
  border: '2px solid black'
}

export const TableForPrice: React.FC<MyComponentProps> = ({ work, km }) => {
  const a = new Date();
  const month = (+(a.getMonth() + 1)) < 10 ? `0${a.getMonth() + 1}` : (a.getMonth() + 1);
  const day = a.getDate() < 10 ? `0${a.getDate()}` : a.getDate();
  return (
    <>
      <table style={{ border: '2px solid black', width: '80%', margin: '-50px auto' }}>
        <thead style={style}>
          <tr style={style}>
            <th style={{ border: '2px solid black', width: '50%' }}>Назва</th>
            <th style={{ border: '2px solid black', width: 100 }}>Кількість</th>
            <th style={{ border: '2px solid black', width: 150 }}>Ціна</th>
            <th style={style}>Сума</th>
          </tr>
        </thead>
        <tbody style={style}>
          {
            work.map((a) => (
              <tr>
                <td style={style}>{a.nameWork}</td>
                <td style={style}>{a.countOfWorkOrParts}</td>
                <td style={style}>{a.price}</td>
                <td style={style}>{a.summ}</td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td style={{ padding: '50px 0 0 0' }}>{day}.{month}.{a.getFullYear()}</td>
            <td></td>
            <td style={{ padding: '50px 0 0 0' }}>Загалом до сплати</td>
            <td style={{ padding: '50px 0 0 0', width: 100 }}>{(work.map(a => a.summ).reduce((a, b) => a + b, 0)).toFixed(2)}грн.</td>
          </tr>
        </tfoot>

        {km &&
          <div>Показник спідометру: {km}км.</div>
        }

        <div style={{ margin: '20px 0 0 0' }}>Виконав замовлення: СТО VAG BUCHA</div>
        <div>Адреса: м.Буча, Пушкінська 6</div>
        <div>Телефон: +380973458195, +380637623337</div>
        <div>
          <div>
            р/р: UA793052990000026003040114291 в АТ "ПРИВАТ БАНК"
          </div>

          <div>
            МФО: 305299
          </div>

          <div>
            РНОКПП: 3295012997
          </div>

        </div>
        <br />
        <strong>
          ПРИЗНАЧЕННЯ ПЛАТЕЖУ: ТЕХНІЧНЕ ОБСЛУГОВУВАННЯ, ТА РЕМОНТ АВТОМОБІЛЬНИХ ЗАСОБІВ
        </strong>
      </table>

    </>

  );
}

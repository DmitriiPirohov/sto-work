import React from 'react';

interface objectOfWork {
  nameWork: string;
  countOfWorkOrParts: number;
  price: number;
  summ: number;
}

interface MyComponentProps {
  work: Array<objectOfWork>;
}

export const TableForPrice: React.FC<MyComponentProps> = ({ work }) => {
  const a = new Date();
  const month = (+(a.getMonth() + 1)) < 10 ? `0${a.getMonth() + 1}` : (a.getMonth() + 1);
  const day = a.getDate() < 10 ? `0${a.getDate()}` : a.getDate();
  return (
    <>
      <table style={{ border: '1px solid black', width: '80%', margin: '-50px auto' }}>
        <thead style={{ border: '1px solid black' }}>
          <tr style={{ border: '1px solid black' }}>
            <th style={{ border: '1px solid black', width: '50%' }}>Назва</th>
            <th style={{ border: '1px solid black', width: 100 }}>Кількість</th>
            <th style={{ border: '1px solid black', width: 150 }}>Ціна</th>
            <th style={{ border: '1px solid black' }}>Сума</th>
          </tr>
        </thead>
        <tbody style={{ border: '1px solid black' }}>
            {
              work.map((a) => (
                <tr>
                  <td style={{ border: '1px solid black' }}>{a.nameWork}</td>
                  <td style={{ border: '1px solid black' }}>{a.countOfWorkOrParts}</td>
                  <td style={{ border: '1px solid black' }}>{a.price}</td>
                  <td style={{ border: '1px solid black' }}>{a.summ}</td>
                </tr>
              ))
            }
        </tbody>
        <tfoot>
          <tr>
            <td style={{padding: '50px 0 0 0'}}>{day}.{month}.{a.getFullYear()}</td>
            <td></td>
            <td style={{padding: '50px 0 0 0'}}>Загалом до сплати</td>
            <td style={{padding: '50px 0 0 0', width: 100}}>{work.map(a => a.summ).reduce((a, b) => a + b, 0)}грн.</td>
          </tr>
        </tfoot>
      </table>
    </>

  );
}

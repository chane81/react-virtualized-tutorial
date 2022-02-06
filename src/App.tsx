import { useEffect, useRef, useState } from 'react';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';
import faker from 'faker';
import chalk from 'chalk';

interface IPeople {
  id: number;
  name: string;
  bio: string;
}

function App() {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    })
  );
  const [people, setPeople] = useState<IPeople[]>([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setPeople(
      [...Array(10000).keys()].map((key) => {
        return {
          id: key,
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          bio: faker.lorem.lines(Math.random() * 100)
        };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();

      console.log(`
        ${chalk.red('timer tik')}: ${chalk.blackBright.bgBlueBright(
        date.toISOString()
      )}`);
      setTime(date);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
      <h1>{time.toISOString()}</h1>

      <div
        style={{
          width: '100%',
          flex: 1,
          padding: '0.2rem 0.2rem',
          borderTop: '1px solid lightgray'
        }}
      >
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={people.length}
              rowRenderer={({ key, index, style, parent }) => {
                const person = people[index];

                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style}>
                      <h2>{person.name}</h2>
                      <p>{person.bio}</p>
                    </div>
                  </CellMeasurer>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>

      <div
        style={{
          height: '10rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderTop: '1px solid lightgray'
        }}
      >
        bottom area
      </div>
    </div>
  );
}

export default App;

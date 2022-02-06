import { useEffect, useState } from 'react';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';
import faker from 'faker';

interface IPeople {
  id: number;
  name: string;
  bio: string;
}

function App() {
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
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>{time.toISOString()}</h1>

      <List
        width={600}
        height={600}
        rowHeight={50}
        rowCount={people.length}
        rowRenderer={({ key, index, style, parent }) => {
          const person = people[index];

          return (
            <div key={key} style={style}>
              <h2>{person.name}</h2>
            </div>
          );
        }}
      />

      {/* <ul>
        {people.map((person) => (
          <li key={person.id}>
            <h2>{person.name}</h2>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;

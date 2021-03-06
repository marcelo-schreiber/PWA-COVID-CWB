import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
  LineSeries,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';
import {
  EventTracker,
  HoverState,
  Stack,
  Animation,
} from '@devexpress/dx-react-chart';

import Layout from '../components/Layout';
import {
  GraphsContainer,
  MainTitle,
  Selection,
  HeaderContainer,
} from '../styles/Graphs';
import { parseData } from '../utils/parseData';

import { FaAngleLeft, FaFlag } from 'react-icons/fa';

function Graphs({ all, week, month, last }) {
  const [filter, setFilter] = useState('Última semana');
  const [xDimension, setXDimension] = useState(0);

  let data;

  switch (filter) {
    case 'Todas':
      data = parseData(all);
      break;
    case 'Última semana':
      data = parseData(week);
      break;
    case 'Último mês':
      data = parseData(month);
      break;
    default:
      data = parseData(all);
      break;
  }

  const updateDimension = () => {
    setXDimension(window.innerWidth);
  };

  useEffect(() => {
    updateDimension();

    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, []);

  const renderFlag = (currColor) => {
    if (currColor === 'amarela') {
      return '#F7C335';
    } else if (currColor === 'laranja') {
      return '#E67D22';
    } else {
      return '#F18685';
    }
  };

  return (
    <Layout title="Dados">
      <Link href="/" passHref={true}>
        <FaAngleLeft
          size={36}
          color="#fafafa"
          style={{ position: 'absolute', top: 5, left: 5, cursor: 'pointer' }}
        />
      </Link>
      <HeaderContainer>
        <MainTitle>
          Curitiba | Bandeira {last.flag}{' '}
          <FaFlag color={`${renderFlag(last.flag)}`} size={24} />
        </MainTitle>
        <Selection onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option>Todas</option>
          <option>Última semana</option>
          <option>Último mês</option>
        </Selection>
      </HeaderContainer>
      <GraphsContainer>
        <Paper elevation={4} style={{ width: '90%', marginBottom: '8.5rem' }}>
          <Chart data={data}>
            <ArgumentAxis showLabels={filter !== 'Todas' && xDimension > 600} />
            <ValueAxis showGrid={true} showTicks={true} />

            <Legend />

            <BarSeries
              name="Casos ativos"
              valueField="total_active"
              argumentField="date"
              color="#F7C335"
            />
            <BarSeries
              name="Óbitos"
              valueField="total_deaths"
              argumentField="date"
              color="#F18685"
            />

            <EventTracker />
            <Tooltip />
            <HoverState />

            <Stack />

            <Title text="Casos e Óbitos" />

            <Animation duration={500} />
          </Chart>
        </Paper>
        <Paper elevation={4} style={{ width: '90%' }}>
          <Chart data={data}>
            <ArgumentAxis showLabels={xDimension > 830} />
            <ValueAxis showGrid={true} showTicks={true} />
            <Legend />

            <LineSeries
              name="Confirmados"
              valueField="total_confirmed"
              argumentField="date"
              color="#3638AD"
            />
            <LineSeries
              name="Recuperados"
              valueField="total_recovered"
              argumentField="date"
              color="#78B673"
            />

            <Title text="Total de confirmados e recuperados" />

            <EventTracker />
            <Tooltip />
            <HoverState />

            <Animation duration={1500} />
          </Chart>
        </Paper>
        <Paper elevation={4} style={{ width: '90%', margin: '8.5rem 0rem' }}>
          <Chart data={data}>
            <ArgumentAxis showLabels={xDimension > 830} />
            <ValueAxis showGrid={true} showTicks={true} />

            <Legend />

            <BarSeries
              name="Ocupação leitos (%)"
              valueField="ocupation"
              argumentField="date"
              color="#F18685"
            />

            <Title text="Ocupação dos leitos UTI (SUS)" />

            <EventTracker />
            <HoverState />

            <Tooltip
              contentComponent={(props) => (
                <Tooltip.Content text={`${props.text}%`} />
              )}
            />

            <Animation duration={2500} />
          </Chart>
        </Paper>
      </GraphsContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  const all = await fetch(`https://cwb-covid.herokuapp.com/api/all`);
  const week = await fetch(
    `https://cwb-covid.herokuapp.com/api/filter?offset=0&limit=7`
  );
  const month = await fetch(
    `https://cwb-covid.herokuapp.com/api/filter?offset=0&limit=30`
  );

  const last = await fetch(`https://cwb-covid.herokuapp.com/api/last`);

  const allJson = await all.json();
  const weekJson = await week.json();
  const monthJson = await month.json();
  const lastJson = await last.json();

  return {
    // * reverse so the most recent data is at the most right
    props: {
      all: allJson.reverse(),
      week: weekJson.reverse(),
      month: monthJson.reverse(),
      last: lastJson,
    }, // will be passed to the page component as props
    revalidate: 7200,
  };
}

export default Graphs;

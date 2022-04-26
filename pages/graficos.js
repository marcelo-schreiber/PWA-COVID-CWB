import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

import Layout from '../components/Layout';
import {
  GraphsContainer,
  MainTitle,
  Selection,
  HeaderContainer,
} from '../styles/Graphs';
import { parseData } from '../utils/parseData';

import { FaAngleLeft } from 'react-icons/fa';

function Graphs({ all, week, month, last }) {
  const [filter, setFilter] = useState('Todas');

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
        <MainTitle>Curitiba | Bandeira {last.flag} </MainTitle>
        <Selection onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option>Todas</option>
          <option>Última semana</option>
          <option>Último mês</option>
        </Selection>
      </HeaderContainer>
      <GraphsContainer>
        {/*
  {
    flag: 'amarela',
    total_recovered: 287482,
    total_active: 1695,
    total_confirmed: 296929,
    total_deaths: 7752,
    avaliable_hospital_beds: 88,
    date: '05/11',
    ocupation: 47
  },
*/}
        <ResponsiveContainer height={375} width="95%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_active"
              name="Casos Ativos"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer height={375} width="95%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_recovered"
              name="Recuperados"
              stroke="#78B673"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="total_confirmed"
              name="Confirmados"
              stroke="#3638AD"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="total_deaths"
              name="Óbitos Total"
              stroke="#F18685"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={375} width="95%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="ocupation"
              name="Ocupação leitos (%)"
              stroke="#a95e5d"
              fill="#F18685"
            />
          </AreaChart>
        </ResponsiveContainer>
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

/* eslint-disable @next/next/no-img-element */
import { Cards, Country, Chart } from 'components';
import { CovidProvider } from 'context';

const Dashboard = () => {
  return (
    <CovidProvider>
      <div className="container">
        <img className="image" src={'covid-19.png'} alt="COVID-19" />
        <Cards />
        <Country />
        <Chart />
      </div>
    </CovidProvider>
  );
};

export default Dashboard;

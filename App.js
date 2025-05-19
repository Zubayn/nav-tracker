import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function App() {
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/nav-history')
      .then((res) => res.json())
      .then((data) => setNavData(data));
  }, []);

  const chartData = {
    labels: navData.map((entry) => entry.date),
    datasets: [
      {
        label: 'NAV',
        data: navData.map((entry) => entry.nav),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Public Mutual NAV Tracker</h1>
      <Line data={chartData} />
    </div>
  );
}

export default App;
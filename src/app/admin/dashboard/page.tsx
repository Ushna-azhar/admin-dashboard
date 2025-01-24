'use client'

import Chart from "@/components/Chart";

const Dashboard = () => {
  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales Overview",
        data: [500, 600, 700, 800, 900, 1000],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Chart Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Chart data={salesData} />
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-lg">Total Sales:</span>
              <span className="font-semibold">$6,000</span>
            </li>
            <li className="flex justify-between">
              <span className="text-lg">New Customers:</span>
              <span className="font-semibold">150</span>
            </li>
            <li className="flex justify-between">
              <span className="text-lg">Orders Today:</span>
              <span className="font-semibold">25</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

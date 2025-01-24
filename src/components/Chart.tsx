// src/components/chart.tsx
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { ChartData } from "chart.js"; // Import the ChartData type

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
  data: ChartData<'bar'>; // Specify the data type for a Bar chart
}

const Chart = ({ data }: ChartProps) => {
  return (
    <div className="mb-8">
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: { display: true, text: "Sales Overview" },
          },
        }}
      />
    </div>
  );
};

export default Chart;

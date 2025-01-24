// src/components/chart.tsx
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ data }: { data: any }) => {
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

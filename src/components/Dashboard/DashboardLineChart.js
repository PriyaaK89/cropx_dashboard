import { Line } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);


const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Users Growth",
      data: [30, 45, 60, 80, 75, 90, 110],
      borderColor: "rgba(49, 130, 206, 1)",
      backgroundColor: "rgba(49, 130, 206, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
  },
};

 const DashboardLineChart = () => (
  <Box bg="white" p={4} borderRadius="lg" boxShadow="md">
    <Text fontSize="lg" fontWeight="bold" mb={3}>
      Users Growth
    </Text>
    <Line data={lineData} options={lineOptions} />
  </Box>
);
export default DashboardLineChart;

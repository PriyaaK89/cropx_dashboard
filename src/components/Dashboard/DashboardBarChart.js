import { Bar } from "react-chartjs-2";
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


const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Monthly Users",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(72, 187, 120, 0.6)",
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
  },
};

 const DashboardBarChart = () => (
  <Box bg="white" p={4} borderRadius="lg" boxShadow="md">
    <Text fontSize="lg" fontWeight="bold" mb={3}>
      Monthly Users
    </Text>
    <Bar data={barData} options={barOptions} />
  </Box>
);
 export default DashboardBarChart;

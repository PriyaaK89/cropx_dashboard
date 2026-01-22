import { Bar } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
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
  maintainAspectRatio: false,   // ✅ prevent layout shift
  plugins: {
    legend: { display: false }, // ✅ lighter render
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
};

const DashboardBarChart = () => (
  <Box
    bg="white"
    p={4}
    borderRadius="xl"
    boxShadow="sm"
    h="320px"          // ✅ fixed height for stability
    mx={{ base: 3, md: 3, lg: 0 }}
  >
    <Text fontSize="lg" fontWeight="bold" mb={3}>
      Monthly Users
    </Text>
    <Bar data={barData} options={barOptions} />
  </Box>
);

export default DashboardBarChart;

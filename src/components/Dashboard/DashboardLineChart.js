import { Line } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      pointRadius: 3,          //  lighter points
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,   //  no layout shift
  plugins: {
    legend: { display: false }, //  reduce render cost
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
};

const DashboardLineChart = () => (
  <Box
  bg={useColorModeValue("white", "#1E293B")}
  color={useColorModeValue("gray.800", "white")}
    p={4}
    borderRadius="xl"
    boxShadow="sm"
    h="320px"                   //  fixed height
    mx={{ base: 3, md: 3, lg: 0 }}
  >
    <Text fontSize="lg" fontWeight="bold" mb={3}>
      Users Growth
    </Text>
    <Line data={lineData} options={lineOptions} />
  </Box>
);

export default DashboardLineChart;

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMostPopular } from "../../app/services/metrics/metricsThunk";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChartPost() {
  const labels = useSelector((state) => state.metrics.titles);
  const data = useSelector((state) => state.metrics.counts_titles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostPopular());
  }, [dispatch]);
  return (
    <Container
      sx={{ maxHeight: 500, display: "flex", justifyContent: "center" }}
    >
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Bar Chart Hora mas frecuentada en el blog",
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: "Cantidad de visitas",
              data,
              backgroundColor: "rgba(53,162,235, 0.6)",
            },
          ],
        }}
      />
    </Container>
  );
}

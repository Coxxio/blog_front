import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesClicked,
  getMostVisitedHour,
} from "../../app/services/metrics/metricsThunk";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export function LineChartHours() {
  const labels = useSelector((state) => state.metrics.dates);
  const data = useSelector((state) => state.metrics.counts_dates);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostVisitedHour());
  }, [dispatch]);
  return (
    <Container
      sx={{ maxHeight: 500, display: "flex", justifyContent: "center" }}
    >
      <Line
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
              fill: true,
              data,
              backgroundColor: "rgba(255,99,231,0.6)",
            },
          ],
        }}
      />
    </Container>
  );
}

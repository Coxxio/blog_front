import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesClicked } from "../../app/services/metrics/metricsThunk";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChartCategories() {
  const labels = useSelector((state) => state.metrics.categories);
  const data = useSelector((state) => state.metrics.counts_categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesClicked());
  }, [dispatch]);
  return (
    <Container
      sx={{ maxHeight: 500, display: "flex", justifyContent: "center" }}
    >
      <Pie
        data={{
          labels,
          datasets: [
            {
              label: "Cantidad de Visitas",
              data,
              backgroundColor: [
                "rgba(255,99,231,0.5)",
                "rgba(54,162,235,0.5)",
                "rgba(255,206,86,0.5)",
                "rgba(75,192,192,0.5)",
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54,162,235,1)",
                "rgba(255,206,86,1)",
                "rgba(75,192,192,1)",
              ],
            },
          ],
        }}
      />
    </Container>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PieChartCategories } from "../components/MetricsComponents/PieChartCategories";
import { BarChartPost } from "../components/MetricsComponents/BarChartPost";
import { LineChartHours } from "../components/MetricsComponents/LineChartHours";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Metrics({ user }) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Categorias Mas Visitadas" {...a11yProps(0)} />
          <Tab label="Horas mas Frecuentes" {...a11yProps(1)} />
          <Tab label="Post Mas Visitados" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PieChartCategories />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LineChartHours />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BarChartPost />
      </TabPanel>
    </Box>
  );
}

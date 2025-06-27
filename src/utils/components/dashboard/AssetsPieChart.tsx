import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Box, Card, CardContent, Typography } from '@mui/material';
import type {FC} from "react";

type AssetsBySectorPieChartProps = {
  assetsBySector: Record<string, number>;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AssetsBySectorPieChart: FC<AssetsBySectorPieChartProps> = ({ assetsBySector }) => {
  const data = Object.entries(assetsBySector).map(([sector, value]) => ({
    name: sector,
    value,
  }));

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Assets by Sector
        </Typography>

        {data.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No sector data available.
          </Typography>
        ) : (
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetsBySectorPieChart;

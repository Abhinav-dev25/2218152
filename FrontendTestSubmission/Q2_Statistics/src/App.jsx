
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Log } from "../../../LoggingMiddleware/log";

const token = "YOUR_ACCESS_TOKEN_HERE"; // Replace

const mockStats = [
  {
    short: "http://localhost:3000/abcd1",
    created: "2024-07-10 10:00",
    expires: "2024-07-10 10:30",
    clicks: 3,
    details: [
      { time: "10:01", source: "WhatsApp", location: "Delhi" },
      { time: "10:05", source: "LinkedIn", location: "Noida" },
      { time: "10:10", source: "Email", location: "Mumbai" }
    ]
  }
];

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Log("frontend", "info", "component", "Loading stats page", token);
    setData(mockStats);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">URL Statistics</Typography>
      {data.map((d, i) => (
        <Paper key={i} sx={{ p: 2, mt: 2 }}>
          <Typography><strong>Short URL:</strong> {d.short}</Typography>
          <Typography><strong>Created:</strong> {d.created}</Typography>
          <Typography><strong>Expires:</strong> {d.expires}</Typography>
          <Typography><strong>Total Clicks:</strong> {d.clicks}</Typography>
          <Typography sx={{ mt: 1 }}>Click Details:</Typography>
          {d.details.map((click, j) => (
            <Box key={j} sx={{ ml: 2 }}>
              <Typography>- {click.time} | {click.source} | {click.location}</Typography>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
}

export default App;

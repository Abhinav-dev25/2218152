
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Log } from "../../../LoggingMiddleware/log";

const token = "QAhDUr"; // Replace with your real token

function App() {
  const [urls, setUrls] = useState([
    { url: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addInput = () => {
    if (urls.length < 5) setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
  };

  const validateUrl = (url) => /^(https?):\/\/.+/.test(url);

  const handleShorten = async () => {
    const filtered = urls.filter((u) => u.url.trim() !== "");

    for (let i = 0; i < filtered.length; i++) {
      const { url, validity, shortcode } = filtered[i];
      if (!validateUrl(url)) {
        alert(`Invalid URL: ${url}`);
        return;
      }
      const payload = {
        originalUrl: url,
        validity: validity ? parseInt(validity) : 30,
        customCode: shortcode.trim() || null,
      };

      try {
        await Log("frontend", "info", "component", `Shortening URL: ${url}`, token);
        const shortCode = shortcode || Math.random().toString(36).substring(2, 7);
        const expiry = new Date(Date.now() + (payload.validity || 30) * 60000);
        setResults((prev) => [
          ...prev,
          {
            short: `http://localhost:3000/${shortCode}`,
            expiry: expiry.toLocaleString(),
            original: url
          },
        ]);
      } catch (err) {
        alert("Failed to shorten URL");
        Log("frontend", "error", "component", err.message, token);
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((u, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Original URL"
            value={u.url}
            onChange={(e) => handleChange(idx, "url", e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Validity (min)"
            type="number"
            value={u.validity}
            onChange={(e) => handleChange(idx, "validity", e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Custom Shortcode"
            value={u.shortcode}
            onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
          />
        </Box>
      ))}
      <Button variant="contained" onClick={addInput}>+ Add</Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleShorten}>Shorten</Button>

      {results.map((res, i) => (
        <Box key={i} sx={{ mt: 2 }}>
          <Typography><strong>Original:</strong> {res.original}</Typography>
          <Typography><strong>Short:</strong> <a href={res.short}>{res.short}</a></Typography>
          <Typography><strong>Expires:</strong> {res.expiry}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default App;


export async function Log(stack, level, pkg, message, token) {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
    const data = await res.json();
    console.log("Log sent:", data.message);
  } catch (error) {
    console.error("Failed to log:", error);
  }
}

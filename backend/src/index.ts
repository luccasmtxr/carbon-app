import { createApp } from './app';

const PORT = process.env.PORT || 7007;
const app = createApp();

app.listen(PORT, () => {
  console.log(`🚀 server running at http://localhost:${PORT}`);
});

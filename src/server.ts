import app from './app';
import config from './config/base';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
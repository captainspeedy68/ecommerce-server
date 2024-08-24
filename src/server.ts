import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
const port = process.env.PORT || 3000
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(port, () => {
      // console.log(`Example app listening on port ${config.port}`);
    });
  } catch {
    // console.log(err);
  }
}

main();

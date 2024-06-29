import { exec } from "child_process";

exec(
  `ngrok http --domain=${process.env.NGROK_DOMAIN} 3033`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running ngrok: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ngrok stderr: ${stderr}`);
      return;
    }
    console.log(`ngrok stdout: ${stdout}`);
  }
);

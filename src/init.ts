import { CronJob } from "cron";

export const initServer = async () => {
  console.log("Running migrations.");
  const job = new CronJob(
    "*/10 * * * * *",
    function () {
      console.log("You will see this message every 10 seconds");
    },
    null,
    true,
    "Europe/Rome"
  );
};

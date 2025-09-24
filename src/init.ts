import { CronJob } from "cron";

export const initServer = async () => {
  console.log("Running migrations.");
  const job = new CronJob(
    "*/8 * * * * *", // cronTime
    function () {
      console.log("You will see this message every 8 seconds");
    }, // onTick
    null, // onComplete
    true, // start
    "Europe/Rome" // timeZone
  );
};

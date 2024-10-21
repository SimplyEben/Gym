import { CorsOptions } from "cors";

const whitelist: string[] = [
  "https://wearyourfeelings.shop",
  "https://www.wearyourfeelings.shop",
  "wearyourfeelings.shop",
  "http://192.168.0.102:5173",
  "http://10.8.0.3:5173",
  "http://localhost:5173",
  "https://wear-your-feelings.vercel.app",
  "https://wear-your-feelings-genics85s-projects.vercel.app/",
  "https://wear-your-feelings-git-main-genics85s-projects.vercel.app/",
  "https://wear-your-feelings-1piunzfkg-genics85s-projects.vercel.app",
];

const inProduction = process.env.PRODUCTION == "1";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!inProduction) {
      callback(null, true);
      return;
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Not allowed by CORS: ", origin);
      return;
    }
  },
};

export default corsOptions;

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "5dmi8n",
  e2e: {
    baseUrl: "http://localhost:5173/",
  },
});

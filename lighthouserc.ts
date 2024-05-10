module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "npm run dev",
      url: ["http://localhost:5173/"],
      settings: {
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
          // pwa
        ],
        skipAudits: ["uses-http2"],
        chromeFlags: "--no-sandbox",
        extraHeaders: JSON.stringify({
          Cookie: "customCookie",
        }),
      },
    },
    assert: {
      assertions: {
        "categories:performance": [
          "error",
          {
            minScore: 0.7,
            aggregationMethod: "mediun-run",
          },
        ],
        "categories:accessibility": [
          "error",
          {
            minScore: 0.7,
            aggregationMethod: "pessimistic",
          },
        ],
        "categories:best-practices": [
          "error",
          {
            minScore: 0.7,
            aggregationMethod: "pessimistic",
          },
        ],
        "categories:seo": [
          "error",
          {
            minScore: 0.7,
            aggregationMethod: "pessimistic",
          },
        ],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

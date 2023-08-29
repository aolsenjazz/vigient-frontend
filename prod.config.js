module.exports = {
  apps: [
    {
      name: 'frontend-prod',
      script: 'serve -s build',
      env: {
        PORT: 3005,
        NODE_ENV: 'production',

        REACT_APP_VigientAPIKey: 'R6jF9kL2pT5wE8rQ0aZ3sX7cV1bN4mJ7kL9',
      },
    },
  ],
};

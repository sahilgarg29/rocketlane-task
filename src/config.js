const config = {
  // required config props
  clientKey: "7f23f5e83ed98dd456fe",
  cluster: "ap2",

  // optional if you'd like to trigger events. BYO endpoint.
  // see "Trigger Server" below for more info
  triggerEndpoint: "/pusher/trigger",

  // required for private/presence channels
  // also sends auth headers to trigger endpoint
  authEndpoint: "/pusher/auth",
  auth: {
    headers: { Authorization: "Bearer token" },
  },
};

export default config;

module.exports = {
  presets: [
    [
      '@ghostgroup/create-moonshot-app/babel',
      {
        alias: {
          models: './lib/data-access/models',
        },
      },
    ],
  ],
};

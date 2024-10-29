const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = (config) => {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents += `
    // Add MMKV dependencies
    implementation 'com.tencent:mmkv:1.2.1'
    `;
    return config;
  });
};

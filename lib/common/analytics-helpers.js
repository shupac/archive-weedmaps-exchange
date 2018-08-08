export function setAmplitudeUserProperties(userProps) {
  window.amplitude.getInstance().setUserProperties(userProps);
}

export function logAmplitudeEvent(name, params, userId) {
  window.amplitude.getInstance().setUserId(userId);
  window.amplitude.getInstance().logEvent(name, params);
}

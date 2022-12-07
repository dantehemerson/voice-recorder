export enum AlertStatus {
  ERROR,
}

export const AlertStatuses = {
  [AlertStatus.ERROR]: {
    icon: <i>(i)</i>,
    colorScheme: '#fccccc',
  },
};

export function getAlertColorScheme(status: AlertStatus) {
  return AlertStatuses[status].colorScheme;
}

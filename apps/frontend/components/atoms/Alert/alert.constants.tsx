export enum AlertStatus {
  ERROR,
}

export const AlertStatuses = {
  [AlertStatus.ERROR]: {
    icon: <i>(i)</i>,
    colorScheme: '#ffe5e9',
    border: '#ff4d4d',
    color: '#d02828',
  },
};

export function getAlertColor(status: AlertStatus) {
  return AlertStatuses[status];
}

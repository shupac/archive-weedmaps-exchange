const DraggableTypes = {
  NEW_ORDER_CARD: 'new-order-card',
  IN_PROGRESS_CARD: 'in-progress-card',
};

export const TAX_LICENSE_TYPES = [
  { text: 'Adult and Medical Use', value: 'all' },
  { text: 'Adult Use', value: 'recreational' },
  { text: 'Medical Use', value: 'medical' },
];

export const LICENSE_TYPES = [
  'Adult-Use Cultivation',
  'Adult-Use Mfg',
  'Adult-Use & Medical Use',
  'Adult-Use Non Store-front',
  'Adult-Use Retail',
  'Distributor',
  'Event',
  'Medical Cultivation',
  'Medical Mfg',
  'Medical Non Store-front',
  'Medical Retail',
  'Microbusiness',
  'Testing Lab',
];

export const STATUS_TYPES = {
  not_started: {
    text: 'not started',
    cancelable: true,
    returnable: false,
  },
  in_progress: {
    text: 'in progress',
    cancelable: true,
    returnable: false,
  },
  shipped: {
    text: 'shipped',
    cancelable: false,
    returnable: true,
  },
  canceled: {
    text: 'canceled',
    cancelable: false,
    returnable: false,
  },
  completed: {
    text: 'completed',
    cancelable: false,
    returnable: true,
  },
  returned: {
    text: 'returned',
    cancelable: false,
    returnable: false,
  },
};

export const TAX_USE_TYPES = [
  { text: 'Sales', value: 'sales' },
  { text: 'Excise', value: 'excise' },
];

export const TAX_CATEGORIES = [
  { text: 'INDICA', value: 'indica' },
  { text: 'SATIVA', value: 'sativa' },
  { text: 'HYBRID', value: 'hybrid' },
  { text: 'EDIBLE', value: 'edible' },
  { text: 'CONCENTRATE', value: 'concentrate' },
  { text: 'DRINK', value: 'drink' },
  { text: 'CLONE', value: 'clone' },
  { text: 'SEED', value: 'seed' },
  { text: 'TINCTURE', value: 'tincture' },
  { text: 'GEAR', value: 'gear' },
  { text: 'TOPICALS', value: 'topicals' },
  { text: 'PREROLL', value: 'preroll' },
  { text: 'WAX', value: 'wax' },
];

export const ALERT_STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default DraggableTypes;

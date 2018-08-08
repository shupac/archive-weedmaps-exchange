import { schedule } from 'danger';
import wm, { bigSnapshots } from '@ghostgroup/danger-plugins';

wm();

schedule(bigSnapshots(50, false));

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateTime = date => {
  return dayjs.utc(date).local().format('DD MMM YYYY, hh:mm A');
};

export const formatShortDate = date => {
  return dayjs.utc(date).local().format('MMM DD, YYYY');
};

export const formatTime = date => {
  return dayjs.utc(date).local().format('hh:mm A');
};

export const formatRelativeTime = date => {
  return dayjs.utc(date).local().fromNow();
};

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

export const formatDateForAPI = date => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const parseDateFromAPI = dateString => {
  if (!dateString) return null;

  if (dateString instanceof Date) {
    return dateString;
  }

  if (typeof dateString !== 'string') {
    return null;
  }

  // Remove time part if exists
  const dateOnly = dateString.split('T')[0];

  const [year, month, day] = dateOnly.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

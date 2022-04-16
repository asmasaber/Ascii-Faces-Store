import React, { memo } from 'react';
import PropTypes from 'prop-types';

const RelativeTime = memo(({ date }) => {
  const time = (() => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;

    var elapsed =  +new Date() - +new Date(date)
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours';
    } else if (elapsed < msPerWeek) {
      return Math.round(elapsed / msPerDay) + ' day';
    } else {
      return new Date(date).toLocaleDateString();
    }
  })();

  return (
    <>
      <span>since:</span> {time}
    </>
  );
});

RelativeTime.propTypes = {
  date: PropTypes.string.isRequired,
};

export { RelativeTime };
/* eslint-disable react/prop-types */
import React from 'react';
import { format, parseISO } from 'date-fns';

function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
  );
}

export default Date;

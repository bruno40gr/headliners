"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import PrivateLessonsPage from '../PrivateLessonsPage';
import { useNextNavigate } from './useNextNavigate';

export default function PrivateLessonsRoute() {
  const navigate = useNextNavigate();
  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <PrivateLessonsPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
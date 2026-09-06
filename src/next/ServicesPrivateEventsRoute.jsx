"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import ServicesPrivateEventsPage from '../ServicesPrivateEventsPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesPrivateEventsRoute() {
  const navigate = useNextNavigate();

  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <ServicesPrivateEventsPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
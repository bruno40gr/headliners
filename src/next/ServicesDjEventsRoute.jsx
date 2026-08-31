"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import ServicesDjEventsPage from '../ServicesDjEventsPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesDjEventsRoute() {
  const navigate = useNextNavigate();

  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <ServicesDjEventsPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
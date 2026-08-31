"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import ServicesPaRentalPage from '../ServicesPaRentalPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesPaRentalRoute() {
  const navigate = useNextNavigate();

  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <ServicesPaRentalPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
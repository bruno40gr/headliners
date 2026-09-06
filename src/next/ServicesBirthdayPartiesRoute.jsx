"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import ServicesBirthdayPartiesPage from '../ServicesBirthdayPartiesPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesBirthdayPartiesRoute() {
  const navigate = useNextNavigate();

  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <ServicesBirthdayPartiesPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
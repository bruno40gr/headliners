"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import ServicesRehearsalSpacePage from '../ServicesRehearsalSpacePage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesRehearsalSpaceRoute() {
  const navigate = useNextNavigate();

  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <ServicesRehearsalSpacePage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
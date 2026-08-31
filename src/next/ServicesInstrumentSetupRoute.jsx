"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import ServicesInstrumentSetupPage from '../ServicesInstrumentSetupPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesInstrumentSetupRoute() {
  const navigate = useNextNavigate();

  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <ServicesInstrumentSetupPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
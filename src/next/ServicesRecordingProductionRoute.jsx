"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import ServicesRecordingProductionPage from '../ServicesRecordingProductionPage';
import { useNextNavigate } from './useNextNavigate';

export default function ServicesRecordingProductionRoute() {
  const navigate = useNextNavigate();

  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <ServicesRecordingProductionPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
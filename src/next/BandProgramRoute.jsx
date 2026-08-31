"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import BandProgramPage from '../BandProgramPage';
import { useNextNavigate } from './useNextNavigate';

export default function BandProgramRoute() {
  const navigate = useNextNavigate();
  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <BandProgramPage setPath={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
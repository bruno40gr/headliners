"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import FundingSupportPage from '../FundingSupportPage';
import { useNextNavigate } from './useNextNavigate';

export default function FundingSupportRoute() {
  const navigate = useNextNavigate();
  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <FundingSupportPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
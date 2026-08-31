"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import CareersPage from '../CareersPage';
import { useNextNavigate } from './useNextNavigate';

export default function CareersRoute() {
  const navigate = useNextNavigate();
  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <CareersPage setPath={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import TeachersPage from '../TeachersPage';
import { useNextNavigate } from './useNextNavigate';

export default function TeachersRoute() {
  const navigate = useNextNavigate();
  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <TeachersPage setPath={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
"use client";

import { useState } from 'react';
import BookingModal from '../BookingModal';
import AboutStoryPage from '../AboutStoryPage';
import { useNextNavigate } from './useNextNavigate';

export default function OurStoryRoute() {
  const navigate = useNextNavigate();
  const [bookingFor, setBookingFor] = useState(null);

  return (
    <>
      <AboutStoryPage navigate={navigate} onRequestLessons={(instrument = '') => setBookingFor(instrument)} />
      {bookingFor !== null && <BookingModal instrument={bookingFor} onClose={() => setBookingFor(null)} />}
    </>
  );
}
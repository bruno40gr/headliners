"use client";

import SpecialOfferPage from '../SpecialOfferPage';
import { useNextNavigate } from './useNextNavigate';

export default function SpecialOfferRoute() {
  const navigate = useNextNavigate();

  return <SpecialOfferPage navigate={navigate} />;
}
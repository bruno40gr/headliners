"use client";

import ServicesRecordingProductionPage from '../ServicesRecordingProductionPage';
import ServicePreviewLayout from './ServicePreviewLayout';

export default function RecordingProductionPreview() {
  return <ServicesRecordingProductionPage PageComponent={ServicePreviewLayout} contentOverrides={{
    title: 'Recording Studio',
    subtitle: 'Full-service recording spaces in the heart of Rocklin.',
    intro: 'Headliner Music Academy’s Recording Studio offers recording, mixing, mastering, and multimedia production with two distinct live room studio spaces.',
  }} />;
}
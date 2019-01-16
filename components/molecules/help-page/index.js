import React from 'react';
import {
  HelpWrapper,
  HelpTitle,
  HelpContent,
  HelpContactText,
  EmailLink,
} from './styles';

export const HelpPage = () => (
  <HelpWrapper>
    <HelpTitle data-test-id="help-title">Help</HelpTitle>
    <HelpContent>
      <span>
        Need assistance with Weedmaps Exchange? We&#39;re happy to help.
      </span>
      <HelpContactText>Contact Phone</HelpContactText>
      <span data-test-id="contact-phone">1-844-WEEDMAPS (933-3627)</span>
      <HelpContactText>Contact Email</HelpContactText>
      <EmailLink
        data-test-id="contact-email"
        href="mailto:customerservice@weedmaps.com"
      >
        customerservice@weedmaps.com
      </EmailLink>
    </HelpContent>
  </HelpWrapper>
);

export default HelpPage;

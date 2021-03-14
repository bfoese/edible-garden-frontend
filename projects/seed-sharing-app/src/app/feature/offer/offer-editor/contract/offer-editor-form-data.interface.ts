import { AddressFormData } from './address-form-data.interface';
import { OfferDescriptionFormData } from './offer-description-form-data.interface';

export interface OfferEditorFormData {
  offerAddress: AddressFormData;
  offerDesc: OfferDescriptionFormData;
  offerContact: unknown;
}

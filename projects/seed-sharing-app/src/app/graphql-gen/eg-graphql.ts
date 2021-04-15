import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type AddressInput = {
  line1?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
};

export type AddressType = {
  __typename?: 'AddressType';
  line1?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  patchAccountSettings: SeedSharingAccountDto;
};


export type MutationPatchAccountSettingsArgs = {
  patchData: PatchSeedSharingAccountDto;
};

export type PatchSeedSharingAccountDto = {
  preferredLocale?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
  phoneNumber?: Maybe<PhoneNumberInput>;
};

export type PhoneNumberInput = {
  phoneNo?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['Float']>;
};

export type PhoneNumberType = {
  __typename?: 'PhoneNumberType';
  phoneNo?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  accountSettings: SeedSharingAccountDto;
};

export type SeedSharingAccountDto = {
  __typename?: 'SeedSharingAccountDto';
  userId: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  preferredLocale?: Maybe<Scalars['String']>;
  address?: Maybe<AddressType>;
  phoneNumber?: Maybe<PhoneNumberType>;
};

export type AccountSettingsResolverQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountSettingsResolverQuery = (
  { __typename?: 'Query' }
  & { accountSettings: (
    { __typename?: 'SeedSharingAccountDto' }
    & Pick<SeedSharingAccountDto, 'userId' | 'username' | 'email' | 'preferredLocale'>
    & { address?: Maybe<(
      { __typename?: 'AddressType' }
      & Pick<AddressType, 'line1' | 'city'>
    )> }
  ) }
);

export const AccountSettingsResolverDocument = gql`
    query AccountSettingsResolver {
  accountSettings {
    userId
    username
    email
    preferredLocale
    address {
      line1
      city
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AccountSettingsResolverGQL extends Apollo.Query<AccountSettingsResolverQuery, AccountSettingsResolverQueryVariables> {
    document = AccountSettingsResolverDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
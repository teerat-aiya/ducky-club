export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  Upload: any;
};

export type ResponseElement = {
  altText?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  opts?: Maybe<Scalars['JSON']>;
  payload?: Maybe<Scalars['JSON']>;
  type?: Maybe<ResponseElementType>;
};


export enum ResponseElementType {
  CardMessage = 'CardMessage',
  Flex = 'Flex',
  GenericTemplate = 'GenericTemplate',
  Image = 'Image',
  Imagemap = 'Imagemap',
  OptInMessage = 'OptInMessage',
  RichMessage = 'RichMessage',
  RichVideo = 'RichVideo',
  Text = 'Text'
}
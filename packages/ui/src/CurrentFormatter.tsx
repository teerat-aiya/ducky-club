import React from 'react';

interface CurrencyInfo {
  symbol: string;
  position: 'before' | 'after';
}

type CurrencyCode = 'AED' | 'ARS' | 'AUD' | 'BDT' | 'BOB' | 'BRL' | 'CAD' | 'CHF' | 'CLP' | 'CNY' | 'COP' | 'CRC' | 'CZK' | 'DKK' | 'DZD' | 'EGP' | 'EUR' | 'GBP' | 'GTQ' | 'HKD' | 'HNL' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'ISK' | 'JPY' | 'KES' | 'KRW' | 'MOP' | 'MXN' | 'MYR' | 'NGN' | 'NIO' | 'NOK' | 'NZD' | 'PEN' | 'PHP' | 'PKR' | 'PLN' | 'PYG' | 'QAR' | 'RON' | 'RUB' | 'SAR' | 'SEK' | 'SGD' | 'THB' | 'TRY' | 'TWD' | 'USD' | 'UYU' | 'VEF' | 'VND' | 'ZAR';

const currencyData: Record<CurrencyCode, CurrencyInfo> = {
  AED: { symbol: 'د.إ', position: 'before' },
  ARS: { symbol: '$', position: 'before' },
  AUD: { symbol: 'A$', position: 'before' },
  BDT: { symbol: '৳', position: 'before' },
  BOB: { symbol: 'Bs.', position: 'before' },
  BRL: { symbol: 'R$', position: 'before' },
  CAD: { symbol: 'C$', position: 'before' },
  CHF: { symbol: 'Fr.', position: 'before' },
  CLP: { symbol: '$', position: 'before' },
  CNY: { symbol: '¥', position: 'before' },
  COP: { symbol: '$', position: 'before' },
  CRC: { symbol: '₡', position: 'before' },
  CZK: { symbol: 'Kč', position: 'after' },
  DKK: { symbol: 'kr', position: 'after' },
  DZD: { symbol: 'د.ج', position: 'before' },
  EGP: { symbol: 'E£', position: 'before' },
  EUR: { symbol: '€', position: 'before' },
  GBP: { symbol: '£', position: 'before' },
  GTQ: { symbol: 'Q', position: 'before' },
  HKD: { symbol: 'HK$', position: 'before' },
  HNL: { symbol: 'L', position: 'before' },
  HUF: { symbol: 'Ft', position: 'after' },
  IDR: { symbol: 'Rp', position: 'before' },
  ILS: { symbol: '₪', position: 'before' },
  INR: { symbol: '₹', position: 'before' },
  ISK: { symbol: 'kr', position: 'after' },
  JPY: { symbol: '¥', position: 'before' },
  KES: { symbol: 'KSh', position: 'before' },
  KRW: { symbol: '₩', position: 'before' },
  MOP: { symbol: 'MOP$', position: 'before' },
  MXN: { symbol: '$', position: 'before' },
  MYR: { symbol: 'RM', position: 'before' },
  NGN: { symbol: '₦', position: 'before' },
  NIO: { symbol: 'C$', position: 'before' },
  NOK: { symbol: 'kr', position: 'after' },
  NZD: { symbol: 'NZ$', position: 'before' },
  PEN: { symbol: 'S/', position: 'before' },
  PHP: { symbol: '₱', position: 'before' },
  PKR: { symbol: '₨', position: 'before' },
  PLN: { symbol: 'zł', position: 'after' },
  PYG: { symbol: '₲', position: 'before' },
  QAR: { symbol: 'ر.ق', position: 'before' },
  RON: { symbol: 'lei', position: 'after' },
  RUB: { symbol: '₽', position: 'after' },
  SAR: { symbol: 'ر.س', position: 'before' },
  SEK: { symbol: 'kr', position: 'after' },
  SGD: { symbol: 'S$', position: 'before' },
  THB: { symbol: '฿', position: 'before' },
  TRY: { symbol: '₺', position: 'before' },
  TWD: { symbol: 'NT$', position: 'before' },
  USD: { symbol: '$', position: 'before' },
  UYU: { symbol: '$U', position: 'before' },
  VEF: { symbol: 'Bs.', position: 'before' },
  VND: { symbol: '₫', position: 'after' },
  ZAR: { symbol: 'R', position: 'before' }
};

const formatNumber = (num: number): string => {
  try {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(1);
  } catch (error) {
    return "0"
  }
};

interface CurrencyFormatterProps {
  amount?: number;
  currency?: CurrencyCode | string;
}

export const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({ amount = 0, currency }) => {
  const currencyInfo = currencyData[currency as CurrencyCode] || { symbol: currency, position: 'before' };
  const formattedAmount = formatNumber(amount);

  return (
    <span>
      {currencyInfo.position === 'before' ? currencyInfo.symbol : ''}
      {formattedAmount}
      {currencyInfo.position === 'after' ? currencyInfo.symbol : ''}
    </span>
  );
};

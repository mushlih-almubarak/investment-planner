export const currencies = {
  "North America": [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  ],
  "Europe": [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  ],
  "Asia": [
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  ],
  "South America": [
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
    { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  ],
  "Australia & Oceania": [
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  ],
  "Africa": [
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  ],
};

export const allCurrencies = Object.values(currencies).flat();

export const investmentTypes = [
  { id: 'stocks', name: 'Stocks', icon: '📈' },
  { id: 'bonds', name: 'Government Bonds', icon: '🏛️' },
  { id: 'gold', name: 'Gold', icon: '🥇' },
  { id: 'deposits', name: 'Time Deposits', icon: '🏦' },
  { id: 'etf', name: 'ETF', icon: '📊' },
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿' },
  { id: 'reits', name: 'REITs', icon: '🏢' },
  { id: 'commodities', name: 'Commodities', icon: '🛢️' },
];
export const currency = [
  "THB", // Thai Baht
  "USD", // US Dollar
  "EUR", // Euro
  "JPY", // Japanese Yen
  "GBP", // British Pound
  "CNY", // Chinese Yuan
  "AUD", // Australian Dollar
  "CAD", // Canadian Dollar
  "SGD", // Singapore Dollar
  "HKD", // Hong Kong Dollar
];

export type Organization = {
  name: string;
  description?: string;
  website?: string;
  industry: string;
  domain?: string;
  currency: typeof currency[number];
  phone?: string;
  locale: string;
  timezone: string;
  subscription_plan?: string;
  settings?: unknown;
  status: string;
  address?: string;
  logo?: string | null;
  teamEmails?: string[];
  billing_customer_id?: string;
};
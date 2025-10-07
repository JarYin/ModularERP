/** @type {import('next').NextConfig} */

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
	domains: ['i.pravatar.cc'],
  },
};

export default withNextIntl(nextConfig);

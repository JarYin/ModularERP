/** @type {import('next').NextConfig} */

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {

};

export default withNextIntl(nextConfig);

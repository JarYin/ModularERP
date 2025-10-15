export const timezones = Intl.supportedValuesOf
    ? Intl.supportedValuesOf('timeZone')
    : [
        'Asia/Bangkok',
        'UTC',
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney',
    ];
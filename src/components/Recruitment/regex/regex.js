
export const validPhone = new RegExp('^(0|\\+84)[1-9]\\d{8}$');
export const validEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
export const validFullName = new RegExp('^[\\p{L}][\\p{L}\\s\\-]*$', 'u');


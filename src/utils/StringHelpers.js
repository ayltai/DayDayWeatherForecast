export const StringHelpers = {};

StringHelpers.capitalize = value => value ? value.length === 1 ? value.toUpperCase() : value.charAt(0).toUpperCase() + value.slice(1) : value;

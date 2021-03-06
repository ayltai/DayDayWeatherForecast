export const NumberFormatHelpers = {};

NumberFormatHelpers.toFixed = (value, digits = 1) => {
    if (value) {
        const factor = Math.pow(10, digits);

        return (Math.round(value * factor) / factor).toFixed(digits);
    }

    return '0';
};

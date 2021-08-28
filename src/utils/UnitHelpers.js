import { Constants, } from '../Constants';
import { NumberFormatHelpers } from './NumberFormatHelpers';

export const UnitHelpers = {};

UnitHelpers.toTemperature = (temperature, unit, digits = 1, withSymbol = true) => unit === Constants.UNITS[0].value ? `${NumberFormatHelpers.toFixed(temperature, digits)}${withSymbol ? '°C' : ''}` : `${NumberFormatHelpers.toFixed(temperature * 1.8 + 32, digits)}${withSymbol ? '°F' : ''}`;

UnitHelpers.toWindSpeed = (windSpeed, unit, digits = 1, withSymbol = true) => unit === Constants.UNITS[0].value ? `${NumberFormatHelpers.toFixed(windSpeed, digits)}${withSymbol ? 'km/h' : ''}` : `${NumberFormatHelpers.toFixed(windSpeed / 1.60934, digits)}${withSymbol ? 'mi/h' : ''}`;

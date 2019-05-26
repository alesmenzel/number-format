import Formatter from './formatter';

/**
 * Create a formatter
 *
 * @param {Object} config Config
 */
const createFormatter = config => {
  return new Formatter(config);
};

export default createFormatter;

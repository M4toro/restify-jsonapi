/**
 * Class represents JSON:API formatter for restify server.
 */
module.exports = class JSONAPIFormatter {
  /**
   * Format given data.
   *
   * If the data is an instance of the Error, the method converts it into an
   * appropriate JSON string. If data includes errors field, the method
   * converts every element of the errors array into an appropriate JSON
   * string. Otherwise the data will just be converted in JSON string.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next object.
   * @returns {string} - JSON string.
   */
  static formatJSONAPI(req, res, data) {
    if (data instanceof Error) {
      return JSON.stringify({
        errors: [
          JSONAPIFormatter.formatError(data),
        ]
      });
    } else if (data.errors) {
      return JSON.stringify({
        errors: data.errors.map((err) => JSONAPIFormatter.formatError(err))
      });
    }

    return JSON.stringify(data);
  }

  /**
   * Format error.
   * 
   * Returns formatted error - object with fields status, code and title.
   * 
   * @param {Error} err - Instance of the Error.
   * @returns {Object} - Formatted error.
   */
  static formatError(err) {
    return {
      status: err.statusCode,
      code: err.name,
      title: err.message,
    }
  }
};

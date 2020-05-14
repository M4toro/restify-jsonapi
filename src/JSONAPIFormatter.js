/**
 * Class represents JSON:API formatter for restify server.
 */
module.exports = class JSONAPIFormatter {
  /**
   * Format given data.
   *
   * If the data is an instance of the Error, the method converts it in an
   * appropriate JSON string. Otherwise the data will just be converted in
   * JSON string.
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
          {
            status: data.statusCode,
            code: data.name,
            title: data.message,
          },
        ],
      });
    }

    return JSON.stringify(data);
  }
};

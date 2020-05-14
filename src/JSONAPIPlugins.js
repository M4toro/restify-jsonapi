/**
 * Class represents JSON:API plugins for restify server.
 */
module.exports = class JSONAPIPlugins {
  constructor() {
    this.JSONAPIMediaType = 'application/vnd.api+json';
  }

  /**
   * Validate request according to JSON:API specification.
   *
   * The method sends response with '415 Unsupported Media Type' status code if
   * the request specifies the header Content-Type: application/vnd.api+json
   * with any media type parameters, or sends response '406 Not Acceptable'
   * status code if a request’s Accept header contains the JSON:API media type
   * and all instances of that media type are modified with media type
   * parameters, or calls the next().
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next object.
   */
  JSONAPIRequest(req, res, next) {
    const contentTypeHeader = req.header('Content-Type', false);
    if (contentTypeHeader) {
      if (!this.validateContentTypeHeader(contentTypeHeader)) {
        res.status(415);
        res.send();

        return false;
      }
    }

    const acceptHeader = req.header('Accept', false);
    if (acceptHeader) {
      if (!this.validateAcceptHeader(acceptHeader)) {
        res.status(406);
        res.send();

        return false;
      }
    }

    next();
    return true;
  }

  /**
   * Set 'Content-Type' header for the response.
   *
   * The method sets 'application/vnd.api+json' header.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {object} next - Next object.
   */
  JSONAPIResponse(req, res, next) {
    res.header('Content-Type', this.JSONAPIMediaType);

    next();
  }

  /**
   * Validate 'Accept' header.
   *
   * The method returns false if the header contains the JSON:API media type and
   * all instances of that media type are modified with media type parameters,
   * otherwise returns true.
   *
   * @param {string} header
   * @returns {boolean}
   */
  validateAcceptHeader(header) {
    const { JSONAPIMediaType } = this;

    const mediaTypes = JSONAPIPlugins.parseAcceptHeader(header);
    const parsedMediaTypes = mediaTypes.map(
      (type) => JSONAPIPlugins.parseMediaType(type),
    );


    const mediaTypeWithParams = parsedMediaTypes.find(
      (type) => JSONAPIMediaType === type.type && type.params.length,
    );
    if (!mediaTypes.includes(JSONAPIMediaType) && mediaTypeWithParams) {
      return false;
    }

    return true;
  }

  /**
   * Validate 'Content-Type' header.
   *
   * The method returns false if the header contains application/vnd.api+json with any
   * media type parameters, otherwise returns true.
   *
   * @param {string} header
   * @returns {boolean}
   */
  validateContentTypeHeader(header) {
    const { type, params } = JSONAPIPlugins.parseMediaType(header);
    if (type === this.JSONAPIMediaType && params.length) {
      return false;
    }

    return true;
  }

  /**
   * Parse media type.
   *
   * The method returns an object with the 'type' and 'params' properties.
   * The type property contains string represents media type, the params
   * property contains an arr with media type parameters.
   *
   * For example parseMediaType('text/html;q=0.9') returns
   * {
   *    type: 'text/html',
   *    params: ['q=0.9']
   * }
   *
   * @param {string} mediaType
   * @returns {object}
   */
  static parseMediaType(mediaType) {
    const regex = /\s*;\s*/;
    const mediaTypeArr = mediaType.split(regex);
    const type = mediaTypeArr.shift();

    return {
      type,
      params: mediaTypeArr,
    };
  }

  /**
   * Parse accept header.
   *
   * The method returns an array with media types from given string.
   *
   * @param {string} header
   * @returns {array}
   */
  static parseAcceptHeader(header) {
    const regex = /\s*,\s*/;

    return header.split(regex);
  }
};

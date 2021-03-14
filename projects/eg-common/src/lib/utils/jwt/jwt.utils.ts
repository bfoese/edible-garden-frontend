import jwt_decode from 'jwt-decode';

export class JwtUtils {
  /**
   * RFC 7519 states that the 'exp' and 'iat' claim values are JSON numeric
   * values representing the number of seconds (not milliseconds) from
   * 1970-01-01T00:00:00Z UTC until the specified UTC date/time, ignoring leap
   * seconds.
   * @param jwtNumericTimestamp - e.g. the claims 'exp' or 'iat' from the JWT payload
   */
  public static jwtTimestampToDate(jwtNumericTimestamp: number): Date | null {
    return jwtNumericTimestamp ? new Date(jwtNumericTimestamp * 1000) : null;
  }

  public static decodePayload(jwt: string): unknown | null {
    try {
      const payload = jwt ? jwt_decode(jwt) : null;
      return payload ? payload : null;
    } catch (error) {
      return null;
    }
  }
}

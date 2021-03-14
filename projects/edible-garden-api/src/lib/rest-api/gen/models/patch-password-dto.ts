/* tslint:disable */
/* eslint-disable */
export interface PatchPasswordDto {
  password: string;

  /**
   * Token that was provided by the server to the client when the server initiated the password change process.
   */
  token: string;
}

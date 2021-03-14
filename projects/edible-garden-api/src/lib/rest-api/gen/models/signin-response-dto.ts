/* tslint:disable */
/* eslint-disable */
import { JwtTokenDto } from './jwt-token-dto';
import { UserDto } from './user-dto';
export interface SigninResponseDto {
  accessToken: JwtTokenDto;
  user: UserDto;
}

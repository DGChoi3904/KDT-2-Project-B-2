export class CreateUserDto {
  //유저 생성할때 사용되는 데이터전송객체(DTO)
  readonly userId: string;
  readonly password: number;
  readonly nickname: string;
}

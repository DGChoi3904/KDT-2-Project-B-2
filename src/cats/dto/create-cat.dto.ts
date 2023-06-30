export class CreateCatDto {
  //고양이를 생성할때 사용되는 데이터전송객체(DTO)
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>; // Mongoose에서 반환되는 문서(Document) 객체의 타입을 지정하는 데 사용

@Schema({ collection: 'userData' }) //몽고DB의 userData Collection 에 접근하기 위해 별도의 Collection을 지정함.
//별도의 지정이 없다면 단수로 작성된 스키마 이름을 기준으로 복수형태의 이름으로 구성된 collection에 접근함//!(user 스키마 -> users 콜렉션)
export class User {
  @Prop() //클래스의 속성을 Mongoose의 속성으로 정의합니다.
  _id: string;

  @Prop()
  password: string;

  @Prop()
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User); // Mongoose 스키마를 생성하는 팩토리 메서드
//인자로 전달된 클래스(User)를 기반으로 Mongoose 스키마를 생성

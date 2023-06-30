import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>; // Mongoose에서 반환되는 문서(Document) 객체의 타입을 지정하는 데 사용

@Schema() //몽고DB의 스키마임을 나타냄
export class Cat {
  @Prop() //클래스의 속성을 Mongoose의 속성으로 정의합니다.
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat); // Mongoose 스키마를 생성하는 팩토리 메서드
//인자로 전달된 클래스(Cat)를 기반으로 Mongoose 스키마를 생성

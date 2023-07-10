import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose'; // 추가된 부분
export type MyWayPointDocument = HydratedDocument<MyWayPoint>; // Mongoose에서 반환되는 문서(Document) 객체의 타입을 지정하는 데 사용

@Schema({ collection: 'myWayPoint' }) //몽고DB의 userData Collection 에 접근하기 위해 별도의 Collection을 지정함.
//별도의 지정이 없다면 단수로 작성된 스키마 이름을 기준으로 복수형태의 이름으로 구성된 collection에 접근함//!(MyWayPoint 스키마 -> MyWayPoint 콜렉션)
export class MyWayPoint {
  @Prop() //클래스의 속성을 Mongoose의 속성으로 정의합니다.
  start: string; //출발지. `String`

  @Prop()
  wayName: string; // 즐겨찾기 이름

  @Prop()
  wayPoints: Array<string>; // 경유지들. 배열. 최대 5 [wayPoint1, wayPoint2, wayPoint3, wayPoint4, wayPoint5] :  경유지 목록. 좌표가 저장됨 `String`.

  @Prop()
  end: string; // string 도착지. `String`

  @Prop() // 수정된 부분
  userId: string;
}

export const MyWayPointSchema = SchemaFactory.createForClass(MyWayPoint); // Mongoose 스키마를 생성하는 팩토리 메서드
//인자로 전달된 클래스(MyWayPoint)를 기반으로 Mongoose 스키마를 생성

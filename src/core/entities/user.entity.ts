import { Column, Entity } from 'typeorm';
import { EntityNames } from '../constants/entity-names.constant';
import { BaseEntity } from './base.entity';

@Entity({
  name: EntityNames.USERS,
})
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  name!: string;

  @Column({
    type: 'varchar',
  })
  email!: string;

  @Column({
    type: 'varchar',
  })
  password!: string;

  @Column({
    type: 'int',
  })
  age!: number;
}

import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { EntityNames } from '../constants/entity-names.constant';
import { BaseEntity } from './base.entity';
import type { UserEntity } from './user.entity';
import type { BlockEntity } from './block.entity';

@Entity({
  name: EntityNames.POSTS,
})
export class PostEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title!: string;

  @Column({
    type: 'varchar',
  })
  summary!: string;

  @Column({
    type: 'uuid',
  })
  authorId!: string;

  @OneToOne(EntityNames.USERS)
  @JoinColumn({
    referencedColumnName: 'authorId',
  })
  author!: UserEntity;

  @OneToMany(EntityNames.BLOCKS, (block: BlockEntity) => block.post)
  blocks!: BlockEntity[];
}

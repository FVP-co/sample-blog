import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityNames } from '../constants/entity-names.constant';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';

@Entity({
  name: EntityNames.BLOCKS,
})
export class BlockEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  content!: string;

  @Column({
    type: 'int',
  })
  order!: number;

  @ManyToOne(EntityNames.POSTS, (user: PostEntity) => user.blocks)
  post!: PostEntity;
}

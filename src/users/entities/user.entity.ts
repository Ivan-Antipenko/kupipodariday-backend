import { IsEmail, Length, isDate, isNotEmpty, isString } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishList } from 'src/wishlists/entities/wishlist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @isDate()
  createdAt: Date;

  @UpdateDateColumn()
  @isDate()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  @Length(2, 30)
  @isString()
  username: string;

  @Column({
    type: 'varchar',
    default: 'Пока ничего о себе не рассказал',
  })
  @Length(2, 200)
  @isString()
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @isString()
  avatar: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @isString()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => WishList, (wishlist) => wishlist.owner)
  wishlists: WishList[];
}

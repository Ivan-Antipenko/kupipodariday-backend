import { Min, isBoolean, isNumber } from 'class-validator';

export class CreateOfferDto {
  @Min(1)
  @isNumber()
  amount: number;

  @isBoolean()
  hidden?: boolean;

  @isNumber()
  itemId: number;
}

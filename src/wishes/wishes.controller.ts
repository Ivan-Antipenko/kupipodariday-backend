import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/types';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-widh.dto';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @Get('last')
  getLastWishes() {
    return this.wishesService.findLast();
  }

  @Get('top')
  getTopWishes() {
    return this.wishesService.findTopWishes();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getWishById(@Param('id') id: number) {
    return this.wishesService.getWishById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto, @Req() req: RequestWithUser) {
    return this.wishesService.create(req.user, createWishDto);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copy(@Param('id') id: number, @Req() req: RequestWithUser) {
    return this.wishesService.copy(req.user, id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateWishlistlists(
    @Body() updateWishDto: UpdateWishDto,
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ) {
    return this.wishesService.updateOne(updateWishDto, id, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    return this.wishesService.delete(id, req.user.id);
  }
}

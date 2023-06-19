import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CreateReservationCommand } from './commands/create-reservation/create-reservation.command';
import { ListReservationQuery } from './queries/list-reservation/list-reservation.query';
import { GetReservationQuery } from './queries/get-reservation/get-reservation.query';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UpdateReservationCommand } from './commands/update-reservation/update-reservation.command';
import { DeleteReservationCommand } from './commands/delete-reservation/delete-reservation.command';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.commandBus.execute(
      new CreateReservationCommand(createReservationDto),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new ListReservationQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetReservationQuery(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.commandBus.execute(
      new UpdateReservationCommand(id, updateReservationDto),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteReservationCommand(id));
  }
}

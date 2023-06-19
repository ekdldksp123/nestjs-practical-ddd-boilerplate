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
import { CreateReservationCommand } from '../shared/commands/create-reservation/create-reservation.command';
import { UpdateReservationCommand } from '../shared/commands/update-reservation/update-reservation.command';
import { DeleteReservationCommand } from '../shared/commands/delete-reservation/delete-reservation.command';
import { CreateReservationDto } from '../shared/dto/create-reservation.dto';
import { ListReservationQuery } from '../shared/queries/list-reservation/list-reservation.query';
import { GetReservationQuery } from '../shared/queries/get-reservation/get-reservation.query';
import { UpdateReservationDto } from '../shared/dto/update-reservation.dto';

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

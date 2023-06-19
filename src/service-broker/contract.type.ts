import * as RoomRequestContract from './contracts/room-accommodation/room-request.contract';
import * as RoomResponseContract from './contracts/room-accommodation/room-response.contract';

// TODO: to modulize by svc
export enum MessageContract {
  // room accommodation
  ROOM_ACCOMMODATION_CHECK_AVAILABILITY = 'room-accommodation.check.availabilily',
}

export enum EventContract {
  USER_CREATED = 'user.created',
}

export type BrokerReq = {
  // room accommodation
  [MessageContract.ROOM_ACCOMMODATION_CHECK_AVAILABILITY]: RoomRequestContract.CheckRoomAvailability;
  [EventContract.USER_CREATED]: RoomRequestContract.CheckRoomAvailability;
};

export type BrokerRes = {
  [MessageContract.ROOM_ACCOMMODATION_CHECK_AVAILABILITY]: RoomResponseContract.CheckRoomAvailability;
  [EventContract.USER_CREATED]: RoomRequestContract.CheckRoomAvailability;
};

export { RoomRequestContract, RoomResponseContract };

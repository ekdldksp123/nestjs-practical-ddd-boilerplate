export interface CreateReservationDto {
  accommodationId: string;
  createdBy?: string;
  data?: string;
  guestName?: string;
  isLongTerm?: boolean;
  isPrimary?: boolean;
  memoContent?: string;
  number?: string;
  otaNumber?: string;
  paymentId?: string;
  phone?: string;
  platform?: string;
  reservationGroupId?: string;
  roomId?: string;
  roomTypeId: string;
  roomTypeName?: string;
  sleeps?: number;
  status?: number;
  type: string;
  useDefaultCheckInOut?: boolean;
  useExpireAt: Date;
  useStartAt: Date;
  useVehicle?: boolean;
  vehicleNumber?: string;
}

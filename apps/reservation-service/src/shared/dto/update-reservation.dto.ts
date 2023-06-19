export interface UpdateReservationDto {
  createdBy?: string;
  data?: string;
  guestName?: string;
  id: string;
  intendedType?: string;
  isLongTerm?: boolean;
  isPrimary?: boolean;
  memoContent?: string;
  number?: string;
  otaNumber?: string;
  paymentAmount?: number;
  paymentId?: string;
  phone?: string;
  platform?: string;
  reservationGroupId?: string;
  roomId?: string;
  roomTypeId?: string;
  sleeps?: number;
  status?: number;
  type?: string;
  useExpireAt?: Date;
  useStartAt?: Date;
  useVehicle?: boolean;
  vehicleNumber?: string;
}

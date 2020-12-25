import { AddressDTO } from '../dto';
import { Realm, TransportationType, UserRoles } from '../enum';

export class UserInterface {
  id?: string;
  store?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  city?: string;
  address?: AddressDTO;
  profile?: string;
  transport?: TransportationType;
  roles?: UserRoles[];
  realm?: Realm;
  online?: boolean;
  assignedJob?: string;
  authToken?: string;
  suspended?: boolean;
  approved?: boolean;
}

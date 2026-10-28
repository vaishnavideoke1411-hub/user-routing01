export interface Iuser {
  id: number;
  Uid: string;
  name: string;
  role: string;
  experience: number;
  status: boolean;
  description: string;
  skills: string[];

  currentAddress: {
    country: string;
    state: string;
    city: string;
    zipcode: string;
  };

  permanentAddress: {
    country: string;
    state: string;
    city: string;
    zipcode: string;
  };

  imageUrl: string;
}
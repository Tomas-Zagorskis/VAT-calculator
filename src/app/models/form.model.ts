export type InvoiceForm = {
  customerDetails: CustomerDetails;
  serviceProvider: ServiceProvider;
};

export type ServiceProvider = {
  isVATPayer: boolean;
  name: string;
  sAddress: string;
  sCity: string;
  sCountry: string;
  services: { name: string; price: number }[];
};

export type CustomerDetails = {
  VATPayer: string;
  address: string;
  city: string;
  company: string;
  country: string;
  email: string;
  fName: string;
  lName: string;
};

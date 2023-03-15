export type InvoiceForm = {
  customerDetails: {
    VATPayer: string;
    address: string;
    city: string;
    company: string;
    country: string;
    email: string;
    fName: string;
    lName: string;
  };
  serviceProvider: {
    isVATPayer: boolean;
    name: string;
    sAddress: string;
    sCity: string;
    sCountry: string;
    services: { name: string; price: number }[];
  };
};

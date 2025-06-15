export class CreateInvoiceDto {
    journeyId: number;
    amount: number; // Optional, in case the invoice is for a driver
}
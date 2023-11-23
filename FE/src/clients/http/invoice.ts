import qs from 'query-string';
import { createClient } from './axios_client';

const client = createClient('http://10.49.46.54:9000/api/v1');

export const invoiceAPI = {
  createInvoice: (data: any) => {
    return client.post('/invoices', data);
  },

  createPayment: (roomId: string) => {
    return client.get(`/invoices/create_payment/${roomId}`);
  },

  invoicePaided: (roomId: string) => {
    return client.put(`/invoices/${roomId}/paided`);
  },
  getStatistical: (payload: any) => {
    const query = qs.stringify(payload);

    return client.get(`/invoices/statistical?${query}`, payload);
  },
  exportSyntheticViolation: (payload: any) => {
    return client.post(`/invoices/statistical/exportReport`, payload);
  },
};

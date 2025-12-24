export const sampleBillingData = {
  overview: {
    currentBalance: {
      amount: 350,
      dueDate: 'Due Jan 5, 2024',
    },
    paidThisMonth: {
      amount: 0,
      status: 'No payments made',
    },
    nextPayment: {
      amount: 350,
      date: 'Jan 5, 2024',
    },
    totalPayments: {
      amount: 12,
      description: 'Total payments',
    },
  },
  paymentMethods: [
    {
      id: 1,
      type: 'visa',
      name: 'Visa ending in 4242',
      details: 'Expires 12/2025',
    },
    {
      id: 2,
      type: 'bank',
      name: 'Bank Transfer',
      details: 'Commercial Bank',
    },
  ],
  billingHistory: [
    {
      id: 1,
      amount: 350,
      title: 'December Rent',
      boarding: 'Sunshine Hostel',
      date: 'Dec 5, 2023',
      status: 'paid',
    },
    {
      id: 2,
      amount: 350,
      title: 'November Rent',
      boarding: 'Sunshine Hostel',
      date: 'Nov 5, 2023',
      status: 'paid',
    },
    {
      id: 3,
      amount: 350,
      title: 'October Rent',
      boarding: 'Sunshine Hostel',
      date: 'Oct 5, 2023',
      status: 'paid',
    },
    {
      id: 4,
      amount: 350,
      title: 'September Rent',
      boarding: 'Sunshine Hostel',
      date: 'Sep 5, 2023',
      status: 'paid',
    },
    {
      id: 5,
      amount: 350,
      title: 'January Rent',
      boarding: 'Sunshine Hostel',
      date: 'Due Jan 5, 2024',
      status: 'pending',
    },
  ],
  billingDetails: [
    { label: 'Monthly Rent', value: 'LKR 350.00' },
    { label: 'Utilities Included', value: 'Yes' },
    { label: 'Payment Due Date', value: '5th of each month' },
    { label: 'Late Fee', value: 'LK 25 after 5 days' },
    { label: 'Security Deposit', value: 'LK 350 (Paid)' },
  ],
};
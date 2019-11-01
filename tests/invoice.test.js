const Invoice = require('../invoice.js');
const InvoiceLine = require('../invoiceLine.js');


test('AddInvoiceLine: 0 + 1 to equal 1 Invoice Lines in Invoice', () => {
  const invoiceTest = new Invoice();
  invoiceTest.AddInvoiceLine(new InvoiceLine(1, 6.99, 1, "Apple"));

  expect(invoiceTest.LineItems.length).toBe(1);
  expect(invoiceTest.LineItems.length).not.toBe(2);
  expect(invoiceTest.LineItems.length).not.toBe(3);
});

test('RemoveInvoiceLine: 3 - 1 to equal 2 Invoice Lines in Invoice', () => {
  const invoiceTest = new Invoice();

  invoiceTest.AddInvoiceLine(new InvoiceLine(1, 6.99, 1, "Orange"));
  invoiceTest.AddInvoiceLine(new InvoiceLine(2, 6.99, 1, "Banana"));
  invoiceTest.AddInvoiceLine(new InvoiceLine(3, 6.99, 1, "Apple"));

  invoiceTest.RemoveInvoiceLine(1)

  expect(invoiceTest.LineItems.length).toBe(2);
  expect(invoiceTest.LineItems.length).not.toBe(1);
  expect(invoiceTest.LineItems.length).not.toBe(3);
});

test('GetTotal: 1 invoice with 3 lines items is equal 3', () => {
  const invoiceTest = new Invoice();
  invoiceTest.AddInvoiceLine(new InvoiceLine(1, 6.99, 1, "Orange"));
  invoiceTest.AddInvoiceLine(new InvoiceLine(2, 6.99, 1, "Banana"));
  invoiceTest.AddInvoiceLine(new InvoiceLine(3, 6.99, 1, "Apple"));

  const totalInvoicesLines = invoiceTest.GetTotal();

  expect(totalInvoicesLines).toBe(3);
  expect(totalInvoicesLines).not.toBe(2);
  expect(totalInvoicesLines).not.toBe(6);
});


test('MergeInvoices: Merge 2 invoices into one. The merged invoice has 4 line items', () => {
  const invoiceTest = new Invoice();
  invoiceTest.AddInvoiceLine(new InvoiceLine(1, 6.99, 1, "Orange"));
  invoiceTest.AddInvoiceLine(new InvoiceLine(2, 6.99, 1, "Banana"));
  invoiceTest.AddInvoiceLine(new InvoiceLine(3, 6.99, 1, "Apple"));

  const invoiceTest2 = new Invoice();
  invoiceTest2.AddInvoiceLine(new InvoiceLine(4, 6.99, 1, "Straweberry"));

  const invoiceMerged = invoiceTest.MergeInvoices(invoiceTest2);

  expect(invoiceMerged.LineItems.length).toBe(4);
  expect(invoiceMerged.LineItems.length).not.toBe(2);
  expect(invoiceMerged.LineItems.length).not.toBe(6);
});

test('Clone: Deep Clone an invoice except for the ID which is different', () => {
  const invoiceTest = new Invoice();
  invoiceTest.AddInvoiceLine(new InvoiceLine(1, 6.99, 1, "Orange"));
  invoiceTest.AddInvoiceLine(new InvoiceLine(2, 6.99, 1, "Banana"));
  invoiceTest.AddInvoiceLine(new InvoiceLine(3, 6.99, 1, "Apple"));

  const invoiceClones = invoiceTest.Clone();

  expect(invoiceTest.InvoiceDate).toEqual(invoiceClones.InvoiceDate);
  expect(invoiceTest.LineItems).toEqual(invoiceClones.LineItems);
  expect(invoiceTest.InvoiceId).not.toBe(invoiceClones.InvoiceId);
});
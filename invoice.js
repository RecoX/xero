const cloneDeep = require('lodash.clonedeep');
const crypto = require('crypto');

class Invoice {
    constructor(InvoiceDate = new Date(), InvoiceId = crypto.randomBytes(20).toString('hex'), LineItems = []) {
        this.InvoiceDate = InvoiceDate;
        this.InvoiceId = InvoiceId;
        this.LineItems = LineItems;
    }

    /**
     * Adds a line to invoice
     * @param {Object} line - a line to add
    */
    AddInvoiceLine(line) {
        this.LineItems.push(line);
    };

    /**
     * Removes a line
     * @param {string} invoiceLineId - a line id to remove
    */
    RemoveInvoiceLine(invoiceLineId) {
        this.LineItems = this.LineItems.filter(el => el.InvoiceLineId !== invoiceLineId);
    };

    /**
     * Get the total of lineItems in an invoice.
    */
    GetTotal() {
        return this.LineItems.length;
    };

    /**
     * Merge 2 invoices into one.
    */
    MergeInvoices(invoiceToMerge) {   
        // First we push all the invoices lines to the current invoice     
        invoiceToMerge.LineItems.forEach(el => this.AddInvoiceLine(el))

        // Secondly we delete the invoiceToMerge as is not needed anymore.??
        // TODO: ....
        return this;
    }

    /**
     * Deep Clone an invoice
    */
    Clone() {
        // We create a deep copy of the invoice instead of a shallow copy
        return cloneDeep(this);
    };
}

module.exports = Invoice;
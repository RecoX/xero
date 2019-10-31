const cloneDeep = require('lodash.clonedeep');

class Invoice {
    constructor(InvoiceDate = new Date(), InvoiceNumber = "", LineItems = []) {
        this.InvoiceDate = InvoiceDate;
        this.InvoiceNumber = InvoiceNumber;
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
    */
    RemoveInvoiceLine(id) {
        return null;
    };

    GetTotal() {
        return this.LineItems.length;
    };

    MergeInvoices() {
        return null;
    }

    Clone() {
        // We create a deep copy of the invoice instead of a shallow copy
        return cloneDeep(this);
    };
}

module.exports = Invoice;
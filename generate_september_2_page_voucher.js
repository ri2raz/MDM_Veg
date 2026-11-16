const fs = require('fs');

const page1Data = {
  monthTitle: 'September 2026',
  dateStr: '30 September 2026',
  invNo: '2026-27 / ',
  refStr: '1-Sep-26',
  grandTotal: '33,385.00',
  words: 'INR THIRTY THREE THOUSAND THREE HUNDRED AND EIGHTY FIVE ONLY',
  schemePurpose: 'Cooking Cost & Fuel Material Purchase',
  items: [
    { sr: 1, name: 'हल्दी पाउडर (Haldi Powder)', qty: '4.036', unit: 'KG', rate: '250.00', tot: '1009.00' },
    { sr: 2, name: 'धनिया पाउडर (Coriander Powder)', qty: '2.421', unit: 'KG', rate: '175.00', tot: '423.68' },
    { sr: 3, name: 'मिक्स मसाला (Mix Masala)', qty: '1.615', unit: 'KG', rate: '340.00', tot: '549.10' },
    { sr: 4, name: 'लाल मिर्च पाउडर (Red Chili Powder)', qty: '0.807', unit: 'KG', rate: '300.00', tot: '242.10' },
    { sr: 5, name: 'सरसों तेल (Mustard Oil)', qty: '23.981', unit: 'Lit', rate: '190.00', tot: '4556.39' },
    { sr: 6, name: 'सोया बड़ी (Soya Chunks)', qty: '35.900', unit: 'KG', rate: '92.00', tot: '3302.80' },
    { sr: 7, name: 'चना दाल (Chana Dal)', qty: '15.130', unit: 'KG', rate: '100.00', tot: '1513.00' },
    { sr: 8, name: 'मूंग दाल (Moong Dal)', qty: '15.130', unit: 'KG', rate: '100.00', tot: '1513.00' },
    { sr: 9, name: 'मसूर दाल (Masoor Dal)', qty: '15.130', unit: 'KG', rate: '100.00', tot: '1513.00' },
    { sr: 10, name: 'लाल चना (Red Chana)', qty: '60.907', unit: 'KG', rate: '90.00', tot: '5481.63' },
    { sr: 11, name: 'आलू (Potato)', qty: '76.560', unit: 'KG', rate: '30.00', tot: '2296.80' },
    { sr: 12, name: 'प्याज (Onion)', qty: '18.269', unit: 'KG', rate: '39.00', tot: '712.49' },
    { sr: 13, name: 'कद्दू (Pumpkin)', qty: '18.269', unit: 'KG', rate: '39.00', tot: '712.49' },
    { sr: 14, name: 'झिंगा / नेनुआ (Vegetables)', qty: '18.268', unit: 'KG', rate: '39.00', tot: '712.45' },
    { sr: 15, name: 'टमाटर (Tomato)', qty: '18.268', unit: 'KG', rate: '39.00', tot: '712.45' },
    { sr: 16, name: 'सूखी मिर्च (Dry Chilli)', qty: '0.807', unit: 'KG', rate: '250.00', tot: '201.75' },
    { sr: 17, name: 'जीरा (Cumin)', qty: '0.808', unit: 'KG', rate: '490.00', tot: '395.92' },
    { sr: 18, name: 'नमक (Salt)', qty: '5.654', unit: 'KG', rate: '15.00', tot: '84.81' },
    { sr: 19, name: 'जलावन (Firewood / Fuel)', qty: '532.296', unit: 'KG', rate: '14.00', tot: '7452.14' }
  ]
};

const page2Data = {
  monthTitle: 'September 2026',
  dateStr: '30 September 2026',
  invNo: '2026-27 / ',
  refStr: '1-Sep-26',
  grandTotal: '1,635.00',
  words: 'INR ONE THOUSAND SIX HUNDRED AND THIRTY FIVE ONLY',
  schemePurpose: 'Egg & Seasonal Fruit Procurement (अंडा / फल सामग्री क्रय)',
  items: [
    { sr: 1, name: 'अंडा / फल (Egg / Fruit)', qty: '327', unit: 'PCS', rate: '5.00', tot: '1,635.00' }
  ]
};

function renderPage(p, isSingleItem = false) {
  let tableRows = '';
  if (isSingleItem) {
    const item = p.items[0];
    tableRows += `
      <tr class="item-row">
        <td class="col-sr">${item.sr}</td>
        <td class="col-desc" style="font-weight: 600; font-size: 9.5pt;">${item.name}</td>
        <td class="col-hsn"></td>
        <td class="col-qty">${item.qty}</td>
        <td class="col-unit">${item.unit}</td>
        <td class="col-rate">${item.rate}</td>
        <td class="col-total" style="font-size: 9.5pt; font-weight: bold;">${item.tot}</td>
        <td class="col-taxable"></td>
        <td class="col-gst"></td>
      </tr>`;
    for (let i = 0; i < 12; i++) {
      tableRows += `
      <tr class="empty-row">
        <td class="col-sr">&nbsp;</td>
        <td class="col-desc">&nbsp;</td>
        <td class="col-hsn">&nbsp;</td>
        <td class="col-qty">&nbsp;</td>
        <td class="col-unit">&nbsp;</td>
        <td class="col-rate">&nbsp;</td>
        <td class="col-total">&nbsp;</td>
        <td class="col-taxable">&nbsp;</td>
        <td class="col-gst">&nbsp;</td>
      </tr>`;
    }
  } else {
    tableRows = p.items.map(it => `
      <tr>
        <td class="col-sr">${it.sr}</td>
        <td class="col-desc">${it.name}</td>
        <td class="col-hsn"></td>
        <td class="col-qty">${it.qty}</td>
        <td class="col-unit">${it.unit}</td>
        <td class="col-rate">${it.rate}</td>
        <td class="col-total">${it.tot}</td>
        <td class="col-taxable"></td>
        <td class="col-gst"></td>
      </tr>`).join('');
  }

  const termsText = isSingleItem ? `
      <div>1. Fresh &amp; nutritious eggs / seasonal fruits supplied as per MDM norms.</div>
      <div>2. Goods once delivered and verified will not be returned.</div>
      <div>3. Certified that particulars given above are true and correct.</div>
  ` : `
      <div>1. Goods once sold will not be taken back.</div>
      <div>2. All disputes are subject to Nawada jurisdiction.</div>
      <div>3. Certified that particulars given above are true and correct.</div>
  `;

  return `
  <div class="page-container">
    <div class="voucher-container">
      <!-- Top Header -->
      <table class="top-table">
        <tr>
          <td style="width: 55%; border-right: 1.5px solid #000;">
            <div style="display: flex; justify-content: space-between; font-size: 8.5pt; font-weight: bold; margin-bottom: 2px;">
              <span>GSTIN: 10BGLPK7944K2Z3</span>
              <span>Mob.: 9973959953</span>
            </div>
            <div class="store-title">SANDEEP TRADERS</div>
            <div class="store-details">
              <strong>Main Road Kashichak (Nawada)</strong>, Bihar<br>
              Deals in: Grocery, Mid Day Meal Rations, Fuel &amp; General Goods
            </div>
          </td>
          <td style="width: 45%; padding-left: 9px;">
            <div class="invoice-box-title">TAX INVOICE-CUM BILL OF SUPPLY</div>
            <div class="invoice-meta">
              <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
                <tr>
                  <td style="font-weight: bold; width: 40%;">Invoice No.:</td>
                  <td style="font-weight: bold;">${p.invNo}</td>
                </tr>
                <tr>
                  <td>Dated:</td>
                  <td><strong>${p.dateStr}</strong></td>
                </tr>
                <tr>
                  <td>Place of Supply:</td>
                  <td>Bihar (10)</td>
                </tr>
                <tr>
                  <td>Ref. / Month:</td>
                  <td><strong>${p.monthTitle}</strong> &nbsp;(Ref: ${p.refStr})</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>

      <!-- Receiver & Scheme Box -->
      <table class="sub-header-table">
        <tr>
          <td style="width: 55%; border-right: 1.5px solid #000;">
            <div class="sub-header-title">DETAILS OF RECIPIENT (BILLED TO):</div>
            <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt;">
              <tr>
                <td style="font-weight: bold; font-size: 9.5pt;" colspan="2">मध्य विद्यालय चण्डीनोवाँ</td>
              </tr>
              <tr>
                <td>प्रखंड: <strong>वारिसलीगंज</strong></td>
                <td>जिला: <strong>नवादा (बिहार)</strong></td>
              </tr>
              <tr>
                <td>UDISE Code: <strong>10360400501</strong></td>
                <td>State Code: <strong>10 (Bihar)</strong></td>
              </tr>
            </table>
          </td>
          <td style="width: 45%; padding-left: 9px;">
            <div class="sub-header-title">SCHEME / PROGRAMME DETAILS:</div>
            <div style="font-size: 8.5pt; line-height: 1.45;">
              <strong>PM POSHAN Scheme (Mid-Day Meal)</strong><br>
              Purpose: <strong>${p.schemePurpose}</strong><br>
              Category: Primary &amp; Upper Primary (I - VIII)<br>
              Payment Mode: Direct Bank Transfer / PFMS
            </div>
          </td>
        </tr>
      </table>

      <!-- Items Table -->
      <table class="items-table">
        <thead>
          <tr>
            <th class="col-sr">Sl.</th>
            <th class="col-desc">Description of Goods / Services</th>
            <th class="col-hsn">HSN</th>
            <th class="col-qty">Quantity</th>
            <th class="col-unit">Unit</th>
            <th class="col-rate">Rate (₹)</th>
            <th class="col-total">Amount (₹)</th>
            <th class="col-taxable">Taxable Val</th>
            <th class="col-gst">GST Rate</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" style="text-align: right; font-weight: bold; padding-right: 8px;">GRAND TOTAL / NET PAYABLE:</td>
            <td class="col-total" style="font-weight: 900; font-size: 9.5pt; text-align: right;">₹ ${p.grandTotal}</td>
            <td class="col-taxable"></td>
            <td class="col-gst"></td>
          </tr>
        </tfoot>
      </table>

      <!-- Bottom Blocks -->
      <table class="bottom-blocks-table">
        <tr>
          <td style="width: 55%; border-right: 1.5px solid #000;">
            <table class="tax-table">
              <thead>
                <tr>
                  <th>Tax Type</th>
                  <th>Rate</th>
                  <th>Taxable Amt</th>
                  <th>CGST (₹)</th>
                  <th>SGST (₹)</th>
                  <th>Total Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GST / Exempt</td>
                  <td>0.00%</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr style="font-weight: bold;">
                  <td colspan="2">TOTAL TAX</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div class="amount-words-box">
              <strong>Amount in Words:</strong><br>
              <span>${p.words}</span>
            </div>
            <div class="bank-details-box">
              <strong>Bank Details:</strong> Bank of Baroda | A/C: <strong>38240200000215</strong><br>
              IFSC: <strong>BARB0WARISL</strong> | Branch: Warisaliganj, Nawada
            </div>
          </td>
          <td style="width: 45%; vertical-align: top;">
            <div class="terms-box">
              <strong>Terms &amp; Conditions:</strong>
              ${termsText}
            </div>
            <div style="height: 48px;"></div>
            <div class="signature-box">
              For <strong>SANDEEP TRADERS</strong><br><br><br>
              <strong>Authorised Signatory</strong>
            </div>
          </td>
        </tr>
      </table>

      <!-- Footer Notice -->
      <div class="footer-notice">
        This is a computer generated invoice and serves as official bill of supply for Mid-Day Meal records.
      </div>
    </div>
  </div>`;
}

function generateHTML() {
  const page1 = renderPage(page1Data, false);
  const page2 = renderPage(page2Data, true);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Yellow Vouchers - September 2026</title>
<style>
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    background-color: #FFF085;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #000;
  }
  
  .page-container {
    width: 210mm;
    min-height: 297mm;
    padding: 7mm 8mm 7mm 8mm;
    margin: 0 auto;
    background-color: #FFF085;
    page-break-after: always;
  }
  .page-container:last-child {
    page-break-after: avoid;
  }
  
  .voucher-container {
    border: 1.5px solid #000;
    width: 100%;
    background-color: #FFF085;
  }
  
  .top-table, .sub-header-table, .bottom-blocks-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .top-table td, .sub-header-table td, .bottom-blocks-table td {
    vertical-align: top;
    padding: 4px 6px;
  }
  
  .store-title {
    font-size: 15pt;
    font-weight: 900;
    letter-spacing: 0.5px;
    line-height: 1.1;
    margin: 2px 0;
  }
  
  .store-details {
    font-size: 8.5pt;
    line-height: 1.35;
  }
  
  .invoice-box-title {
    font-size: 10pt;
    font-weight: 900;
    text-align: center;
    border-bottom: 1.5px solid #000;
    padding-bottom: 3px;
    margin-bottom: 4px;
    letter-spacing: 0.3px;
  }
  
  .sub-header-table {
    border-top: 1.5px solid #000;
    border-bottom: 1.5px solid #000;
  }
  
  .sub-header-title {
    font-size: 8.5pt;
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 3px;
  }
  
  .items-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .items-table th, .items-table td {
    border: 1px solid #000;
    padding: 2.2px 3px;
    font-size: 8.2pt;
    line-height: 1.15;
  }
  
  .items-table th {
    font-weight: bold;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.04);
  }
  
  .col-sr { width: 4%; text-align: center; }
  .col-desc { width: 33%; text-align: left; }
  .col-hsn { width: 7%; text-align: center; }
  .col-qty { width: 9%; text-align: right; }
  .col-unit { width: 7%; text-align: center; }
  .col-rate { width: 9%; text-align: right; }
  .col-total { width: 12%; text-align: right; }
  .col-taxable { width: 10%; text-align: right; }
  .col-gst { width: 9%; text-align: center; }
  
  .items-table tfoot td {
    border-top: 1.5px solid #000;
    border-bottom: 1.5px solid #000;
    padding: 3px 4px;
  }
  
  .bottom-blocks-table td {
    vertical-align: top;
    padding: 0;
  }
  
  .tax-table {
    width: 100%;
    border-collapse: collapse;
  }
  .tax-table th, .tax-table td {
    border: 1px solid #000;
    padding: 2px 2px;
    font-size: 7.5pt;
    text-align: center;
    line-height: 1.15;
  }
  .tax-table th {
    font-weight: bold;
  }
  
  .amount-words-box {
    border-top: 1.5px solid #000;
    border-bottom: 1.5px solid #000;
    padding: 4px 8px;
    font-size: 8.5pt;
    line-height: 1.35;
  }
  
  .bank-details-box {
    padding: 4px 8px;
    font-size: 8.5pt;
    line-height: 1.45;
  }
  
  .terms-box {
    padding: 5px 8px;
    font-size: 8pt;
    line-height: 1.35;
  }
  
  .signature-box {
    padding: 0 12px 8px 8px;
    text-align: right;
    font-size: 8.5pt;
  }
  
  .footer-notice {
    border-top: 1px solid #000;
    text-align: center;
    font-size: 8pt;
    font-weight: bold;
    padding: 3px 0;
    line-height: 1.2;
  }

  @media print {
    @page {
      margin: 0 !important;
      size: A4 portrait;
    }
    html, body {
      background-color: #FFF085 !important;
    }
    .page-container {
      padding: 7mm 8mm 7mm 8mm !important;
      background-color: #FFF085 !important;
      page-break-after: always !important;
    }
    .page-container:last-child {
      page-break-after: avoid !important;
    }
  }
</style>
</head>
<body>
${page1}
${page2}
</body>
</html>`;
}

const fullHtml = generateHTML();
fs.writeFileSync('C:/Users/rajka/OneDrive/Desktop/general/Yellow_Vouchers_September_2026.html', fullHtml);
console.log('Successfully generated September 2-page voucher HTML!');

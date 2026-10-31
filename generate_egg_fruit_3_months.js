const fs = require('fs');

const monthsData = [
  {
    monthTitle: 'July 2026',
    dateStr: '31 July 2026',
    invNo: '2026-27 / ',
    refStr: '2-Jul-26',
    grandTotal: '4,775.00',
    words: 'INR FOUR THOUSAND SEVEN HUNDRED AND SEVENTY FIVE ONLY',
    items: [
      { sr: 1, name: 'अंडा / फल (Egg / Fruit)', qty: '955', unit: 'PCS', rate: '5.00', tot: '4,775.00' }
    ]
  },
  {
    monthTitle: 'August 2026',
    dateStr: '31 August 2026',
    invNo: '2026-27 / ',
    refStr: '1-Aug-26',
    grandTotal: '2,875.00',
    words: 'INR TWO THOUSAND EIGHT HUNDRED AND SEVENTY FIVE ONLY',
    items: [
      { sr: 1, name: 'अंडा / फल (Egg / Fruit)', qty: '575', unit: 'PCS', rate: '5.00', tot: '2,875.00' }
    ]
  },
  {
    monthTitle: 'September 2026',
    dateStr: '30 September 2026',
    invNo: '2026-27 / ',
    refStr: '1-Sep-26',
    grandTotal: '1,760.00',
    words: 'INR ONE THOUSAND SEVEN HUNDRED AND SIXTY ONLY',
    items: [
      { sr: 1, name: 'अंडा / फल (Egg / Fruit)', qty: '352', unit: 'PCS', rate: '5.00', tot: '1,760.00' }
    ]
  }
];

function generateHTML(pages) {
  let pagesHtml = pages.map((p, idx) => {
    // 1 item row + 12 blank rows = 13 rows in tbody
    const blankRowsCount = 12;
    let blankRowsHtml = '';
    for (let i = 0; i < blankRowsCount; i++) {
      blankRowsHtml += `
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
              <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
                <tr>
                  <td>Invoice No. <strong>${p.invNo}</strong></td>
                  <td style="text-align: right; font-weight: bold;"></td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: right; padding-top: 3px;">Dated: <strong>${p.dateStr}</strong></td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: right; padding-top: 2px;">Mode of Supply: Cash / Credit</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>

      <!-- Receiver & Scheme Box -->
      <table class="sub-header-table">
        <tr>
          <td style="width: 53%; border-right: 1.5px solid #000;">
            <div class="sub-header-title">DETAILS OF RECEIVER / BILLED TO:</div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0; font-weight: bold; font-size: 10pt;">मध्य विद्यालय चण्डीनोवाँ</td>
                <td style="padding: 0; text-align: right; font-size: 8.5pt;">(M.S. Chandinowan)</td>
              </tr>
            </table>
            <div style="margin-top: 2px;">Prakhand / Block: <strong>Kashichak</strong></div>
            <div>District: <strong>Nawada (Bihar)</strong></div>
            <table style="width: 100%; border-collapse: collapse; margin-top: 2px;">
              <tr>
                <td style="padding: 0; font-weight: bold;">UDISE CODE:</td>
                <td style="padding: 0; text-align: right; font-weight: bold; padding-right: 25px; font-size: 9.5pt;">10360400501</td>
              </tr>
            </table>
          </td>
          <td style="width: 47%; padding-left: 9px;">
            <div class="sub-header-title">SCHEME / ORDER REFERENCE (${p.monthTitle}):</div>
            <table style="width: 100%; border-collapse: collapse; margin-top: 2px; font-size: 8.5pt;">
              <tr>
                <td style="padding: 1px 0; font-weight: bold; width: 42%;">Scheme:</td>
                <td style="padding: 1px 0; text-align: right;">Mid-Day Meal (मध्याह्न भोजन योजना)</td>
              </tr>
              <tr>
                <td style="padding: 1px 0; font-weight: bold;">Purpose:</td>
                <td style="padding: 1px 0; text-align: right;">Egg &amp; Seasonal Fruit Procurement (अंडा / फल सामग्री क्रय)</td>
              </tr>
              <tr>
                <td style="padding: 1px 0; font-weight: bold;">Ref:</td>
                <td style="padding: 1px 0; text-align: right; font-weight: bold;">${p.refStr}</td>
              </tr>
              <tr>
                <td style="padding: 1px 0; font-weight: bold;">Authorized by:</td>
                <td style="padding: 1px 0; text-align: right;">Headmaster / Secretary</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Product Table -->
      <table class="product-table">
        <thead>
          <tr>
            <th class="col-sr">Sr. No.</th>
            <th class="col-desc">Description of product</th>
            <th class="col-hsn">HNS Code</th>
            <th class="col-qty">QTY</th>
            <th class="col-unit">UNIT</th>
            <th class="col-rate">RATE (₹)</th>
            <th class="col-total">TOTAL<br>AMOUNT (₹)</th>
            <th class="col-taxable">TAXABLE<br>VALUE (₹)</th>
            <th class="col-gst">GST AMT (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${p.items.map(it => `
          <tr class="item-row">
            <td class="col-sr">${it.sr}</td>
            <td class="col-desc" style="font-weight: 600; font-size: 9.5pt;">${it.name}</td>
            <td class="col-hsn"></td>
            <td class="col-qty">${it.qty}</td>
            <td class="col-unit">${it.unit}</td>
            <td class="col-rate">${it.rate}</td>
            <td class="col-total" style="font-size: 9.5pt; font-weight: bold;">${it.tot}</td>
            <td class="col-taxable"></td>
            <td class="col-gst"></td>
          </tr>`).join('')}
          ${blankRowsHtml}
          <!-- Total Row -->
          <tr class="total-row" style="font-weight: bold; background: rgba(0,0,0,0.02);">
            <td colspan="6" style="text-align: right; padding-right: 8px; font-size: 9pt;">
              TOTAL GROSS AMOUNT / NET PAYABLE :
            </td>
            <td class="col-total" style="font-size: 10pt; font-weight: 900;">${p.grandTotal}</td>
            <td class="col-taxable"></td>
            <td class="col-gst"></td>
          </tr>
        </tbody>
      </table>

      <!-- Lower Split Section -->
      <table class="lower-table">
        <tr>
          <!-- Lower Left -->
          <td style="width: 53%; border-right: 1.5px solid #000;">
            <table class="tax-table">
              <thead>
                <tr>
                  <th rowspan="2" style="width: 32%;">Hsin / SAC</th>
                  <th rowspan="2" style="width: 17%;">Taxable Value</th>
                  <th colspan="2" style="width: 25%;">CGST @</th>
                  <th colspan="2" style="width: 25%;">SGST @</th>
                  <th rowspan="2" style="width: 18%;">Total Tax<br>Amount (₹)</th>
                </tr>
                <tr>
                  <th style="font-size: 7pt; width: 10%;">Rate</th>
                  <th style="font-size: 7pt; width: 15%;">Amount (₹)</th>
                  <th style="font-size: 7pt; width: 10%;">Rate</th>
                  <th style="font-size: 7pt; width: 15%;">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-size: 7.5pt; text-align: left; padding-left: 4px;">Various</td>
                  <td></td>
                  <td>-</td>
                  <td></td>
                  <td>-</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr style="font-weight: bold;">
                  <td style="text-align: right; padding-right: 4px;">Total Tax</td>
                  <td></td>
                  <td>-</td>
                  <td></td>
                  <td>-</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <div class="amount-words-box">
              <div style="font-weight: bold; font-size: 8pt; margin-bottom: 2px;">AMOUNT CHARGEABLE (IN WORDS) :</div>
              <div style="font-size: 8.5pt; font-weight: bold;">${p.words}</div>
            </div>

            <div class="bank-details-box">
              <div style="font-weight: bold; font-size: 8.5pt; text-decoration: underline; margin-bottom: 3px;">Vendor Bank Details</div>
              <div><strong style="display:inline-block; width: 115px;">A/c Holder Name</strong>: <strong>DINESH KUMAR</strong></div>
              <div><strong style="display:inline-block; width: 115px;">Bank Name</strong>: <strong>P.N.B. CHANDI NUWAN (Nawada)</strong></div>
              <div><strong style="display:inline-block; width: 115px;">A/c No.</strong>: <strong style="font-size: 9.5pt; letter-spacing: 0.5px;">7840002100000312</strong></div>
              <div><strong style="display:inline-block; width: 115px;">Branch &amp; IFSC Code</strong>: <strong>PUNB0784000</strong></div>
            </div>
          </td>

          <!-- Lower Right -->
          <td style="width: 47%; padding: 4px 8px; vertical-align: top;">
            <div class="terms-box">
              <div style="font-weight: bold; font-size: 8pt; margin-bottom: 2px;">Terms &amp; Conditions:</div>
              <div>1. Fresh &amp; nutritious eggs / seasonal fruits supplied as per MDM norms.</div>
              <div>2. Goods once delivered and verified will not be returned.</div>
              <div>3. Certified that particulars given above are true and correct.</div>
            </div>

            <div class="signature-box" style="margin-top: 26px;">
              <div style="font-weight: bold; font-size: 8.5pt; text-align: right;">For SANDEEP TRADERS</div>
              <div style="height: 52px;"></div>
              <div style="text-align: right; font-weight: bold; font-size: 8.5pt; line-height: 1.25;">
                Authorised Signatory<br>
                <span style="font-size: 8pt; font-weight: normal;">Proprietor</span>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <!-- Bottom Notice -->
      <div class="footer-notice">
        This is a Computer Generated Tax Invoice - Cum Bill of Supply No Signature Required for Digital Clearance.
      </div>
    </div>
  </div>
`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<title>MDM Egg and Fruit Tax Invoices - 3 Months (July, August, September 2026)</title>
<style>
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  html, body {
    margin: 0;
    padding: 0;
    background-color: #FFF085 !important;
    font-family: 'Segoe UI', 'Calibri', 'Nirmala UI', 'Mangal', Arial, sans-serif;
    color: #000;
  }
  
  .page-container {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    padding: 7mm 8mm 7mm 8mm;
    box-sizing: border-box;
    background-color: #FFF085 !important;
    page-break-inside: avoid;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .page-container:last-child {
    page-break-after: avoid;
  }
  
  /* Voucher Paper Box - Natural Warm Voucher Yellow */
  .voucher-container {
    width: 100%;
    border: 1.5px solid #000;
    background-color: #FFF085 !important;
  }
  
  /* Top Section */
  .top-table {
    width: 100%;
    border-collapse: collapse;
  }
  .top-table td {
    vertical-align: top;
    padding: 5px 9px;
  }
  .store-title {
    font-size: 15.5pt;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: 0.4px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .store-details {
    font-size: 8.5pt;
    margin-top: 2px;
    line-height: 1.35;
  }
  
  .invoice-box-title {
    border: 1.5px solid #000;
    font-size: 11pt;
    font-weight: bold;
    text-align: center;
    padding: 3px 6px;
    margin-bottom: 4px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 0.3px;
  }
  .invoice-meta {
    font-size: 9pt;
    line-height: 1.4;
  }
  
  /* Receiver & Reference */
  .sub-header-table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1.5px solid #000;
    border-bottom: 1.5px solid #000;
  }
  .sub-header-table td {
    padding: 4px 9px;
    vertical-align: top;
    font-size: 8.5pt;
    line-height: 1.3;
  }
  .sub-header-title {
    font-weight: bold;
    font-size: 8.5pt;
    margin-bottom: 2px;
    text-decoration: underline;
  }
  
  /* Product Table - 9 Columns */
  .product-table {
    width: 100%;
    border-collapse: collapse;
  }
  .product-table th, .product-table td {
    border: 1px solid #000;
    padding: 3px 3px;
    font-size: 8.5pt;
    line-height: 1.2;
    height: 22px;
  }
  .product-table th {
    background: transparent;
    font-weight: bold;
    text-align: center;
    font-size: 7.8pt;
    padding: 4px 2px;
  }
  
  .col-sr { width: 5%; text-align: center; }
  .col-desc { width: 34%; text-align: left; padding-left: 6px !important; }
  .col-hsn { width: 10%; text-align: center; font-size: 8pt; }
  .col-qty { width: 7.5%; text-align: center; font-weight: 600; }
  .col-unit { width: 5.5%; text-align: center; font-size: 8pt; }
  .col-rate { width: 9%; text-align: right; padding-right: 5px !important; }
  .col-total { width: 10.5%; text-align: right; padding-right: 5px !important; font-weight: 600; }
  .col-taxable { width: 9.5%; text-align: right; padding-right: 5px !important; }
  .col-gst { width: 9%; text-align: right; padding-right: 5px !important; }
  
  .item-row td {
    height: 26px;
  }
  .empty-row td {
    height: 22px;
  }
  .total-row td {
    height: 25px;
  }

  /* Bottom Tables */
  .lower-table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1.5px solid #000;
  }
  .lower-table td {
    vertical-align: top;
    padding: 0;
  }
  
  /* Tax Breakdown Table */
  .tax-table {
    width: 100%;
    border-collapse: collapse;
  }
  .tax-table th, .tax-table td {
    border: 1px solid #000;
    padding: 2.5px 2px;
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
    padding: 5px 8px;
    font-size: 8.5pt;
    line-height: 1.35;
  }
  
  .bank-details-box {
    padding: 5px 8px;
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
${pagesHtml}
</body>
</html>`;
}

const fullHtml = generateHTML(monthsData);
fs.writeFileSync('C:/Users/rajka/OneDrive/Desktop/general/Yellow_Voucher_Egg_Fruit_3_Months.html', fullHtml);
console.log('Successfully generated 3-month Egg/Fruit HTML template in general!');


const fs = require('fs');

const page1Data = {
  monthTitle: 'October 2026',
  dateStr: '31 October 2026',
  invNo: '2026-27 / ',
  refStr: '1-Oct-26',
  grandTotal: '29,096.00',
  words: 'INR TWENTY NINE THOUSAND NINETY SIX ONLY',
  schemePurpose: 'Cooking Cost & Fuel Material Purchase',
  items: [
    { sr: 1, name: 'हल्दी पाउडर (Haldi Powder)', qty: '3.533', unit: 'KG', rate: '250.06', tot: '883.46' },
    { sr: 2, name: 'धनिया पाउडर (Coriander Powder)', qty: '2.120', unit: 'KG', rate: '175.00', tot: '371.00' },
    { sr: 3, name: 'मिक्स मसाला (Mix Masala)', qty: '1.413', unit: 'KG', rate: '340.00', tot: '480.42' },
    { sr: 4, name: 'लाल मिर्च पाउडर (Red Chili Powder)', qty: '0.706', unit: 'KG', rate: '300.00', tot: '211.80' },
    { sr: 5, name: 'सरसों तेल (Mustard Oil)', qty: '20.759', unit: 'Lit', rate: '189.98', tot: '3943.79' },
    { sr: 6, name: 'सोया बड़ी (Soya Chunks)', qty: '21.125', unit: 'KG', rate: '92.00', tot: '1943.50' },
    { sr: 7, name: 'चना दाल (Chana Dal)', qty: '14.490', unit: 'KG', rate: '100.00', tot: '1449.00' },
    { sr: 8, name: 'मूंग दाल (Moong Dal)', qty: '14.490', unit: 'KG', rate: '100.00', tot: '1449.00' },
    { sr: 9, name: 'मसूर दाल (Masoor Dal)', qty: '14.490', unit: 'KG', rate: '100.00', tot: '1449.00' },
    { sr: 10, name: 'लाल चना (Red Chana)', qty: '57.821', unit: 'KG', rate: '90.00', tot: '5203.89' },
    { sr: 11, name: 'आलू (Potato)', qty: '60.873', unit: 'KG', rate: '30.00', tot: '1826.19' },
    { sr: 12, name: 'प्याज (Onion)', qty: '18.760', unit: 'KG', rate: '39.00', tot: '731.64' },
    { sr: 13, name: 'कद्दू (Pumpkin)', qty: '18.760', unit: 'KG', rate: '39.00', tot: '731.64' },
    { sr: 14, name: 'झिंगा / नेनुआ (Vegetables)', qty: '18.760', unit: 'KG', rate: '39.00', tot: '731.64' },
    { sr: 15, name: 'टमाटर (Tomato)', qty: '18.759', unit: 'KG', rate: '39.00', tot: '731.60' },
    { sr: 16, name: 'सूखी मिर्च (Dry Chilli)', qty: '0.706', unit: 'KG', rate: '250.00', tot: '176.50' },
    { sr: 17, name: 'जीरा (Cumin)', qty: '0.707', unit: 'KG', rate: '490.00', tot: '346.43' },
    { sr: 18, name: 'नमक (Salt)', qty: '4.943', unit: 'KG', rate: '15.00', tot: '74.14' },
    { sr: 19, name: 'जलावन (Firewood / Fuel)', qty: '454.409', unit: 'KG', rate: '14.00', tot: '6361.73' }
  ]
};

const page2Data = {
  monthTitle: 'October 2026',
  dateStr: '31 October 2026',
  invNo: '2026-27 / ',
  refStr: '1-Oct-26',
  grandTotal: '3,010.00',
  words: 'INR THREE THOUSAND AND TEN ONLY',
  schemePurpose: 'Egg & Seasonal Fruit Procurement (अंडा / फल सामग्री क्रय)',
  items: [
    { sr: 1, name: 'अंडा / फल (Egg / Fruit)', qty: '602', unit: 'PCS', rate: '5.00', tot: '3,010.00' }
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
                <td style="padding: 1px 0; text-align: right;">${p.schemePurpose}</td>
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
      <table class="product-table ${isSingleItem ? 'egg-fruit-table' : ''}">
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
          ${tableRows}
          <!-- Total Row -->
          <tr style="font-weight: bold; background: rgba(0,0,0,0.02);">
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
              ${termsText}
            </div>

            <div class="signature-box" style="margin-top: ${isSingleItem ? '26px' : '18px'};">
              <div style="font-weight: bold; font-size: 8.5pt; text-align: right;">For SANDEEP TRADERS</div>
              <div style="height: ${isSingleItem ? '52px' : '48px'};"></div>
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
  </div>`;
}

function generateHTML() {
  const page1 = renderPage(page1Data, false);
  const page2 = renderPage(page2Data, true);

  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<title>MDM Tax Invoices - October 2026 (Ration & Egg/Fruit Vouchers)</title>
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
    padding: 2.2px 3px;
    font-size: 8.5pt;
    line-height: 1.15;
    height: 18.5px;
  }
  .product-table th {
    background: transparent;
    font-weight: bold;
    text-align: center;
    font-size: 7.8pt;
    padding: 3px 2px;
  }
  
  .col-sr { width: 5%; text-align: center; }
  .col-desc { width: 34%; text-align: left; padding-left: 4px !important; }
  .col-hsn { width: 10%; text-align: center; font-size: 8pt; }
  .col-qty { width: 7.5%; text-align: center; font-weight: 600; }
  .col-unit { width: 5.5%; text-align: center; font-size: 8pt; }
  .col-rate { width: 9%; text-align: right; padding-right: 4px !important; }
  .col-total { width: 10.5%; text-align: right; padding-right: 4px !important; font-weight: 600; }
  .col-taxable { width: 9.5%; text-align: right; padding-right: 4px !important; }
  .col-gst { width: 9%; text-align: right; padding-right: 4px !important; }
  
  /* Single Item Table Spacing (Page 2) */
  .egg-fruit-table td {
    padding: 3px 3px;
    height: 22px;
  }
  .egg-fruit-table .item-row td {
    height: 26px;
  }
  .egg-fruit-table .empty-row td {
    height: 22px;
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

const htmlContent = generateHTML();
fs.writeFileSync('C:/Users/rajka/OneDrive/Desktop/general/Yellow_Vouchers_October_2026.html', htmlContent);
console.log('Successfully generated October 2026 2-page voucher HTML!');

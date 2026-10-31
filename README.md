# MDM Yellow Tax Invoice & Voucher Generator

This repository contains the templates, generator scripts, and generated PDF invoices for Mid-Day Meal (मध्याह्न भोजन योजना) grocery, fuel, and egg/fruit procurement for **मध्य विद्यालय चण्डीनोवाँ** (M.S. Chandinowan).

---

## 📋 Vendor & Institution Details

| Field | Detail |
| :--- | :--- |
| **Vendor Name** | **SANDEEP TRADERS** |
| **GSTIN** | `10BGLPK7944K2Z3` |
| **Mobile** | `9973959953` |
| **Address** | Main Road Kashichak (Nawada), Bihar |
| **Deals In** | Grocery, Mid Day Meal Rations, Fuel & General Goods |
| **Billed To (School)** | **मध्य विद्यालय चण्डीनोवाँ** (M.S. Chandinowan) |
| **Block / District** | Kashichak / Nawada (Bihar) |
| **UDISE Code** | `10360400501` |
| **Scheme** | Mid-Day Meal (मध्याह्न भोजन योजना) |
| **Bank Account Name** | **DINESH KUMAR** |
| **Bank Name** | **P.N.B. CHANDI NUWAN (Nawada)** |
| **Account Number** | `7840002100000312` |
| **IFSC Code** | `PUNB0784000` |
| **Paper Style** | Authentic natural warm voucher yellow (`#FFF085`) |

---

## 📦 Generated Invoices Summary

### 1. Egg & Fruit Invoices (अंडा / फल सामग्री क्रय) - 3 Months
Single-item voucher series for weekly egg and seasonal fruit distribution:

| Month | Invoice No. | Date | Quantity | Unit | Rate | Total Amount |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **July 2026** | `2026-27 / ` | 31 July 2026 | 955 | PCS | ₹5.00 | **₹4,775.00** |
| **August 2026** | `2026-27 / ` | 31 August 2026 | 575 | PCS | ₹5.00 | **₹2,875.00** |
| **September 2026** | `2026-27 / ` | 30 September 2026 | 352 | PCS | ₹5.00 | **₹1,760.00** |

- **PDF Output**: `Yellow_Vouchers_Egg_Fruit_3_Months.pdf` (3-page A4 PDF)
- **HTML Source**: `Yellow_Voucher_Egg_Fruit_3_Months.html`
- **Generator Script**: `generate_egg_fruit_3_months.js`

---

### 2. General Grocery, Vegetable & Fuel Invoices (सामग्री एवं जलावन क्रय) - 4 Months
Full grocery, spice, vegetable, oil, and firewood bill book series:

| Month | Invoice No. | Date | Net Payable |
| :--- | :--- | :--- | :---: |
| **June 2026** | `2026-27 / 01` | 30 June 2026 | **₹5,148.00** |
| **July 2026** | `2026-27 / 02` | 31 July 2026 | **₹44,669.00** |
| **August 2026** | `2026-27 / 03` | 31 August 2026 | **₹33,465.00** |
| **September 2026** | `2026-27 / 04` | 30 September 2026 | **₹35,404.00** |

- **PDF Output**: `Yellow_Vouchers_4_Months.pdf` (4-page A4 PDF)
- **HTML Source**: `Yellow_Voucher_4_Months.html`
- **Generator Script**: `generate_4_months.js`

---

## 🛠️ How to Generate Future Months

Whenever you have details for an upcoming month (e.g. October 2026, November 2026):

### For Egg & Fruit:
1. Open `generate_egg_fruit_3_months.js`.
2. Append or update the month in `monthsData`:
   ```javascript
   {
     monthTitle: 'October 2026',
     dateStr: '31 October 2026',
     invNo: '2026-27 / EF-04',
     refStr: '1-Oct-26',
     grandTotal: '...', // e.g. '5,000.00'
     words: 'INR ... ONLY',
     items: [
       { sr: 1, name: 'अंडा / फल (Egg / Fruit)', qty: '1000', unit: 'PCS', rate: '5.00', tot: '5,000.00' }
     ]
   }
   ```
3. Run the generator:
   ```powershell
   node generate_egg_fruit_3_months.js
   ```
4. Print to PDF via Chrome headless:
   ```powershell
   Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--headless --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf=`"Yellow_Vouchers_Egg_Fruit.pdf`" `"Yellow_Voucher_Egg_Fruit_3_Months.html`"" -Wait -NoNewWindow
   ```

### For Grocery / Vegetables / Fuel:
1. Open `generate_4_months.js`.
2. Add the month data and item breakdown in `monthsData`.
3. Run `node generate_4_months.js`.
4. Compile to PDF with Chrome headless.

---

## 📁 Repository File Index

- `Yellow_Vouchers_Egg_Fruit_3_Months.pdf` - 3-page printable PDF for July, August, September Egg & Fruit.
- `Yellow_Voucher_Egg_Fruit_3_Months.html` - HTML template for 3-month Egg & Fruit vouchers.
- `generate_egg_fruit_3_months.js` - Automated node generator for Egg & Fruit invoices.
- `Yellow_Vouchers_4_Months.pdf` - 4-page printable PDF for June–September 2026 grocery invoices.
- `Yellow_Voucher_4_Months.html` - HTML template for 4-month grocery invoices.
- `generate_4_months.js` - Automated node generator for 4-month grocery invoices.
- `Yellow_Voucher_Interactive_Editor.html` - Live browser editor for real-time recalculation.

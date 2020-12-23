function invoiceNumberFormat(num) {
  let numStr = num.toString()
  while(numStr.length < 5) numStr = "0" + numStr
  return numStr
}

module.exports = {invoiceNumberFormat}

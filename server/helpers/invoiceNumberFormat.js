function invoiceNumberFormat(num) {
  let numStr = num.toString()
  while(numStr.length < 5) numStr = "0" + numStr
  return numStr
}


function polisGenerator(value) {
  let tempValue = value.split('.')
  tempValue.splice(1, 0, '01')
  return tempValue.join('.')
}


module.exports = {invoiceNumberFormat, polisGenerator}

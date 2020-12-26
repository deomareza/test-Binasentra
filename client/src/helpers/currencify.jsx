function currencify(value) {
  value = value.toFixed(2)
  let valueStr = value.toString()
  let valueCommas = valueStr.split('.')
  valueStr = valueCommas[0].split('').reverse()
  
  let output = ''
  for(let i = 0; i < valueStr.length; i++){
    if ( i%3 ===0 && i > 0) {
      output = ',' + output
    }
   output = valueStr[i] + output
  }
  return output + `.${valueCommas[1]}`

}

module.exports = { currencify }
function premiDasar(price, rate, time) {
  return (price * rate) / (1000 * time)
}

const adminFee = 10000

function biayaTotal(price, rate, time) {
  return (premiDasar(price, rate, time)) + adminFee
}


module.exports = {premiDasar, adminFee, biayaTotal}
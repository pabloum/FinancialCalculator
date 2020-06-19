const  smic = 877803;
const  smicIntegral = 11411439;
const  legalTransportSubsudy = 102854;
const  unidadValorTributario = 35607;

function getSaludObligatoria(salary) {
  return salary * 0.04;
}

function getMedicinaPrepagada(healthPay) {
  return healthPay;
}

function getPension(salary) {
  return salary * 0.04;
}

function getFondoSolidaridad(salary) {
  return (salary > smic * 4) ? salary * 0.01 : 0;
}

function getAportesFPC_AFC(volontaryPension) {
  return volontaryPension;
}

function getPagoSalud(healthPay) {
  return healthPay;
}

function getBaseGravable(dependientes, salary, saludObligatoria, medicinaPrepagada, pension, fondoSolidaridad, aportesFPC_AFC, pagoSalud) {
  var baseGravable = salary - saludObligatoria - pension - fondoSolidaridad - medicinaPrepagada * 0.7 - aportesFPC_AFC * 0.7;
  return baseGravable * 0.75;
}

function getReteFuente(dependientes, baseGravable) {
  var uvt = baseGravable / unidadValorTributario;

  var reteFuente = 0;

  if (uvt < 95) {
    reteFuente = 0;
  } else if (uvt > 95 && uvt < 150) {
    reteFuente = ((uvt - 95) * 0.19) * unidadValorTributario;
  } else if (uvt > 150 && uvt < 360) {
    reteFuente = ((uvt - 150) * 0.28 + 10) * unidadValorTributario;
  } else if (uvt > 360 && uvt < 640) {
    reteFuente = ((uvt - 360) * 0.33 + 69) * unidadValorTributario;
  } else if (uvt > 640 && uvt < 945) {
    reteFuente = ((uvt - 640) * 0.35 + 162) * unidadValorTributario;
  } else if (uvt > 945 && uvt < 2300) {
    reteFuente = ((uvt - 945) * 0.37 + 268) * unidadValorTributario;
  } else if (uvt > 2300) {
    reteFuente = ((uvt - 2300) * 0.39 + 770) * unidadValorTributario;
  }

  return Math.round(reteFuente * 100) / 100;
}

function getCompensacionMensual(dependientes, salary) {
  return "no lo c";
}

function getInput(nameInput) {
  var input = parseInt(document.getElementById(nameInput).value);
  return isNaN(input) ? 0 : input;
}

var calculatorBtnClick = function (e) {
  var salary            = getInput("txtSalary");
  var nonsalaryIncome   = getInput("txtNonSalaryIncome");
  var volontaryPension  = getInput("txtVolontaryPension");
  var healthPay         = getInput("txtHealthPay");
  var dwellingInterest  = getInput("txtInterestForDwelling");
  var dependientes      = document.getElementById("optDepentiendes").value == "yes";

  // Results v1
  var averageMonthlyIncome         = salary + nonsalaryIncome;
  var transportSubsudy             = (salary > smic * 2) ? 0 : legalTransportSubsudy;
  var maximumExemptFVPContribution = averageMonthlyIncome * 0.3; // TODO

  // Results v2
  var saludObligatoria    = getSaludObligatoria(salary);
  var medicinaPrepagada   = getMedicinaPrepagada(healthPay);
  var pension             = getPension(salary);
  var fondoSolidaridad    = getFondoSolidaridad(salary);
  var aportesFPC_AFC      = getAportesFPC_AFC(volontaryPension);
  var pagoSalud           = getPagoSalud(healthPay);
  var baseGravable        = getBaseGravable(dependientes, averageMonthlyIncome, saludObligatoria, medicinaPrepagada, pension, fondoSolidaridad, aportesFPC_AFC, pagoSalud);
  var reteFuente          = getReteFuente(dependientes, baseGravable);
  var compensacionMensual = getCompensacionMensual(dependientes, salary);

  // Pupulate results
  document.getElementById("txtTotalIncomeAverageResult").innerHTML           = averageMonthlyIncome;
  document.getElementById("txtTransportSubsideResult").innerHTML             = transportSubsudy;
  document.getElementById("txtMaximumExemptFVPContributionResult").innerHTML = maximumExemptFVPContribution;

  // Results v2
  document.getElementById("txtSaludObligatoria").innerHTML      = saludObligatoria;
  document.getElementById("txtPagoMedicinaPrepagada").innerHTML = medicinaPrepagada;
  document.getElementById("textPension").innerHTML              = pension;
  document.getElementById("txtFondoSolidaridad").innerHTML      = fondoSolidaridad;
  document.getElementById("txtAportesFPV_AFC").innerHTML        = aportesFPC_AFC;
  document.getElementById("txtPagoSalud").innerHTML             = pagoSalud;
  document.getElementById("txtBaseGravable").innerHTML          = baseGravable;
  document.getElementById("txtReteFuente").innerHTML            = reteFuente;
  document.getElementById("txtCompensacionMensual").innerHTML   = compensacionMensual;

  alert("Hoda, Vero :3 <3");
}

var btnCalculator = document.getElementById("btnCalculeCO");
btnCalculator.addEventListener('click', calculatorBtnClick);

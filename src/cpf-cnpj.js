'use strict';

function validarCpf(cpf) {
  const digitos = obterDigitos(cpf.slice(-11));

  if (digitos.every((digit) => digit === digitos[0])) {
    return false;
  }

  const pesosIniciais = [9, 10];

  const digitosVerificadores = pesosIniciais.map((k) => obterDigitoVerificacaoCpf(mod11Cpf(k, digitos)));

  return digitosVerificadores[0] === digitos[9] && digitosVerificadores[1] === digitos[10];
}

exports.validarCpf = validarCpf;

function validarCnpj(cnpj) {
  const digitos = obterDigitos(cnpj.slice(-14));

  const digitosVerificadores = obterDigitosVerificacaoCnpj(digitos);

  return digitosVerificadores[0] === digitos[12] && digitosVerificadores[1] === digitos[13];
}

exports.validarCnpj = validarCnpj;

exports.validarCpfOuCnpj = (str) => validarCpf(str) || validarCnpj(str);

function tornaCpfValido(cpf) {
  cpf[9] = obterDigitoVerificacaoCpf(mod11Cpf(9, cpf));
  cpf[10] = obterDigitoVerificacaoCpf(mod11Cpf(10, cpf));

  return cpf.join('');
}

exports.tornaCpfValido = tornaCpfValido;

function tornaCnpjValido(cnpj) {
  cnpj[12] = obterDigitoVerificacaoCnpj(mod11Cnpj(cnpj)[0]);
  cnpj[13] = obterDigitoVerificacaoCnpj(mod11Cnpj(cnpj)[1]);

  return cnpj.join('');
}

exports.tornaCnpjValido = tornaCnpjValido;

const mod11Cpf = (k, cpf) => (cpf.slice(0, k).reduce((acc, digit, i) => acc + digit * (k + 1 - i), 0) * 10) % 11;

const mod11Cnpj = (cnpj) => {
  const zipWithMultiply = (value, i) => value * cnpj[i];

  const pesosIniciais = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  return [sum(pesosIniciais.map(zipWithMultiply)) % 11, sum([6].concat(pesosIniciais).map(zipWithMultiply)) % 11];
};

const obterDigitoVerificacaoCnpj = (mod) => (mod < 2 ? 0 : 11 - mod);

const obterDigitoVerificacaoCpf = (mod) => (mod === 10 ? 0 : mod);

const obterDigitosVerificacaoCnpj = (cnpj) => mod11Cnpj(cnpj).map(obterDigitoVerificacaoCnpj);

const obterDigitos = (str) => str.split('').map(Number);

const sum = (array) => array.reduce((acc, n) => acc + n);

function formatarCpfCnpj(value) {
  const valueStr = value.toString();

  if (valueStr.length === 11) {
    return valueStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  return valueStr.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

exports.formatarCpfCnpj = formatarCpfCnpj;

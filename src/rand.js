"use strict";

const cpfCnpj = require("./cpf-cnpj");
const uf = require("./uf");

module.exports = {
  digitoAleatorio,
  getAlphanumeric,
  getRandomBool,
  getRandomCpf,
  getRandomCpfOrCnpj,
  getRandomCnpj,
  getRandomItem,
  getRandomNumber,
  getRandomUf,
  getRgNumber,
};

function digitoAleatorio() {
  return Math.random().toString().substr(5, 1);
}

function getAlphanumeric(min, max) {
  return getRandomString(min, max, alphanumerics);
}

function getRandomBool() {
  return getRandomNumber({ min: 0, max: 1 });
}

function getRandomCpfOrCnpj() {
  return getRandomBool() ? getRandomCpf() : getRandomCnpj();
}

const getRandomFilledArray = (length) =>
  Array.from({ length }, () => getRandomNumber({ size: 1 }));

function getRandomCpf() {
  return cpfCnpj.tornaCpfValido(getRandomFilledArray(11));
}

function getRandomCnpj() {
  return cpfCnpj.tornaCnpjValido(getRandomFilledArray(14));
}

function getRandomItem(arrayLike) {
  return arrayLike[getRandomNumber({ min: 0, max: arrayLike.length - 1 })];
}

function getRandomNumber({ min, max, size = undefined }) {
  let minValue = min;
  let maxValue = max;

  if (size) {
    minValue = 10 ** (size - 1);
    maxValue = parseInt("9".repeat(size), 10);
  }

  minValue = Math.ceil(minValue);
  maxValue = Math.floor(maxValue);

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRandomUf() {
  return getRandomItem(uf.ufs);
}

function getRgNumber() {
  return getRandomNumber({ size: 9 });
}

const alphanumerics =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomString(min, max, charPool) {
  let text = "";

  const strLength = getRandomNumber({ min, max });

  for (let i = 0; i < strLength; i += 1) {
    const isFirstOrLastChar = [0, strLength - 1].includes(i);

    if (isFirstOrLastChar) {
      const charPoolWithoutSpace = charPool.replace(/ /g, "");

      text += getRandomItem(charPoolWithoutSpace);

      continue;
    }

    text += getRandomItem(charPool);
  }

  return text;
}

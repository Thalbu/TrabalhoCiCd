"use strict";

const { test } = require("tap");

const utils = require("../src");

test("digitoAleatorio: gera um digito aleatório entre 0 e 9", (t) => {
  for (let i = 0; i < 1000; i += 1) {
    const digito = utils.digitoAleatorio();

    t.ok(digito >= 0 && digito <= 9);
  }

  t.end();
});

test("getRandomNumber: funcao getRandomNumber com size", (t) => {
  for (let i = 0; i < 50; i += 1) {
    const randomInt = utils.getRandomNumber({ size: 5 });

    t.ok(randomInt >= 10000 && randomInt <= 99999);
  }

  t.end();
});

test("getRandomNumber: testa função getRandomNumber com min e max", (t) => {
  const numbers = [];
  const min = 0;
  const max = 50;

  for (let i = min; i < max * 10; i += 1) {
    const randomNumber = utils.getRandomNumber({ min, max });

    t.ok(randomNumber >= min && randomNumber <= max);

    numbers.push(randomNumber);
  }

  for (let i = min; i <= max; i += 1) {
    t.ok(numbers.some((x) => x === i));
  }

  t.end();
});

test("getAlphanumeric: testa função getAlphanumeric", (t) => {
  for (let i = 0; i < 50; i += 1) {
    const alfaNumeric = utils.getAlphanumeric(2, 5);

    t.ok(alfaNumeric.length >= 2 && alfaNumeric.length <= 5);
  }
  t.end();
});

test("getRandomItem: testa função getRandomItem", (t) => {
  const items = ["a", "b", "c"];

  for (let i = 0; i <= items.length; i += 1) {
    const item = utils.getRandomItem(items);

    t.ok(items.includes(item));
  }

  t.end();
});

test("getRandomUf: testa função getRandomUf", (t) => {
  for (let i = 0; i <= 27 * 10; i += 1) {
    const uf = utils.getRandomUf();

    t.same(uf.length, 2);
    t.same(uf, uf.toUpperCase());
    t.ok(utils.validaUf(uf));
  }
  t.end();
});

test("getRgNumber: testa função getRgNumber", (t) => {
  const rgNum = utils.getRgNumber().toString();

  t.same(rgNum.length, 9);
  t.ok(parseInt(rgNum, 10));
  t.end();
});

test("getRandomCPForCNPJ: testa função getRandomCPForCNPJ", (t) => {
  for (let i = 0; i < 1000; i += 1) {
    const cpfOrCNpj = utils.getRandomCpfOrCnpj();

    t.ok(utils.validarCpfOuCnpj(cpfOrCNpj), `[${i}]${cpfOrCNpj}`);
  }
  t.end();
});

test("getRandomBool: testa função getRandomBool", (t) => {
  const randomBool = utils.getRandomBool();

  t.ok(randomBool === 0 || randomBool === 1);
  t.end();
});

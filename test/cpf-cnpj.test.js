'use strict';

const { test } = require('tap');

const cpfCnpj = require('../src/cpf-cnpj');
const rand = require('../src/rand');

const cnpjsValidos = require('./fixtures/cnpjs-validos');
const cpfsValidos = require('./fixtures/cpfs-validos');

test('validarCpf: sucesso ao validar cpfs válidos', (t) => {
  cpfsValidos.forEach((cpf, i) => {
    t.ok(cpfCnpj.validarCpf(cpf), `[${i}]${cpf}`);
  });
  t.end();
});

test('validarCpf: erro ao validar cpf com dígitos repetidos', (t) => {
  for (let i = 1; i <= 9; i += 1) {
    t.notOk(cpfCnpj.validarCpf(Array(11).fill(i).join('')));
  }

  t.end();
});

test('validarCpf: erro ao validar cpfs inválidos', (t) => {
  cpfsValidos.forEach((cpf) => {
    const digitosCpf = cpf.split('');
    let digitoInvalido;

    for (let i = 0; i < 50; i += 1) {
      do {
        digitoInvalido = rand.digitoAleatorio();
      } while (digitoInvalido === digitosCpf[10]);
    }

    digitosCpf[10] = digitoInvalido;

    const cpfInvalido = digitosCpf.join('');

    const result = cpfCnpj.validarCpf(cpfInvalido);

    t.notOk(result);
  });
  t.end();
});

test('validarCnpj: sucesso ao validar cnpjs válidos', (t) => {
  cnpjsValidos.forEach((cnpj, i) => {
    t.ok(cpfCnpj.validarCnpj(cnpj), `[${i}]${cnpj}`);
  });
  t.end();
});

test('validarCnpj: erro ao validar cnpjs inválidos', (t) => {
  cnpjsValidos.forEach((cnpj) => {
    const digitosCnpj = cnpj.split('');

    const digitosInvalidos = [3, 4, 5];

    digitosCnpj[12] = rand.getRandomItem(digitosInvalidos);
    digitosCnpj[11] = rand.getRandomItem(digitosInvalidos);

    const cnpjInvalido = digitosCnpj.join('');

    t.notOk(cpfCnpj.validarCnpj(cnpjInvalido));
  });
  t.end();
});

test('validarCpf: erro ao passar um cpf com menos de 11 digitos', (t) => {
  t.notOk(cpfCnpj.validarCpf('163946072'));
  t.end();
});

test('tornaCpfValido: verifica se o cpf retornado possui 11 digitos', (t) => {
  const [cpfValido] = cpfsValidos;
  const cpf = cpfCnpj.tornaCpfValido([...cpfValido]);

  t.ok(cpf.length === 11);
  t.end();
});

test('tornaCnpjValido: o cnpj retornado deve ter 14 digitos', (t) => {
  const [cnpjValido] = cnpjsValidos;
  const cnpj = cpfCnpj.tornaCnpjValido([...cnpjValido]);

  t.ok(cnpj.length === 14);
  t.end();
});

test('validarCpfCnpj: o cpf retornado deve ser válido', (t) => {
  const [cpfValido] = cpfsValidos;
  const ehCpfValido = cpfCnpj.validarCpfOuCnpj(cpfValido);

  t.ok(ehCpfValido);
  t.end();
});

test('validarCpfCnpj: o retorno da função deve ser falso, pois é uma string aleatória', (t) => {
  const str = '15426589426854';
  const ehCpfValido = cpfCnpj.validarCpfOuCnpj(str);

  t.notOk(ehCpfValido);
  t.end();
});

test('validarCpf: o penultimo digito deve ser inválido, portanto cpf inválido', (t) => {
  const cpfInvalido = '12345678917';
  const ehCpfInvalido = cpfCnpj.validarCpf(cpfInvalido);

  t.notOk(ehCpfInvalido);
  t.end();
});

test('validarCpf: o ultimo digito deve ser inválido, portanto cnpj inválido', (t) => {
  const cnpjInvalido = '57009628000176';
  const ehCnpjInvalido = cpfCnpj.validarCnpj(cnpjInvalido);

  t.notOk(ehCnpjInvalido);
  t.end();
});

test('formatarCpfCnpj: formata cpf para o padrão NNN.NNN.NNN-NN utilizado no boleto', (t) => {
  const cpf = '85453992560';
  const cpfFormatado = cpfCnpj.formatarCpfCnpj(cpf);

  t.same(cpfFormatado, '854.539.925-60');
  t.end();
});

test('formatarCpfCnpj: formata cnpj para o padrão NN.NNN.NNN/NNNN-NN utilizado no boleto', (t) => {
  const cnpj = '42468398000135';
  const cnpjFormatado = cpfCnpj.formatarCpfCnpj(cnpj);

  t.same(cnpjFormatado, '42.468.398/0001-35');
  t.end();
});

const n_cuenta = document.querySelector("#n_cuenta");
const password = document.querySelector("#password");
const user_form = document.querySelector("#user_form");
const btn_user_form = document.querySelector("#btn_user_form");
const current_user_data = document.querySelector("#current_user_data");

let current_cuenta = {};
let current_user = {};

class CuentaBancaria {
  constructor({ saldo = 0, numeroCuenta = 0 }) {
    this.saldo = saldo;
    this.numeroCuenta = numeroCuenta;
  }
  retiro({ cantidad = 0 }) {
    if (cantidad <= this.saldo) this.saldo = this.saldo - cantidad;
    else console.log("No tienes saldo sufuciente");
  }
  abono({ cantidad = 0 }) {
    this.saldo = this.saldo + cantidad;
  }
}
class Banco {
  constructor(cuentaBancaria) {
    this.cuentaBancaria = cuentaBancaria;
  }
  retiro(cantidad) {
    this.cuentaBancaria.retiro({ cantidad });
  }
  abono(cantidad) {
    this.cuentaBancaria.abono({ cantidad });
  }
}

const lucho_HSBC = new CuentaBancaria({ numeroCuenta: 101, saldo: 900 });
//const HSBC = new Banco(lucho_HSBC);
const david_HSBC = new CuentaBancaria({ numeroCuenta: 102, saldo: 900 });
//const HSBC = new Banco(lucho_HSBC);
const oscar = {
  numeroCuenta: 101,
  pass: "oscar001",
  userName: "Oscar",
};
const david = {
  numeroCuenta: 102,
  pass: "david001",
  userName: "David",
};

const db = [oscar, david];

const getUser = () => {
  const nc = n_cuenta.value;
  const p = password.value;

  const user = db.filter((user) => {
    if (user.numeroCuenta == nc && user.pass == p) {
      return user;
    }
  });
  current_user = user[0];

  if (user[0].userName == "David") {
    current_cuenta = david_HSBC;
  }

  if (user[0].userName == "Oscar") {
    current_cuenta = lucho_HSBC;
  }
};

const buildH4 = (text) => {
  const h4 = document.createElement("h4");
  h4.textContent = text;
  return h4;
};

const showDataUser = () => {
  const userName = buildH4(`Usuario: ${current_user.userName}`);
  const nc = buildH4(`Número de cuenta: ${current_user.numeroCuenta}`);
  current_user_data.append(userName, nc);
};

const login = (e) => {
  e.preventDefault();
  getUser();
  n_cuenta.classList.add("d-none");
  password.classList.add("d-none");
  btn_user_form.classList.add("d-none");
  showDataUser();
};

user_form.addEventListener("submit", login);

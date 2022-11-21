const API_KEY = "0dcafcf33d4da92c6848e7f0";
const currencyElement_1 = document.getElementById("currency-1");
const currencyElement_2 = document.getElementById("currency-2");
const amountElement_1 = document.getElementById("amount-1");
const amountElement_2 = document.getElementById("amount-2");
const rateElement = document.getElementById("rate");
const swapBtn = document.getElementById("button");

currencyElement_1.addEventListener("change", exchange);
currencyElement_2.addEventListener("change", exchange);
amountElement_1.addEventListener("input", exchange);
swapBtn.addEventListener("click", swap);

function exchange() {
  let current_1 = currencyElement_1.value;
  let current_2 = currencyElement_2.value;
  console.log(current_1);

  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${current_1}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      rate = data.conversion_rates[current_2];
      console.log(current_2, rate);

      amountElement_2.value = rate * amountElement_1.value;
      rateElement.innerHTML = `1 ${current_1} = ${rate} ${current_2}`;
    })
    .catch((err) => console.log(err));
}

function swap() {
  const temp = currencyElement_1.value;
  currencyElement_1.value = currencyElement_2.value;
  currencyElement_2.value = temp;
  exchange();
}

// DOM elements
const resultEl = document.getElementById("result");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const lengthEl = document.getElementById("length");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Generate event listen
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  // we want to get a number value

  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;

  resultEl.innerText = generatePassword(
    hasNumber,
    hasSymbol,
    hasUpper,
    hasLower,
    length
  );
});

// Copy password to clipboard
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

// Generate password function
function generatePassword(number, symbol, upper, lower, length) {
  // 1. initialize a password variable
  let generatedPassword = "";

  // 2. filter out unchecked types
  const typesCount = number + symbol + upper + lower;

  //   console.log("typesCount: ", typesCount);

  const typesArray = [{ number }, { symbol }, { upper }, { lower }].filter(
    (item) => Object.values(item)[0]
  );

  //   console.log("typesArray: ", typesArray);

  if (typesCount === 0) {
    return "";
  }

  // 3. loop over the length call generator function for each type
  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];

      //   console.log("funcName: ", funcName);

      generatedPassword += randomFunc[funcName]();
    });
  }

  // 4. add final password to the password variable and return
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Generator functions - https://net-comber.com/charset.html

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// multiplied by 26 (letters in the alphabet)
// within the lower case range

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// multiplied by 10 (0-9)

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.:;";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomSymbol());

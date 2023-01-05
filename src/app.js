const checkbox_hasLow = document.querySelector("#checkbox-hasLow");
const checkbox_hasUp = document.querySelector("#checkbox-hasUp");
const checkbox_hasNum = document.querySelector("#checkbox-hasNum");
const checkbox_hasSpe = document.querySelector("#checkbox-hasSpe");
const charLen_range = document.querySelector("#charLen_amount");
const txtArea = document.querySelector("#password-textarea");
const btnGen = document.querySelector("#pwGenerate");
const btnCopy = document.querySelector("#pwCopy");

const CHARS = {
    low: "abcdefghijklmnopqrstuvwxyz",
    up: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    num: "0123456789",
    spe: "!@#$%^&*()_+-=[{]}|;:,<.>/?`\"'~",
};

const PW = {
    charLen: 8,
    hasLow: true,
    hasUp: true,
    hasNum: true,
    hasSpe: true,
    charPool: "",
    PASSWORD: "",
    reset: function () {
        (this.PASSWORD = ""),
            (this.charLen = 50),
            (this.hasLow = true),
            (this.hasUp = true),
            (this.hasNum = true),
            (this.hasSpe = true),
            (this.charPool = "");
    },
};

const randomChar = (length) => Math.floor(Math.random() * length);

function copyToClipboard() {
    txtArea.select();
    txtArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    txtArea.setSelectionRange(0, 0);
}

function setValues() {
    PW.charLen = charLen_range.value;
    PW.hasLow = checkbox_hasLow.checked;
    PW.hasUp = checkbox_hasUp.checked;
    PW.hasNum = checkbox_hasNum.checked;
    PW.hasSpe = checkbox_hasSpe.checked;

    if (!PW.hasLow && !PW.hasUp && !PW.hasNum && !PW.hasSpe)
        return alert("Please select at least 1 character type.");
    if (PW.charLen > 100 || PW.charLen < 1)
        return alert("Please choose a character length between 1 and 100.");
    if (PW.hasLow) PW.charPool += CHARS.low;
    if (PW.hasUp) PW.charPool += CHARS.up;
    if (PW.hasNum) PW.charPool += CHARS.num;
    if (PW.hasSpe) PW.charPool += CHARS.spe;

    while (PW.PASSWORD.length < PW.charLen)
        PW.PASSWORD += PW.charPool[randomChar(PW.charPool.length)];

    txtArea.value = PW.PASSWORD ? PW.PASSWORD : "None";
}

function run() {
    PW.reset();
    setValues();
}

btnGen.addEventListener("click", run);
btnCopy.addEventListener("click", copyToClipboard);

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const angle = document.getElementById("angle");

const preview = document.getElementById("preview");

const cssCode = document.getElementById("cssCode");
const hexCode = document.getElementById("hexCode");
const rgbCode = document.getElementById("rgbCode");
const hslCode = document.getElementById("hslCode");

const angleValue = document.getElementById("angleValue");
const toast = document.getElementById("toast");

function update() {
  const c1 = color1.value;
  const c2 = color2.value;
  const ang = angle.value;

  angleValue.textContent = ang + "°";

  const gradient = `linear-gradient(${ang}deg, ${c1}, ${c2})`;

  preview.style.background = gradient;

  cssCode.value = `background: ${gradient};`;
  hexCode.value = `${c1} → ${c2}`;
  rgbCode.value = `${hexToRgb(c1)} → ${hexToRgb(c2)}`;
  hslCode.value = `${hexToHsl(c1)} → ${hexToHsl(c2)}`;
}

function copy(id) {
  const input = document.getElementById(id);
  navigator.clipboard.writeText(input.value);
  showToast();
}

function showToast() {
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 1500);
}

// HEX → RGB
function hexToRgb(hex) {
  let r = parseInt(hex.substr(1, 2), 16);
  let g = parseInt(hex.substr(3, 2), 16);
  let b = parseInt(hex.substr(5, 2), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// HEX → HSL
function hexToHsl(H) {
  let r = parseInt(H.substring(1, 3), 16) / 255;
  let g = parseInt(H.substring(3, 5), 16) / 255;
  let b = parseInt(H.substring(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
      min = Math.min(r, g, b);

  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
}

color1.addEventListener("input", update);
color2.addEventListener("input", update);
angle.addEventListener("input", update);

update();
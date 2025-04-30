const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin');
const resultDiv = document.getElementById('result');

const gifts = ["Cap", "Mug", "Key Tag", "Umbrella"];
const segments = [];

const giftIndices = new Set();
while (giftIndices.size < 4) {
  giftIndices.add(Math.floor(Math.random() * 10));
}

let giftIndex = 0;
for (let i = 0; i < 10; i++) {
  if (giftIndices.has(i)) {
    segments.push(gifts[giftIndex % gifts.length]);
    giftIndex++;
  } else {
    segments.push("Try Again");
  }
}

const segmentAngle = 360 / segments.length;


function drawWheel() {
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#66BB6A", "#BA68C8", "#FFA726", "#f44336", "#009688", "#9C27B0", "#607D8B"]

  for (let i = 0; i < segments.length; i++) {
    const angle = (segmentAngle * i) * (Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angle, angle + (segmentAngle * Math.PI / 180));
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle + (segmentAngle / 2) * Math.PI / 180);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Arial";
    ctx.fillText(segments[i], 230, 10);
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(250, 250, 50, 0, 2 * Math.PI);
  ctx.fillStyle = "#2C2C54";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(250, 200); // Tip of the pointer
  ctx.lineTo(240, 230);
  ctx.lineTo(260, 230);
  ctx.closePath();
  ctx.fillStyle = "#FF3E4D";
  ctx.fill();

  // Draw "SPIN" text inside center circle
  ctx.fillStyle = "#FF7F7F";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("SPIN", 250, 258);
}

drawWheel();
spinButton.addEventListener('click', () => {
  const randomDegree = 3600 + Math.floor(Math.random() * 720);
  canvas.style.transition = 'transform 5s ease-out';
  canvas.style.transform = `rotate(${randomDegree}deg)`;

  const winningIndex = segments.length - Math.floor((randomDegree % 360) / segmentAngle) - 1;

  setTimeout(() => {
    const gift = segments[winningIndex >= 0 ? winningIndex : 0];
    if (gift === "Try Again") {
      resultDiv.innerHTML = `❌ Try Again!`;
    } else {
      resultDiv.innerHTML = `🎁 Congratulations! You won a <b>${gift}</b>!`;

      
      fetch('result.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `gift=${encodeURIComponent(gift)}`
      });
    }

    canvas.style.transition = "none";
    canvas.style.transform = "rotate(0deg)";
  }, 5200);
});

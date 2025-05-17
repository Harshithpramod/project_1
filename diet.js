 function showPlan(type) {
  const output = document.getElementById("plan-output");

  if (type === "loss") {
    output.innerHTML = `
      <h2>Weight Loss Diet Plan</h2>
      <ul>
        <li><strong>Breakfast:</strong> Oatmeal with fruits + green tea</li>
        <li><strong>Mid-morning:</strong> Apple or cucumber</li>
        <li><strong>Lunch:</strong> Brown rice + grilled chicken + salad</li>
        <li><strong>Evening snack:</strong> Handful of almonds + herbal tea</li>
        <li><strong>Dinner:</strong> Steamed veggies + soup or dal</li>
      </ul>
    `;
  } else if (type === "gain") {
    output.innerHTML = `
      <h2>Weight Gain Diet Plan</h2>
      <ul>
        <li><strong>Breakfast:</strong> Whole eggs + peanut butter toast + milk</li>
        <li><strong>Mid-morning:</strong> Banana + protein shake</li>
        <li><strong>Lunch:</strong> Rice + chicken curry + dal + veggies</li>
        <li><strong>Evening snack:</strong> Mixed nuts + smoothie</li>
        <li><strong>Dinner:</strong> Roti + paneer + rice + salad</li>
      </ul>
    `;
  }
}

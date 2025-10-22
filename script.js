document.getElementById('formRemuneracion').addEventListener('submit', e => {
  e.preventDefault();

  const sueldo = parseFloat(document.getElementById('sueldoBase').value);
  const afp = parseFloat(document.getElementById('afp').value);
  const salud = parseFloat(document.getElementById('salud').value);

  const descAFP = sueldo * (afp / 100);
  const descSalud = sueldo * (salud / 100);
  const liquido = sueldo - descAFP - descSalud;

  document.getElementById('resultado').innerHTML = `
    <h3>Resultado</h3>
    <p>Descuento AFP: $${descAFP.toFixed(0)}</p>
    <p>Descuento Salud: $${descSalud.toFixed(0)}</p>
    <p><strong>Líquido a pago: $${liquido.toFixed(0)}</strong></p>
  `;
});
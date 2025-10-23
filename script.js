document.getElementById('formRemuneracion').addEventListener('submit', (e) => {
  e.preventDefault();

  // Helpers
  const val = (id) => document.getElementById(id).value;
  const num = (id) => {
    const n = parseFloat(val(id));
    return isNaN(n) ? 0 : n;
  };
  const fmt = (n) => n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  // Datos personales
  const fechaLiquidacion = val('fechaLiquidacion');
  const nombre = val('nombre');
  const rut = val('rut');
  const cargo = val('cargo');
  const fechaIngreso = val('fechaIngreso');

  // Haberes imponibles ingresados
  const sueldoBase = num('sueldoBase');
  const comisiones = num('comisiones');
  const semanaCorrida = num('semanaCorrida');

  // Gratificación legal: 25% de (sueldo base + comisiones + semana corrida)
  const baseGratificacion = sueldoBase + comisiones + semanaCorrida;
  const gratificacion = baseGratificacion * 0.25;

  const totalImponible = sueldoBase + comisiones + semanaCorrida + gratificacion;

  // Previsión y salud
  const afpSelect = document.getElementById('afpNombre');
  const afpComisionPorc = parseFloat(afpSelect.value) || 0; // comisión adicional
  const afpNombre = afpSelect.options[afpSelect.selectedIndex]?.getAttribute('data-afp') || '';

  const saludSelect = document.getElementById('salud');
  const saludPorc = parseFloat(saludSelect.value) || 0;
  const saludNombre = saludSelect.options[saludSelect.selectedIndex]?.getAttribute('data-salud') || '';

  // Descuentos sobre imponible
  const descAfp10 = totalImponible * 0.10; // 10%
  const descAfpComision = totalImponible * (afpComisionPorc / 100);
  const descSalud = totalImponible * (saludPorc / 100);
  const descCesantia = totalImponible * 0.03; // 3%
  const totalDescuentos = descAfp10 + descAfpComision + descSalud + descCesantia;

  // Haberes no imponibles
  const movilizacion = num('movilizacion');
  const colacion = num('colacion');
  const totalNoImponibles = movilizacion + colacion;

  // Totales
  const sueldoBruto = totalImponible + totalNoImponibles;
  const sueldoLiquido = sueldoBruto - totalDescuentos;

  // Renderizado de la "hoja" de liquidación
  document.getElementById('resultado').innerHTML = `
    <div class="liquidacion">
      <section class="datos-personales">
        <div class="encabezado">
          <h3>Liquidación de Sueldo</h3>
          <div class="fecha">Fecha: ${fechaLiquidacion || '-'}</div>
        </div>
        <div class="grid-datos">
          <div><strong>Nombre:</strong> ${nombre || '-'}</div>
          <div><strong>RUT:</strong> ${rut || '-'}</div>
          <div><strong>Cargo:</strong> ${cargo || '-'}</div>
          <div><strong>Fecha de ingreso:</strong> ${fechaIngreso || '-'}</div>
        </div>
      </section>

      <section class="haberes-imponibles">
        <h4>Haberes imponibles</h4>
        <div class="row"><span>Sueldo base</span><span>${fmt(sueldoBase)}</span></div>
        <div class="row"><span>Comisiones</span><span>${fmt(comisiones)}</span></div>
        <div class="row"><span>Semana corrida</span><span>${fmt(semanaCorrida)}</span></div>
        <div class="row"><span>Gratificación legal (25%)</span><span>${fmt(gratificacion)}</span></div>
        <div class="row total"><span>Total imponible</span><span>${fmt(totalImponible)}</span></div>
      </section>

      <section class="descuentos">
        <h4>Descuentos</h4>
        <div class="row"><span>AFP 10%</span><span>- ${fmt(descAfp10)}</span></div>
        <div class="row"><span>Comisión ${afpNombre} (${afpComisionPorc.toFixed(2)}%)</span><span>- ${fmt(descAfpComision)}</span></div>
        <div class="row"><span>Salud ${saludNombre} (${saludPorc}%)</span><span>- ${fmt(descSalud)}</span></div>
        <div class="row"><span>Seguro de cesantía (3%)</span><span>- ${fmt(descCesantia)}</span></div>
        <div class="row total"><span>Total descuentos</span><span>- ${fmt(totalDescuentos)}</span></div>
      </section>

      <section class="haberes-no-imponibles">
        <h4>Haberes no imponibles</h4>
        <div class="row"><span>Movilización</span><span>${fmt(movilizacion)}</span></div>
        <div class="row"><span>Colación</span><span>${fmt(colacion)}</span></div>
        <div class="row total"><span>Total no imponibles</span><span>${fmt(totalNoImponibles)}</span></div>
      </section>

      <section class="totales">
        <h4>Totales</h4>
        <div class="row"><span>Sueldo bruto</span><span>${fmt(sueldoBruto)}</span></div>
        <div class="row enfasis"><span>Líquido a pago</span><span>${fmt(sueldoLiquido)}</span></div>
      </section>
    </div>
  `;
});
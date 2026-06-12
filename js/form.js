/* =====================================================================
   ELITE HYPERCARS — Validación del formulario de contacto (form.js)
   ---------------------------------------------------------------------
   Valida los campos del formulario con JavaScript puro:
   - Nombre: obligatorio, mínimo 3 caracteres
   - Correo: obligatorio, formato de email válido
   - Teléfono: obligatorio, solo dígitos / símbolos telefónicos
   - Marca favorita: debe seleccionarse una opción
   - Comentarios: obligatorio, mínimo 10 caracteres
   Si todo es válido, muestra un mensaje de éxito y reinicia el formulario.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successBox = document.getElementById("form-success");

  // Expresiones regulares para validación
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+()\d\s-]{7,}$/;

  /* Función auxiliar: marca un campo como inválido o válido */
  function setValidity(fieldId, isValid) {
    const group = document.getElementById(fieldId).closest(".form-group");
    if (isValid) {
      group.classList.remove("invalid");
    } else {
      group.classList.add("invalid");
    }
    return isValid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar el envío real (sitio estático)

    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const marca = document.getElementById("marca").value;
    const comentarios = document.getElementById("comentarios").value.trim();

    // Validar cada campo
    let valid = true;
    valid = setValidity("nombre", nombre.length >= 3) && valid;
    valid = setValidity("correo", emailRegex.test(correo)) && valid;
    valid = setValidity("telefono", phoneRegex.test(telefono)) && valid;
    valid = setValidity("marca", marca !== "") && valid;
    valid = setValidity("comentarios", comentarios.length >= 10) && valid;

    // Si todo es válido, mostrar éxito y limpiar
    if (valid) {
      successBox.style.display = "block";
      successBox.textContent =
        "¡Gracias, " + nombre + "! Tu mensaje ha sido enviado correctamente.";
      form.reset();
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });

      // Ocultar el mensaje después de 6 segundos
      setTimeout(function () {
        successBox.style.display = "none";
      }, 6000);
    } else {
      successBox.style.display = "none";
    }
  });

  /* Validación en tiempo real: limpiar el error al corregir el campo */
  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      field.closest(".form-group").classList.remove("invalid");
    });
  });
});

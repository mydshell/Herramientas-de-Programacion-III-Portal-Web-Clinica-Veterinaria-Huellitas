(function () {
  "use strict";

  var form = document.getElementById("appointmentForm");
  if (!form) {
    return;
  }

  var fields = {
    nombre: document.getElementById("nombre"),
    email: document.getElementById("email"),
    telefono: document.getElementById("telefono"),
    servicio: document.getElementById("servicio"),
    mensaje: document.getElementById("mensaje"),
    acepta: document.getElementById("acepta")
  };
  var status = document.getElementById("formStatus");

  function setState(field, valid, message) {
    var feedback = document.getElementById(field.id + "Feedback");
    field.classList.remove("is-valid", "is-invalid");
    field.classList.add(valid ? "is-valid" : "is-invalid");
    field.setAttribute("aria-invalid", valid ? "false" : "true");
    if (feedback) {
      feedback.textContent = message;
    }
    return valid;
  }

  function validateName() {
    var value = fields.nombre.value.trim();
    return setState(
      fields.nombre,
      value.length >= 3,
      "Ingresa un nombre de mínimo 3 caracteres."
    );
  }

  function validateEmail() {
    var value = fields.email.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return setState(fields.email, valid, "Ingresa un correo electrónico válido.");
  }

  function validatePhone() {
    var value = fields.telefono.value.trim();
    var digits = value.replace(/\D/g, "");
    var valid = /^(\+?57\s?)?3\d{2}[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value) || /^573\d{9}$/.test(digits) || /^3\d{9}$/.test(digits);
    return setState(fields.telefono, valid, "Ingresa un número de teléfono colombiano válido.");
  }

  function validateService() {
    return setState(
      fields.servicio,
      fields.servicio.value !== "",
      "Selecciona el servicio de interés."
    );
  }

  function validateMessage() {
    var value = fields.mensaje.value.trim();
    return setState(
      fields.mensaje,
      value.length >= 20,
      "El mensaje debe tener mínimo 20 caracteres."
    );
  }

  function validateAccept() {
    return setState(
      fields.acepta,
      fields.acepta.checked,
      "Debes aceptar el contacto para poder enviar la solicitud."
    );
  }

  function validateForm() {
    var checks = [
      validateName(),
      validateEmail(),
      validatePhone(),
      validateService(),
      validateMessage(),
      validateAccept()
    ];
    return checks.every(Boolean);
  }

  fields.nombre.addEventListener("input", validateName);
  fields.email.addEventListener("input", validateEmail);
  fields.telefono.addEventListener("input", validatePhone);
  fields.servicio.addEventListener("change", validateService);
  fields.mensaje.addEventListener("input", validateMessage);
  fields.acepta.addEventListener("change", validateAccept);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateForm()) {
      status.className = "alert alert-danger form-status";
      status.textContent = "Revisa los campos marcados antes de enviar la solicitud.";
      var firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    status.className = "alert alert-success form-status";
    status.textContent = "Solicitud recibida. La Clínica Veterinaria Huellitas se comunicará contigo para confirmar la cita.";
    form.reset();
    Object.keys(fields).forEach(function (key) {
      fields[key].classList.remove("is-valid", "is-invalid");
      fields[key].setAttribute("aria-invalid", "false");
    });
  });
})();

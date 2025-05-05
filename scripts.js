const contacto = document.getElementById("contacto");
const contacto_form = document.getElementById("contact-form");
const inputs = document.querySelectorAll("#contacto input");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const campos = {
  nombre: false,
  apellido: false,
  email: false,
  telefono: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    //Un caso para cada tipo de input
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, "apellido");

      break;
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    //Devolverá verdadero si la RegEx se cumplió
    document
      .getElementById(`grupo_${campo}`)
      .classList.add("formulario_grupo-correcto");
    document
      .getElementById(`grupo_${campo}`)
      .classList.remove("formulario_grupo-incorrecto");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo_${campo}`)
      .classList.remove("formulario_grupo-correcto");
    document
      .getElementById(`grupo_${campo}`)
      .classList.add("formulario_grupo-incorrecto");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  //console.log(input.getAttribute('id'))
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

document.addEventListener("DOMContentLoaded", () => {
    //e es evento
    contacto.addEventListener("submit", (e) => {
    e.preventDefault(); //que no se envíe sin comprobación previa
    //Comprobar que todos los campos se encuentren correctos
    if (campos.nombre && campos.apellido && campos.email && campos.telefono) {
        contacto_form.reset();

        document.querySelectorAll(".formulario_grupo-correcto").forEach((i) => {
        i.classList.remove("formulario_grupo-correcto");
        });
        //Mostrar pop-up
        document.getElementById("popup-confirmacion").classList.add('popup-activo')
    } else {
        document.querySelectorAll(".required").forEach((i) => {
        i.classList.add("required-activo");
        });
    }
    
    });

    // Cerrar popup
    document.getElementById("cerrar-popup").addEventListener("click", () => {
        console.log("click")
        document.getElementById("popup-confirmacion").style.color = "blue"
        document.getElementById("popup-confirmacion").classList.add("popup-inactivo")
    });
})


/* CONTADOR VISITAS */
// Iniciar el contador del localStorage o iniciarlo en 0
let visitas = localStorage.getItem("contadorVisitas");
visitas = visitas ? parseInt(visitas) + 1 : 1;

localStorage.setItem("contadorVisitas", visitas);

// Mostrarlo en pantalla
document.getElementById("visitas").innerText = visitas;


/* CUENTA REGRESIVA */
const fechaObjetivo = new Date("2025-05-05T23:59:00");

const cuenta = document.getElementById("time");

const intervalo = setInterval(() => {
  const ahora = new Date();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    clearInterval(intervalo);
    cuenta.textContent = "cuenta regresiva finalizada!";
    return;
  }

  // Cálculo de días, horas, minutos y segundos restantes
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  cuenta.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}, 1000);

/* Películas con carga dinámica */
//Array de películas con la info necesaria
const peliculas = [
    {
      titulo: "la sociedad de los poetas muertos",
      descripcion: "Un profesor muy dedicado enseña a sus alumnos a pensar por sí mismos y a vivir con pasión.",
      imagen: "img/la_sociedad.jpg",
      alt: "La Sociedad de los Poetas Muertos"
    },
    {
      titulo: "contratiempo",
      descripcion: "Un hombre reconocido se ve envuelto en un crimen y debe demostrar su inocencia con ayuda de una prestigiosa abogada.",
      imagen: "img/contratiempo.jpg",
      alt: "Contratiempo"
    },
    {
      titulo: "diario de una pasión",
      descripcion: "Una historia de amor única entre dos jóvenes de distintas clases sociales",
      imagen: "img/diario_de_una_pasion.jpg",
      alt: "Diario de una Pasión"
    }
];
//Obtengo el id del contenedor donde se intertarán las películas
const contenedor = document.getElementById("peliculas-container");

peliculas.forEach(pelicula => {
    //Por cada película creo un div e incorporo su información
    const div = document.createElement("div");
    div.classList.add("pelicula");

    div.innerHTML = `
        <img src="${pelicula.imagen}" alt="${pelicula.alt}" title="${pelicula.alt}" />
        <h3>${pelicula.titulo}</h3>
        <p>${pelicula.descripcion}</p>
    `;

    contenedor.appendChild(div);
});
  
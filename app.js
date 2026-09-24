// app.js - Interactividad para el Stand de Humanística IV

let suenoBurbujaActivo = null;

// Inicializar componentes al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  crearLuciernagas();
  inicializarTrivia();
  cargarCompromisos();
  generarCodigoQR();
});

// --- EFECTO ESTÉTICO: LUCIÉRNAGAS AMBIENTALES EN EL HERO ---
function crearLuciernagas() {
  const container = document.getElementById('firefliesContainer');
  if (!container) return;
  container.innerHTML = '';

  const cantidad = window.innerWidth < 640 ? 15 : 32;

  for (let i = 0; i < cantidad; i++) {
    const firefly = document.createElement('div');
    const isGold = Math.random() > 0.45;
    firefly.className = `firefly ${isGold ? 'firefly-gold' : 'firefly-green'}`;
    
    // Posición y animación aleatoria
    const top = Math.random() * 95;
    const left = Math.random() * 95;
    const size = Math.random() * 5 + 3;
    const duration = Math.random() * 4 + 3.5;
    const delay = Math.random() * 5;

    firefly.style.top = `${top}%`;
    firefly.style.left = `${left}%`;
    firefly.style.width = `${size}px`;
    firefly.style.height = `${size}px`;
    firefly.style.animationDuration = `${duration}s`;
    firefly.style.animationDelay = `${delay}s`;

    container.appendChild(firefly);
  }
}

// --- MODAL EMERGENTE DE INFORMACIÓN DE LOS SUEÑOS (IDÉNTICO A ESCANEAR QR) ---
let suenoModalActivo = null;

const infoSuenosModal = {
  social: {
    iconName: 'shield-alert',
    iconBg: 'bg-blue-100 text-blue-700',
    iconColor: 'text-blue-600',
    badgeText: 'Capítulo I • Sueño Social (n. 8-27)',
    badgeClass: 'bg-blue-100 text-blue-800 border border-blue-200',
    titulo: 'Un Sueño Social: Justicia, Pueblos y Dignidad',
    cita: '«Sueño con una Amazonia que luche por los derechos de los más pobres, de los pueblos originarios, de los últimos, donde su voz sea escuchada y su dignidad promovida.» (n. 7)',
    citaClass: 'bg-blue-50/80 text-blue-950 border-blue-200',
    puntos: [
      '<strong>Injusticia y crimen:</strong> Denuncia abierta contra la tala, minería y petroleras que expulsan violentamente a las comunidades de sus tierras ancestrales.',
      '<strong>Nuevas esclavitudes:</strong> Alerta ante la migración forzada a las periferias urbanas con miseria, desarraigo, discriminación y trata de personas.',
      '<strong>Sana indignación y perdón:</strong> Llamado urgente a no anestesiar la conciencia y pedido explícito de perdón por los crímenes cometidos incluso por miembros de la Iglesia.',
      '<strong>Diálogo social protagónico:</strong> Los pueblos indígenas deben ser los interlocutores principales y no convidados pasivos, escuchando su cosmovisión del <em>"Buen Vivir"</em>.'
    ]
  },
  cultural: {
    iconName: 'palette',
    iconBg: 'bg-amber-100 text-amber-700',
    iconColor: 'text-amber-600',
    badgeText: 'Capítulo II • Sueño Cultural (n. 28-40)',
    badgeClass: 'bg-amber-100 text-amber-800 border border-amber-200',
    titulo: 'Un Sueño Cultural: El Poliedro Amazónico',
    cita: '«Sueño con una Amazonia que preserve esa riqueza cultural que la destaca, donde brilla de modos tan diversos la belleza humana.» (n. 7)',
    citaClass: 'bg-amber-50/80 text-amber-950 border-amber-200',
    puntos: [
      '<strong>El Poliedro Amazónico:</strong> Reconocimiento de miles de comunidades y más de 110 pueblos en aislamiento voluntario (PIAV) como tesoros que no deben desaparecer.',
      '<strong>Cuidar las raíces:</strong> Escuchar las leyendas y relatos orales de los ancianos frente a la manipulación homogeneizadora de la economía de consumo.',
      '<strong>Cultivar sin desarraigar:</strong> Educar potenciando las capacidades autóctonas de las comunidades sin generar colonizaciones culturales foráneas.',
      '<strong>Encuentro intercultural:</strong> La diversidad no es una amenaza ni un indigenismo estático: las diferencias deben ser puentes de enriquecimiento mutuo.'
    ]
  },
  ecologico: {
    iconName: 'sprout',
    iconBg: 'bg-emerald-100 text-emerald-700',
    iconColor: 'text-emerald-600',
    badgeText: 'Capítulo III • Sueño Ecológico (n. 41-60)',
    badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    titulo: 'Un Sueño Ecológico: Custodiar la Creación',
    cita: '«Sueño con una Amazonia que custodie celosamente la abrumadora hermosura natural que la engalana, la vida desbordante que llena sus ríos y sus selvas.» (n. 7)',
    citaClass: 'bg-emerald-50/80 text-emerald-950 border-emerald-200',
    puntos: [
      '<strong>La selva que crece sobre el suelo:</strong> El suelo amazónico es pobre en humus; la deforestación lleva a la desertificación irreversible y afecta el clima mundial.',
      '<strong>El gran río de la vida:</strong> <em>«El río no nos separa, nos une, nos ayuda a convivir entre diferentes culturas y lenguas»</em>.',
      '<strong>Profecía de la contemplación:</strong> Mirar la selva con amor, asombro sagrado y reverencia, desterrando el paradigma tecnocrático del saqueo extractivo.',
      '<strong>Sobriedad feliz y nuevos hábitos:</strong> Resistir la cultura del descarte y adoptar un estilo de vida más sobrio, fraterno y pacífico.'
    ]
  },
  eclesial: {
    iconName: 'church',
    iconBg: 'bg-purple-100 text-purple-700',
    iconColor: 'text-purple-600',
    badgeText: 'Capítulo IV • Sueño Eclesial (n. 61-110)',
    badgeClass: 'bg-purple-100 text-purple-800 border border-purple-200',
    titulo: 'Un Sueño Eclesial: Rostro Amazónico',
    cita: '«Sueño con comunidades cristianas capaces de entregarse y de encarnarse en la Amazonia, hasta el punto de regalar a la Iglesia nuevos rostros con rasgos amazónicos.» (n. 7)',
    citaClass: 'bg-purple-50/80 text-purple-950 border-purple-200',
    puntos: [
      '<strong>Inculturación del Evangelio:</strong> Adaptar el anuncio y la liturgia a las expresiones indígenas (ritos, cantos, danzas) valorando su sabiduría ancestral.',
      '<strong>Eucaristía sin aduanas:</strong> Asegurar la presencia sacramental a los más pobres, superando rigideces disciplinarias excluyentes.',
      '<strong>La fuerza de las mujeres:</strong> Gratitud y homenaje: durante décadas fueron mujeres quienes mantuvieron viva la Iglesia en ausencia de sacerdotes; Francisco pide roles estables con liderazgo decisorio.',
      '<strong>Protagonismo laical:</strong> Desarrollar ministerios laicales, promover más diáconos permanentes y organizar equipos misioneros itinerantes.'
    ]
  }
};

function abrirModalSueno(tipo) {
  suenoModalActivo = tipo;
  const modal = document.getElementById('modalSuenoDetalle');
  const data = infoSuenosModal[tipo];
  if (!modal || !data) return;

  const iconContainer = document.getElementById('modalSuenoIconContainer');
  iconContainer.className = `w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-md ${data.iconBg}`;
  iconContainer.innerHTML = `<i data-lucide="${data.iconName}" class="w-7 h-7 ${data.iconColor}"></i>`;

  const badgeEl = document.getElementById('modalSuenoBadge');
  badgeEl.className = `text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full inline-block mb-1.5 ${data.badgeClass}`;
  badgeEl.textContent = data.badgeText;

  document.getElementById('modalSuenoTitulo').textContent = data.titulo;

  const citaContainer = document.getElementById('modalSuenoCitaContainer');
  citaContainer.className = `p-4 rounded-2xl mb-4 text-xs sm:text-sm italic font-serif leading-relaxed text-center border ${data.citaClass}`;
  document.getElementById('modalSuenoCita').textContent = data.cita;

  const puntosUl = document.getElementById('modalSuenoPuntos');
  puntosUl.innerHTML = '';
  data.puntos.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = p;
    puntosUl.appendChild(li);
  });

  modal.classList.remove('hidden');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function cerrarModalSueno() {
  const modal = document.getElementById('modalSuenoDetalle');
  if (modal) {
    modal.classList.add('hidden');
  }
  suenoModalActivo = null;
}

function irDesdeModalAlCapitulo() {
  if (!suenoModalActivo) return;
  const tipo = suenoModalActivo;
  cerrarModalSueno();

  cambiarSueno(tipo);
  const seccion = document.getElementById('suenos');
  if (seccion) {
    seccion.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- 1. GESTIÓN DE PESTAÑAS DE LOS 4 SUEÑOS ---
const suenosData = {
  social: {
    colorTab: 'bg-blue-600 text-white shadow-lg shadow-blue-900/50',
    tabId: 'tab-social',
    contentId: 'content-social'
  },
  cultural: {
    colorTab: 'bg-amber-600 text-white shadow-lg shadow-amber-900/50',
    tabId: 'tab-cultural',
    contentId: 'content-cultural'
  },
  ecologico: {
    colorTab: 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50',
    tabId: 'tab-ecologico',
    contentId: 'content-ecologico'
  },
  eclesial: {
    colorTab: 'bg-purple-600 text-white shadow-lg shadow-purple-900/50',
    tabId: 'tab-eclesial',
    contentId: 'content-eclesial'
  }
};

function cambiarSueno(suenoKey) {
  // Ocultar todos los contenidos
  const contenidos = document.querySelectorAll('.sueno-content');
  contenidos.forEach(c => {
    c.classList.add('hidden');
    c.classList.remove('block');
  });

  // Resetear estilos de todos los tabs
  const tabs = document.querySelectorAll('.sueno-tab');
  tabs.forEach(t => {
    t.className = 'sueno-tab px-5 py-3 rounded-2xl font-semibold text-sm transition flex items-center gap-2.5 bg-white/10 hover:bg-white/15 text-slate-300 border border-white/10';
  });

  // Activar el seleccionado
  const elegido = suenosData[suenoKey];
  if (elegido) {
    const tabEl = document.getElementById(elegido.tabId);
    const contentEl = document.getElementById(elegido.contentId);
    
    if (tabEl) {
      tabEl.className = `sueno-tab active px-5 py-3 rounded-2xl font-semibold text-sm transition flex items-center gap-2.5 ${elegido.colorTab}`;
    }
    if (contentEl) {
      contentEl.classList.remove('hidden');
      contentEl.classList.add('block');
    }
  }

  // Refrescar iconos dentro del nuevo contenido
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- 2. TRIVIA INTERACTIVA PARA EL STAND ---
const preguntasTrivia = [
  {
    pregunta: "¿En qué año y quién promulgó la Exhortación Apostólica Postsinodal «Querida Amazonia»?",
    opciones: [
      "Papa Benedicto XVI en 2012 tras la cumbre de Río",
      "Papa Francisco en febrero de 2020 tras el Sínodo de la Amazonia",
      "San Juan Pablo II en 1992 durante la Conferencia de Santo Domingo",
      "El Concilio Vaticano II en 1965"
    ],
    correcta: 1,
    explicacion: "¡Correcto! El Papa Francisco la publicó el 2 de febrero de 2020 como fruto y resonancia de la Asamblea Especial del Sínodo de los Obispos sobre la región Panamazónica celebrada en Roma."
  },
  {
    pregunta: "En el Sueño Social, ¿por qué Francisco afirma que «todo planteo ecológico debe ser inseparablemente un planteo social»?",
    opciones: [
      "Porque no sirve un conservacionismo que cuide el bioma pero ignore el clamor y la injusticia contra los pueblos que lo habitan",
      "Porque solo importa el desarrollo económico de las grandes industrias madereras",
      "Porque los indígenas deben abandonar la selva y vivir en las metrópolis",
      "Porque las leyes ambientales no aplican a los países de Sudamérica"
    ],
    correcta: 0,
    explicacion: "¡Exacto! El documento denuncia que separar el ambiente de la justicia social es un error: hay que escuchar tanto el clamor de la tierra como el clamor de los pobres."
  },
  {
    pregunta: "En el Sueño Eclesial, ¿qué homenaje y reconocimiento especial hace el Papa sobre las mujeres amazónicas?",
    opciones: [
      "Que no deberían tener ningún tipo de participación en la comunidad eclesial",
      "Que durante décadas mantuvieron viva la fe en ausencia de sacerdotes y deben tener roles estables y voz decisoria",
      "Que deben abandonar sus costumbres comunitarias para asimilarse al modelo europeo",
      "Que su labor fue puramente administrativa y secundaria"
    ],
    correcta: 1,
    explicacion: "¡Excelente! Francisco reconoce que sin las mujeres la Iglesia en la Amazonia se habría derrumbado, impulsando ministerios y liderazgos con reconocimiento público."
  },
  {
    pregunta: "¿Qué significa el concepto ancestral del «Buen Vivir» recogido en la Exhortación?",
    opciones: [
      "Acumular la mayor cantidad de bienes de consumo posible",
      "Una vida aislada sin ningún contacto con otras personas",
      "Una armonía personal, familiar, comunitaria y cósmica basada en la sobriedad feliz y el cuidado de la tierra",
      "Un modelo de explotación extractivista acelerado"
    ],
    correcta: 2,
    explicacion: "¡Brillante! El «Buen Vivir» representa la sabiduría de los pueblos indígenas que enseña a ser felices sin consumismo voraz, cuidando la creación para las futuras generaciones."
  }
];

let indiceTrivia = 0;
let puntajeTrivia = 0;
let triviaRespondida = false;

function inicializarTrivia() {
  indiceTrivia = 0;
  puntajeTrivia = 0;
  triviaRespondida = false;
  cargarPreguntaTrivia();
}

function cargarPreguntaTrivia() {
  triviaRespondida = false;
  const q = preguntasTrivia[indiceTrivia];
  
  // Elementos
  const titleEl = document.getElementById('triviaQuestionTitle');
  const optionsEl = document.getElementById('triviaOptions');
  const progressText = document.getElementById('triviaProgressText');
  const scoreText = document.getElementById('triviaScoreText');
  const progressBar = document.getElementById('triviaProgressBar');
  const feedbackEl = document.getElementById('triviaFeedback');
  const nextBtn = document.getElementById('triviaNextBtn');

  if (!titleEl || !optionsEl) return;

  titleEl.textContent = q.pregunta;
  progressText.textContent = `Pregunta ${indiceTrivia + 1} de ${preguntasTrivia.length}`;
  scoreText.textContent = `Puntos: ${puntajeTrivia}`;
  progressBar.style.width = `${((indiceTrivia + 1) / preguntasTrivia.length) * 100}%`;
  
  feedbackEl.className = 'hidden p-4 rounded-2xl mb-6 text-sm';
  feedbackEl.innerHTML = '';
  nextBtn.classList.add('hidden');

  // Limpiar y renderizar opciones
  optionsEl.innerHTML = '';
  q.opciones.forEach((opcion, idx) => {
    const btn = document.createElement('button');
    btn.className = 'w-full text-left p-4 rounded-2xl border border-slate-200 bg-white hover:bg-emerald-50/70 hover:border-emerald-300 transition text-sm font-medium text-slate-800 flex items-center justify-between group';
    btn.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-emerald-200/60 text-slate-600 group-hover:text-emerald-800 flex items-center justify-center font-bold text-xs transition">${String.fromCharCode(65 + idx)}</span>
        <span>${opcion}</span>
      </div>
      <i data-lucide="circle" class="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition"></i>
    `;
    btn.onclick = () => responderTrivia(idx, btn);
    optionsEl.appendChild(btn);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function responderTrivia(opcionSeleccionada, btnElement) {
  if (triviaRespondida) return;
  triviaRespondida = true;

  const q = preguntasTrivia[indiceTrivia];
  const feedbackEl = document.getElementById('triviaFeedback');
  const nextBtn = document.getElementById('triviaNextBtn');
  const scoreText = document.getElementById('triviaScoreText');
  const allBtns = document.getElementById('triviaOptions').querySelectorAll('button');

  allBtns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correcta) {
      b.classList.remove('bg-white', 'border-slate-200');
      b.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-950', 'font-semibold');
    }
  });

  if (opcionSeleccionada === q.correcta) {
    puntajeTrivia += 25;
    scoreText.textContent = `Puntos: ${puntajeTrivia}`;
    feedbackEl.className = 'p-4 rounded-2xl mb-6 text-sm bg-emerald-100 text-emerald-900 border border-emerald-300 block animate-in fade-in';
    feedbackEl.innerHTML = `<strong>¡Muy bien!</strong> ${q.explicacion}`;
    
    // Disparar confetti festivo
    if (window.confetti) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  } else {
    btnElement.classList.remove('bg-white', 'border-slate-200');
    btnElement.classList.add('bg-rose-100', 'border-rose-400', 'text-rose-950');
    feedbackEl.className = 'p-4 rounded-2xl mb-6 text-sm bg-amber-100 text-amber-900 border border-amber-300 block animate-in fade-in';
    feedbackEl.innerHTML = `<strong>Casi:</strong> La opción correcta era la indicada en verde. ${q.explicacion}`;
  }

  nextBtn.classList.remove('hidden');
  if (indiceTrivia === preguntasTrivia.length - 1) {
    nextBtn.innerHTML = `<span>Ver Resultado Final</span> <i data-lucide="award" class="w-4 h-4"></i>`;
  } else {
    nextBtn.innerHTML = `<span>Siguiente Pregunta</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
  }
  if (window.lucide) window.lucide.createIcons();
}

function siguientePreguntaTrivia() {
  if (indiceTrivia < preguntasTrivia.length - 1) {
    indiceTrivia++;
    cargarPreguntaTrivia();
  } else {
    mostrarResultadoFinalTrivia();
  }
}

function mostrarResultadoFinalTrivia() {
  const container = document.getElementById('triviaContainer');
  let felicitacion = "";
  if (puntajeTrivia === 100) {
    felicitacion = "¡Puntaje perfecto! Sos un verdadero embajador del cuidado de la Amazonia y la Casa Común.";
    if (window.confetti) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  } else if (puntajeTrivia >= 50) {
    felicitacion = "¡Gran trabajo! Tenés un excelente conocimiento sobre la exhortación apostólica y los 4 sueños.";
  } else {
    felicitacion = "¡Gracias por participar! Te invitamos a repasar los 4 sueños en los paneles superiores de nuestro stand.";
  }

  container.innerHTML = `
    <div class="text-center py-8 space-y-4">
      <div class="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-amber-500 text-slate-950 flex items-center justify-center shadow-xl">
        <i data-lucide="trophy" class="w-10 h-10"></i>
      </div>
      <h3 class="text-2xl sm:text-3xl font-bold font-serif text-slate-900">¡Trivia Completada!</h3>
      <p class="text-emerald-800 text-lg font-bold">Obtuviste: ${puntajeTrivia} / 100 puntos</p>
      <p class="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">${felicitacion}</p>
      
      <div class="pt-6 flex flex-wrap justify-center gap-4">
        <button onclick="reiniciarTriviaCompleta()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition flex items-center gap-2">
          <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Jugar de nuevo
        </button>
        <button onclick="abrirModalQR()" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition flex items-center gap-2">
          <i data-lucide="qr-code" class="w-4 h-4"></i> Compartir Trivia vía QR
        </button>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function reiniciarTrivia() {
  inicializarTrivia();
}

function reiniciarTriviaCompleta() {
  window.location.hash = "#trivia";
  location.reload();
}

function iniciarTriviaStand() {
  const el = document.getElementById('trivia');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// ========================================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// Pegá aquí la URL de tu Web App de Google Apps Script:
// Ejemplo: "https://script.google.com/macros/s/AKfycb.../exec"
// ========================================================
const GOOGLE_SHEETS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4vReOPvXzJgYa-RP-Da9Ezh0jK3HZTIkb1wL_0rXGFWl6LnHX52fn7vGn6KUH9kx-qw/exec";

const compromisosPorDefecto = [
  {
    nombre: "Valentina M.",
    fecha: "Reciente",
    texto: "Reducir el consumo de plásticos de un solo uso y difundir la riqueza cultural de las comunidades originarias amazónicas."
  },
  {
    nombre: "Prof. Marcos",
    fecha: "Reciente",
    texto: "Incorporar el concepto de Ecología Integral en mis clases para concientizar sobre el cuidado de nuestra Casa Común."
  },
  {
    nombre: "Lucía y Tomás",
    fecha: "Reciente",
    texto: "Nos comprometemos a apoyar el consumo responsable y respetar la biodiversidad en nuestros hábitos diarios."
  },
  {
    nombre: "Santiago G.",
    fecha: "Reciente",
    texto: "Reconocer que el grito de la tierra es también el grito de los pobres, actuando con mayor empatía y solidaridad."
  }
];

function escapeHtml(texto) {
  if (!texto) return "";
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

async function cargarCompromisos(animarIcono = false) {
  const iconoRecarga = document.getElementById('iconoRecargaCompromisos');
  if (animarIcono && iconoRecarga) {
    iconoRecarga.classList.add('animate-spin');
  }

  // 1. Mostrar primero lo que haya en localStorage o por defecto (carga instantánea)
  const guardados = localStorage.getItem('stand_compromisos_amazonia');
  let listaActual = guardados ? JSON.parse(guardados) : compromisosPorDefecto;
  renderizarCompromisos(listaActual);

  // 2. Si hay URL de Google Sheets configurada, sincronizar en segundo plano
  if (GOOGLE_SHEETS_SCRIPT_URL && GOOGLE_SHEETS_SCRIPT_URL.trim() !== "") {
    try {
      const respuesta = await fetch(GOOGLE_SHEETS_SCRIPT_URL + '?t=' + Date.now(), {
        method: 'GET',
        cache: 'no-store'
      });
      const datos = await respuesta.json();
      
      if (datos && datos.status === 'success' && Array.isArray(datos.data)) {
        if (datos.data.length > 0) {
          listaActual = datos.data;
        }
        localStorage.setItem('stand_compromisos_amazonia', JSON.stringify(listaActual));
        renderizarCompromisos(listaActual);
      }
    } catch (error) {
      console.warn('No se pudo conectar a Google Sheets temporalmente:', error);
    }
  }

  if (animarIcono && iconoRecarga) {
    setTimeout(() => {
      iconoRecarga.classList.remove('animate-spin');
    }, 600);
  }
}

// Auto-actualizar cada 35 segundos si hay conexión con Google Sheets (ideal para pantalla del stand)
setInterval(() => {
  if (GOOGLE_SHEETS_SCRIPT_URL && GOOGLE_SHEETS_SCRIPT_URL.trim() !== "") {
    cargarCompromisos(false);
  }
}, 35000);

function renderizarCompromisos(lista) {
  const contenedor = document.getElementById('listaCompromisos');
  const contador = document.getElementById('totalCompromisos');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  if (contador) {
    contador.textContent = `${lista.length} ${lista.length === 1 ? 'compromiso' : 'compromisos'}`;
  }

  lista.forEach(item => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3 transition hover:border-emerald-300';
    const inicial = (item.nombre && item.nombre.trim().length > 0) ? item.nombre.trim().charAt(0).toUpperCase() : "A";

    card.innerHTML = `
      <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
        ${inicial}
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <h4 class="font-bold text-xs sm:text-sm text-slate-800">${escapeHtml(item.nombre || "Visitante")}</h4>
          <span class="text-[10px] text-slate-400 font-medium">${escapeHtml(item.fecha || "Reciente")}</span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(item.texto || "")}</p>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

async function agregarCompromiso(event) {
  event.preventDefault();
  const inputNombre = document.getElementById('nombreCompromiso');
  const inputTexto = document.getElementById('textoCompromiso');
  const btnSubmit = document.getElementById('btnPublicarCompromiso');
  const btnTexto = document.getElementById('btnPublicarTexto');
  const estadoMsg = document.getElementById('estadoEnvioCompromiso');

  const nombre = inputNombre.value.trim();
  const texto = inputTexto.value.trim();

  if (!nombre || !texto) return;

  // Estado visual de guardado
  if (btnSubmit) btnSubmit.disabled = true;
  if (btnTexto) btnTexto.textContent = "Publicando...";
  if (estadoMsg) {
    estadoMsg.textContent = "Conectando con el stand...";
    estadoMsg.className = "text-xs text-center font-medium mt-2 text-slate-500 block";
  }

  // Inserción inmediata (Optimistic UI) para respuesta instantánea en pantalla
  const nuevoCompromiso = {
    nombre: nombre,
    texto: texto,
    fecha: "Recién"
  };

  const guardados = localStorage.getItem('stand_compromisos_amazonia');
  const lista = guardados ? JSON.parse(guardados) : [...compromisosPorDefecto];
  lista.unshift(nuevoCompromiso);
  localStorage.setItem('stand_compromisos_amazonia', JSON.stringify(lista));
  renderizarCompromisos(lista);

  // Si Google Sheets está configurado, guardar en la nube
  if (GOOGLE_SHEETS_SCRIPT_URL && GOOGLE_SHEETS_SCRIPT_URL.trim() !== "") {
    try {
      await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Evita bloqueos de CORS con Google Apps Script
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          nombre: nombre,
          texto: texto,
          fecha: new Date().toISOString()
        })
      });

      if (estadoMsg) {
        estadoMsg.textContent = "¡Compromiso guardado en la nube y publicado en el stand!";
        estadoMsg.className = "text-xs text-center font-medium mt-2 text-emerald-600 block";
      }
    } catch (error) {
      console.error('Error al guardar en Google Sheets:', error);
      if (estadoMsg) {
        estadoMsg.textContent = "Guardado localmente. Reintentaremos sincronizar.";
        estadoMsg.className = "text-xs text-center font-medium mt-2 text-amber-600 block";
      }
    }
  } else {
    if (estadoMsg) {
      estadoMsg.textContent = "¡Compromiso sumado al muro!";
      estadoMsg.className = "text-xs text-center font-medium mt-2 text-emerald-600 block";
    }
  }

  // Confetti de celebración
  if (window.confetti) {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  }

  // Limpiar campos
  inputNombre.value = '';
  inputTexto.value = '';

  // Restaurar botón
  setTimeout(() => {
    if (btnSubmit) btnSubmit.disabled = false;
    if (btnTexto) btnTexto.textContent = "Publicar en el Stand";
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => {
      if (estadoMsg) estadoMsg.classList.add('hidden');
    }, 4000);
  }, 1000);
}

// --- 4. CÓDIGO QR GENERATOR ---
function generarCodigoQR() {
  const qrContainer = document.getElementById('qrcode');
  const currentUrlText = document.getElementById('currentUrlText');
  if (!qrContainer) return;

  qrContainer.innerHTML = '';
  // Enlace a la página principal
  const currentUrl = (window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file'))
    ? `${window.location.origin}${window.location.pathname}`
    : (window.location.href || 'https://vatican.va');
  
  if (currentUrlText) {
    currentUrlText.textContent = currentUrl;
  }

  new QRCode(qrContainer, {
    text: currentUrl,
    width: 180,
    height: 180,
    colorDark: "#062319",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

function abrirModalQR() {
  const modal = document.getElementById('modalQR');
  if (modal) {
    generarCodigoQR();
    modal.classList.remove('hidden');
  }
}

function cerrarModalQR() {
  const modal = document.getElementById('modalQR');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// --- 5. MODALES DE RESUMEN Y ORACIÓN ---
function toggleResumenModal() {
  const modal = document.getElementById('modalResumen');
  if (modal) {
    modal.classList.toggle('hidden');
  }
  if (window.lucide) window.lucide.createIcons();
}

function mostrarOracionCompleta() {
  const modal = document.getElementById('modalOracion');
  if (modal) {
    modal.classList.remove('hidden');
  }
  if (window.lucide) window.lucide.createIcons();
}

function cerrarOracionModal() {
  const modal = document.getElementById('modalOracion');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// --- 6. MENÚ MÓVIL ---
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Cerrar modales si se hace clic fuera del contenido
window.addEventListener('click', (e) => {
  const modalQR = document.getElementById('modalQR');
  const modalResumen = document.getElementById('modalResumen');
  const modalOracion = document.getElementById('modalOracion');
  const modalSueno = document.getElementById('modalSuenoDetalle');

  if (e.target === modalQR) cerrarModalQR();
  if (e.target === modalResumen) toggleResumenModal();
  if (e.target === modalOracion) cerrarOracionModal();
  if (e.target === modalSueno) cerrarModalSueno();
});

// Recrear luciérnagas si se redimensiona la pantalla
window.addEventListener('resize', () => {
  crearLuciernagas();
});


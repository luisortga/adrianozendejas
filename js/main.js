/* Adriano Zendejas // Maestro Shifu — React (UMD, sin build) + GSAP ScrollTrigger */
const { useState, useEffect, useRef } = React;
const h = React.createElement;
const KICK = "https://kick.com/adrianozendejas32";
const IMG = "./images/channels4_profile.jpg";
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
gsap.registerPlugin(ScrollTrigger);

const NAV = [
  ["#irl", "IRL"],
  ["#ideas", "Ideas"],
  ["#comunidad", "Comunidad"],
  ["#contacto", "Contacto"],
];
const CARDS = [
  [
    "IRL y recorridos en vivo",
    "El canal se identifica con la categoría IRL: experiencias y recorridos fuera del estudio.",
    "text-kick",
  ],
  [
    "Viajes y experiencias",
    "Los títulos recientes incluyen viajes por Centroamérica, como Guatemala y El Salvador.",
    "text-cyan",
  ],
  [
    "Calle, retos y aventuras",
    "Explorar lugares, convivir con la comunidad y documentar todo durante el directo.",
    "text-gold",
  ],
];
const TEAM = [
  [
    "AZ",
    "Adriano Zendejas",
    "Actor y creador de contenido. En Kick como adrianozendejas32: “Simplemente el Maestro Shifu”.",
    "text-kick",
    true,
  ],
  [
    "MS",
    "Comunidad de Shifu",
    "Participa en el chat y en los momentos que se desarrollan durante los directos.",
    "text-cyan",
  ],
  [
    "CL",
    "Clips y momentos",
    "Los clips públicos permiten descubrir lo más destacado de las transmisiones.",
    "text-gold",
  ],
];
const CATS = ["IRL / Recorrido", "Viajes", "Charlas", "Retos con el team"];
const SEED = [
  {
    id: 1,
    t: "Recorrido IRL con el Maestro Shifu",
    d: "Directo de exploración y convivencia en exteriores.",
    u: "@carlos_valle",
    v: 342,
  },
  {
    id: 2,
    t: "Exploración IRL nocturna",
    d: "Formato de recorrido nocturno; no es un stream confirmado.",
    u: "@kick_mexico_fan",
    v: 289,
  },
  {
    id: 3,
    t: "Ruta IRL por una nueva ciudad",
    d: "Idea de viaje y exploración; no es un evento anunciado.",
    u: "@dark_streamer99",
    v: 215,
  },
];

/* ---------- utilidades ---------- */
const Icon = (n, c = "") =>
  h(
    "span",
    { className: "material-symbols-outlined " + c, "aria-hidden": true },
    n,
  );
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
};
const chars = (s) =>
  s.split("").map((c, i) => h("span", { key: i, className: "char" }, c));
const Eyebrow = (t) =>
  h("p", { className: "text-kick font-semibold text-sm mb-3" }, t);

/* ---------- secciones ---------- */
function Banner() {
  return h(
    "a",
    {
      href: KICK,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Abrir el canal de Kick de Adriano Zendejas",
      className: "banner",
    },
    h(
      "div",
      { className: "banner-frame" },
      h("img", {
        src: "images/offline.png",
        alt: "Portada del canal: Adriano Zendejas, @adrianozendejas32 en Instagram, TikTok y Kick",
        width: 1073,
        height: 637,
        fetchpriority: "high",
        className: "banner-img",
      }),
    ),
    h(
      "span",
      { className: "banner-tag" },
      Icon("play_arrow", "!text-lg"),
      "Ver canal en Kick",
    ),
  );
}

// Transición al navegar: barrido verde, salto a la sección y entrada de su contenido
function goTo(e, href) {
  const t = document.querySelector(href);
  if (!t) return;
  e.preventDefault();
  const top = t.getBoundingClientRect().top + window.scrollY - 64;
  if (reduced) return window.scrollTo(0, top);
  const w = document.getElementById("wipe");
  gsap
    .timeline()
    .set(w, { transformOrigin: "50% 100%" })
    .to(w, { scaleY: 1, duration: 0.35, ease: "power3.in" })
    .add(() => window.scrollTo({ top, behavior: "instant" }))
    .set(w, { transformOrigin: "50% 0%" })
    .to(w, { scaleY: 0, duration: 0.5, ease: "power3.out" })
    .fromTo(
      t.querySelectorAll("h2, .stagger, form"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "transform,opacity",
      },
      "-=0.3",
    );
}

function Header() {
  return h(
    "header",
    {
      className:
        "sticky top-0 z-50 bg-base/80 backdrop-blur-md border-b border-white/5",
    },
    h(
      "div",
      {
        className:
          "max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4",
      },
      h(
        "a",
        {
          href: "#hero",
          className:
            "font-display font-extrabold tracking-tight flex items-center gap-2",
        },
        h("span", {
          className: "w-2 h-5 bg-kick rounded-sm shadow-[0_0_12px_#53FC18]",
        }),
        "Maestro Shifu",
      ),
      h(
        "nav",
        { className: "hidden md:flex gap-7 text-sm font-semibold text-soft" },
        NAV.map(([href, l]) =>
          h(
            "a",
            {
              key: href,
              href,
              onClick: (e) => goTo(e, href),
              className: "hover:text-kick transition-colors",
            },
            l,
          ),
        ),
      ),
      h(
        "a",
        {
          href: KICK,
          target: "_blank",
          rel: "noopener noreferrer",
          className:
            "btn-kick rounded-lg px-4 py-2 text-sm font-extrabold flex items-center gap-1.5",
        },
        "Ver en Kick",
      ),
    ),
  );
}

function Hero() {
  const root = useRef(),
    img = useRef(),
    num = useRef();
  useEffect(() => {
    if (reduced) {
      num.current.textContent = "898K*";
      return;
    }
    const ctx = gsap.context(() => {
      // Único momento orquestado: entrada del título + foto + contador
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".char", { yPercent: 110, rotate: 6, duration: 1, stagger: 0.03 })
        .from(
          ".hero-fade",
          { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5",
        )
        .from(
          ".hero-photo",
          {
            clipPath: "inset(100% 0 0 0)",
            duration: 1.1,
            ease: "power3.inOut",
          },
          0.2,
        );
      const o = { n: 0 };
      gsap.to(o, {
        n: 898,
        duration: 2,
        delay: 0.6,
        ease: "power2.out",
        onUpdate: () => (num.current.textContent = Math.round(o.n) + "K*"),
      });
      // Parallax suave de la foto al hacer scroll
      gsap.to(img.current, {
        yPercent: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return h(
    "section",
    {
      id: "hero",
      ref: root,
      className: "relative max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-20 md:pt-16",
    },
    h("div", {
      className:
        "absolute -top-24 left-0 w-[520px] h-[320px] bg-kick/10 blur-[130px] rounded-full pointer-events-none",
    }),
    h(
      "div",
      { className: "relative grid lg:grid-cols-12 gap-10 items-center" },
      h(
        "div",
        { className: "lg:col-span-7" },
        h(
          "p",
          {
            className:
              "hero-fade inline-flex items-center gap-2 text-sm font-semibold text-kick mb-5",
          },
          h(
            "span",
            { className: "relative flex h-2.5 w-2.5" },
            h("span", {
              className:
                "animate-ping absolute inline-flex h-full w-full rounded-full bg-kick opacity-75",
            }),
            h("span", {
              className:
                "relative inline-flex rounded-full h-2.5 w-2.5 bg-kick",
            }),
          ),
          "Canal de Kick · adrianozendejas32",
        ),
        h(
          "h1",
          {
            className:
              "font-display font-extrabold uppercase leading-[.9] tracking-[-0.04em] text-[clamp(3.2rem,11vw,8rem)]",
            "aria-label": "Adriano Zendejas",
          },
          h(
            "span",
            { className: "split-line", "aria-hidden": true },
            chars("ADRIANO"),
          ),
          h(
            "span",
            { className: "split-line outline-text", "aria-hidden": true },
            chars("ZENDEJAS"),
          ),
        ),
        h(
          "p",
          {
            className:
              "hero-fade text-lg text-soft max-w-xl mt-6 leading-relaxed",
          },
          "Actor y creador de contenido. Directos IRL, recorridos y momentos de la comunidad del ",
          h("strong", { className: "text-white" }, "Maestro Shifu"),
          ".",
        ),
        h(
          "div",
          { className: "hero-fade flex flex-wrap items-center gap-4 mt-8" },
          h(
            "a",
            {
              href: KICK,
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "btn-kick rounded-lg px-6 py-3.5 font-extrabold flex items-center gap-2",
            },
            Icon("play_circle", "!text-xl"),
            "Ir a Kick en vivo",
          ),
          h(
            "a",
            {
              href: "#irl",
              className:
                "rounded-lg px-6 py-3.5 font-bold border border-white/15 hover:border-kick/60 transition-colors",
            },
            "Explorar IRL",
          ),
          h(
            "div",
            { className: "pl-2" },
            h(
              "div",
              {
                ref: num,
                className:
                  "font-display text-3xl font-extrabold text-kick leading-none",
              },
              "898K*",
            ),
            h(
              "div",
              { className: "text-xs text-muted mt-1" },
              "Seguidores aprox. en Kick",
            ),
          ),
        ),
      ),
      h(
        "div",
        { className: "lg:col-span-5" },
        h(
          "div",
          {
            className:
              "hero-photo relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-l1 shadow-[0_20px_60px_rgba(0,0,0,.8)]",
          },
          h("img", {
            ref: img,
            src: IMG,
            alt: "Imagen de perfil de Adriano Zendejas en Kick",
            className: "w-full h-full object-cover",
            onError: (e) => (e.target.style.display = "none"),
          }),
          h("div", {
            className:
              "absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent",
          }),
          h(
            "div",
            { className: "absolute bottom-0 p-5" },
            h(
              "p",
              { className: "text-sm text-kick font-semibold" },
              "Enfoque del canal",
            ),
            h(
              "p",
              { className: "font-display text-2xl font-bold" },
              "IRL, viajes y momentos en vivo",
            ),
          ),
        ),
      ),
    ),
  );
}

function Marquee() {
  const items = [
    "IRL",
    "Viajes",
    "Comunidad",
    "Maestro Shifu",
    "Kick",
    "Recorridos",
    "En vivo",
  ];
  const row = items.concat(items, items, items);
  return h(
    "div",
    {
      className: "border-y border-white/5 bg-l1 py-4 overflow-hidden",
      "aria-hidden": true,
    },
    h(
      "div",
      { className: "marquee" },
      row.concat(row).map((t, i) =>
        h(
          "span",
          {
            key: i,
            className:
              "font-display text-2xl md:text-3xl font-extrabold uppercase px-6 whitespace-nowrap " +
              (i % 2 ? "outline-text" : "text-white/80"),
          },
          t,
          h("span", { className: "text-kick ml-10" }, "✦"),
        ),
      ),
    ),
  );
}

function Irl() {
  return h(
    "section",
    { id: "irl", className: "max-w-7xl mx-auto px-4 md:px-8 py-24" },
    h(
      "div",
      { className: "reveal grid md:grid-cols-2 gap-6 items-end mb-12" },
      h(
        "div",
        null,
        Eyebrow("Contenido en directo"),
        h(
          "h2",
          {
            className:
              "font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight",
          },
          "El universo IRL del Maestro Shifu",
        ),
      ),
      h(
        "p",
        { className: "text-soft max-w-md md:justify-self-end" },
        "Recorridos, viajes y experiencias en directo, según el contenido publicado en el canal de Kick.",
      ),
    ),
    h(
      "div",
      { className: "grid md:grid-cols-3 gap-5" },
      CARDS.map(([t, d, c], i) =>
        h(
          "article",
          {
            key: t,
            onMouseMove: spot,
            className:
              "stagger spot rounded-2xl border border-white/8 bg-l2/70 p-7 min-h-[260px] flex flex-col justify-between hover:border-white/20 transition-colors",
          },
          h(
            "div",
            {
              className:
                "font-display text-6xl font-extrabold leading-none " + c,
            },
            ["IRL", "VIA", "RET"][i],
          ),
          h(
            "div",
            null,
            h("h3", { className: "font-display text-xl font-bold mb-2" }, t),
            h("p", { className: "text-soft text-sm leading-relaxed" }, d),
          ),
        ),
      ),
    ),
  );
}

const VIDEOS = ["QOdqYWD2WxA", "USLuOWg0qzw", "9HisVgLPkFk", "v_CBPxIZ3G4"];

function Videos() {
  return h(
    "section",
    {
      id: "videos",
      className: "max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-white/5",
    },
    [
      h("div", { className: "reveal max-w-2xl mb-10" }, [
        // Asegúrate de que Eyebrow también use 'h' si es un componente de hyperscript
        typeof Eyebrow === "function" ? Eyebrow("Videos") : null,
        h(
          "h2",
          {
            className:
              "font-display text-3xl md:text-4xl font-extrabold tracking-tight",
          },
          "Mira el canal en acción",
        ),
      ]),
      h(
        "div",
        { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5" },
        // Mapeamos los videos devolviendo un array limpio de elementos
        VIDEOS.map((id, i) =>
          h(
            "div",
            {
              key: id,
              className:
                "stagger aspect-video rounded-xl overflow-hidden bg-l1 border border-kick/40 shadow-[0_0_20px_-6px_rgba(83,252,24,.35)] hover:border-kick hover:shadow-[0_0_28px_-4px_rgba(83,252,24,.55)] transition-all",
            },
            h("iframe", {
              src: `https://www.youtube.com/embed/${id}`,
              title: `Video ${i + 1} de Adriano Zendejas`,
              className: "w-full h-full border-0",
              loading: "lazy",
              allow:
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              allowFullScreen: true,
              referrerPolicy: "strict-origin-when-cross-origin",
            }),
          ),
        ),
      ),
    ],
  );
}

function Ideas() {
  const [ideas, setIdeas] = useState(SEED.map((s) => ({ ...s, voted: false })));
  const [cat, setCat] = useState(CATS[0]);
  const [ok, setOk] = useState(false);
  const vote = (id) =>
    setIdeas((l) =>
      l.map((i) =>
        i.id === id
          ? { ...i, voted: !i.voted, v: i.v + (i.voted ? -1 : 1) }
          : i,
      ),
    );
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    setIdeas((l) => [
      {
        id: Date.now(),
        t: f.get("body").slice(0, 60),
        d: cat,
        u: f.get("user"),
        v: 0,
        voted: false,
      },
      ...l,
    ]);
    e.target.reset();
    setOk(true);
    setTimeout(() => setOk(false), 5000);
  };
  const field =
    "w-full bg-base border border-l3 rounded-lg px-4 py-3 text-white placeholder-muted";
  return h(
    "section",
    {
      id: "ideas",
      className: "max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-white/5",
    },
    h(
      "div",
      { className: "reveal max-w-2xl mb-12" },
      Eyebrow("Participación de la comunidad"),
      h(
        "h2",
        {
          className:
            "font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3",
        },
        "Propón el próximo directo",
      ),
      h(
        "p",
        { className: "text-soft" },
        "Comparte ideas de recorridos, viajes o experiencias IRL. Las tarjetas son ilustrativas y no representan votaciones reales.",
      ),
    ),
    h(
      "div",
      { className: "grid lg:grid-cols-12 gap-8 items-start" },
      h(
        "form",
        {
          onSubmit: submit,
          className:
            "reveal lg:col-span-7 bg-l1 border border-white/10 rounded-2xl p-6 md:p-8 space-y-5",
        },
        h(
          "label",
          { className: "block text-sm font-semibold text-soft" },
          "Tu usuario en Kick",
          h("input", {
            name: "user",
            required: true,
            placeholder: "@shifufan_99",
            className: field + " mt-1.5",
          }),
        ),
        h(
          "fieldset",
          null,
          h(
            "legend",
            { className: "text-sm font-semibold text-soft mb-2" },
            "Categoría",
          ),
          h(
            "div",
            { className: "flex flex-wrap gap-2" },
            CATS.map((c) =>
              h(
                "button",
                {
                  key: c,
                  type: "button",
                  "aria-pressed": c === cat,
                  onClick: () => setCat(c),
                  className:
                    "px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all " +
                    (c === cat
                      ? "border-kick bg-kick/15 text-kick"
                      : "border-white/10 text-soft hover:border-white/30"),
                },
                c,
              ),
            ),
          ),
        ),
        h(
          "label",
          { className: "block text-sm font-semibold text-soft" },
          "Tu propuesta",
          h("textarea", {
            name: "body",
            required: true,
            rows: 4,
            placeholder:
              "Describe la dinámica o temática que quieres ver en el directo.",
            className: field + " mt-1.5",
          }),
        ),
        h(
          "button",
          {
            type: "submit",
            className:
              "btn-kick w-full rounded-lg py-3.5 font-extrabold flex items-center justify-center gap-2",
          },
          Icon("send", "!text-xl"),
          "Enviar propuesta",
        ),
        ok &&
          h(
            "p",
            {
              role: "status",
              className:
                "toast p-3 rounded-lg bg-kick/10 border border-kick/40 text-kick text-sm",
            },
            "Propuesta añadida a la lista. Solo es una demostración: no se envía a Adriano.",
          ),
      ),
      h(
        "div",
        { className: "lg:col-span-5 space-y-3" },
        ideas.map((i) =>
          h(
            "article",
            {
              key: i.id,
              className:
                "bg-l2/80 border border-white/8 rounded-xl p-4 flex gap-4 items-start",
            },
            h(
              "button",
              {
                onClick: () => vote(i.id),
                "aria-pressed": i.voted,
                "aria-label": "Votar " + i.t,
                className:
                  (i.voted
                    ? "pop bg-kick text-base border-kick"
                    : "bg-base text-kick border-white/10 hover:border-kick") +
                  " shrink-0 w-14 py-2 rounded-lg border flex flex-col items-center transition-colors",
              },
              Icon("thumb_up", "!text-base"),
              h("span", { className: "text-xs font-extrabold" }, i.v),
            ),
            h(
              "div",
              null,
              h(
                "h3",
                { className: "font-display font-bold leading-snug" },
                i.t,
              ),
              h("p", { className: "text-sm text-soft mt-1" }, i.d),
              h(
                "p",
                { className: "text-xs text-muted mt-2" },
                "Por " + i.u + " · sin fecha confirmada",
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

function Team() {
  return h(
    "section",
    {
      id: "comunidad",
      className: "max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-white/5",
    },
    h(
      "div",
      { className: "reveal max-w-2xl mb-12" },
      Eyebrow("Canal y comunidad"),
      h(
        "h2",
        {
          className:
            "font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3",
        },
        "Quién hace el directo",
      ),
      h(
        "p",
        { className: "text-soft" },
        "Información general del canal y la comunidad, sin atribuir cargos no confirmados a personas concretas.",
      ),
    ),
    h(
      "div",
      { className: "grid md:grid-cols-3 gap-5" },
      TEAM.map(([ini, n, d, c, main]) =>
        h(
          "article",
          {
            key: n,
            onMouseMove: spot,
            className:
              "stagger spot rounded-2xl p-7 bg-l1 border " +
              (main ? "border-kick/40" : "border-white/8"),
          },
          h(
            "div",
            {
              className:
                "w-16 h-16 rounded-xl bg-l2 border border-white/10 flex items-center justify-center font-display text-2xl font-extrabold mb-5 " +
                c,
            },
            ini,
          ),
          h("h3", { className: "font-display text-xl font-bold mb-2" }, n),
          h("p", { className: "text-soft text-sm leading-relaxed" }, d),
        ),
      ),
    ),
  );
}

function Contact() {
  const [ok, setOk] = useState(false);
  const field =
    "w-full bg-base border border-l3 rounded-lg px-4 py-3 text-white placeholder-muted";
  const lbl = "block text-sm font-semibold text-soft";
  return h(
    "section",
    {
      id: "contacto",
      className: "max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-white/5",
    },
    h(
      "div",
      { className: "grid lg:grid-cols-12 gap-10" },
      h(
        "div",
        { className: "reveal lg:col-span-5" },
        Eyebrow("Contacto"),
        h(
          "h2",
          {
            className:
              "font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4",
          },
          "Propuestas y colaboraciones",
        ),
        h(
          "p",
          { className: "text-soft mb-6" },
          "Los datos de contacto comercial no se publican aquí porque no están verificados. Para novedades y transmisiones, visita el canal de Kick.",
        ),
        h(
          "div",
          { className: "flex flex-wrap gap-2.5" },
          [
            ["Kick", KICK],
            ["Instagram", "https://instagram.com"],
            ["TikTok", "https://tiktok.com"],
            ["YouTube", "https://youtube.com"],
          ].map(([n, u]) =>
            h(
              "a",
              {
                key: n,
                href: u,
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "px-4 py-2 rounded-lg border text-sm font-bold transition-colors " +
                  (n === "Kick"
                    ? "border-kick/50 text-kick hover:bg-kick hover:text-base"
                    : "border-white/10 hover:border-white/40"),
              },
              n,
            ),
          ),
        ),
      ),
      h(
        "form",
        {
          className:
            "reveal lg:col-span-7 bg-l1 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4",
          onSubmit: (e) => {
            e.preventDefault();
            setOk(true);
            setTimeout(() => setOk(false), 5000);
          },
        },
        h(
          "p",
          { className: "text-sm text-soft" },
          "Este formulario es una maqueta visual y no envía mensajes reales.",
        ),
        h(
          "div",
          { className: "grid sm:grid-cols-2 gap-4" },
          h(
            "label",
            { className: lbl },
            "Empresa o marca",
            h("input", {
              required: true,
              className: field + " mt-1.5",
              placeholder: "Nombre de la marca",
            }),
          ),
          h(
            "label",
            { className: lbl },
            "Responsable",
            h("input", {
              required: true,
              className: field + " mt-1.5",
              placeholder: "Nombre completo",
            }),
          ),
        ),
        h(
          "div",
          { className: "grid sm:grid-cols-2 gap-4" },
          h(
            "label",
            { className: lbl },
            "Correo",
            h("input", {
              type: "email",
              required: true,
              className: field + " mt-1.5",
              placeholder: "nombre@marca.com",
            }),
          ),
          h(
            "label",
            { className: lbl },
            "Tipo de campaña",
            h(
              "select",
              { className: field + " mt-1.5" },
              [
                "Integración en stream",
                "Evento IRL",
                "Campaña en redes",
                "Entrevista",
              ].map((o) => h("option", { key: o }, o)),
            ),
          ),
        ),
        h(
          "label",
          { className: lbl },
          "Detalles de la propuesta",
          h("textarea", {
            required: true,
            rows: 3,
            className: field + " mt-1.5",
            placeholder: "Fechas tentativas, entregables y objetivos.",
          }),
        ),
        h(
          "button",
          {
            type: "submit",
            className: "btn-kick w-full rounded-lg py-3.5 font-extrabold",
          },
          "Enviar propuesta",
        ),
        ok &&
          h(
            "p",
            {
              role: "status",
              className:
                "toast p-3 rounded-lg bg-kick/10 border border-kick/40 text-kick text-sm",
            },
            "Demostración: el formulario aún no está conectado a un servicio de envío.",
          ),
      ),
    ),
  );
}

function Footer() {
  return h(
    "footer",
    { className: "border-t border-white/5" },
    h(
      "div",
      {
        className:
          "max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-5 justify-between",
      },
      h(
        "p",
        { className: "text-sm text-muted max-w-md" },
        "© 2026 · Página de fans no oficial. Estadísticas aproximadas; consulta Kick para datos actuales.",
      ),
      h(
        "div",
        { className: "flex flex-wrap gap-x-6 gap-y-2 text-sm" },
        h(
          "a",
          {
            href: KICK,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-kick font-semibold",
          },
          "Canal de Kick",
        ),
        h(
          "a",
          {
            href: "https://kickhex.net/channel/adrianozendejas32",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-muted hover:text-kick transition-colors",
          },
          "Historial de streams",
        ),
        h(
          "a",
          {
            href: "#contacto",
            className: "text-muted hover:text-kick transition-colors",
          },
          "Propuestas",
        ),
      ),
    ),
  );
}

/* ---------- app + scroll triggers ---------- */
function App() {
  useEffect(() => {
    gsap.set("#progress", { scaleX: 0 });
    gsap.to("#progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
    if (reduced) return;
    // Títulos de sección: entran una vez
    gsap.utils
      .toArray(".reveal")
      .forEach((el) =>
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        ),
      );
    // Tarjetas: entrada escalonada por grupo
    ScrollTrigger.batch(".stagger", {
      start: "top 88%",
      once: true,
      onEnter: (b) =>
        gsap.fromTo(
          b,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: "auto",
            clearProps: "transform,opacity",
          },
        ),
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return h(
    React.Fragment,
    null,
    h("div", { id: "progress" }),
    h("div", { id: "wipe" }),
    h(Banner),
    h(Header),
    h(
      "main",
      null,
      h(Hero),
      h(Marquee),
      h(Irl),
      h(Videos),
      h(Ideas),
      h(Team),
      h(Contact),
    ),
    h(Footer),
  );
}

// Íconos Material Symbols (se cargan como fuente)
const ms = document.createElement("link");
ms.rel = "stylesheet";
ms.href =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
document.head.appendChild(ms);

ReactDOM.createRoot(document.getElementById("root")).render(h(App));

// Content + copy for the rn-harness landing page, ported from
// `rn-harness Landing.dc.html` (Claude Design prototype).

export type Lang = "en" | "pt" | "es";
export type TabKey = "init" | "doctor" | "gate";
export type LineKind = "cmd" | "ok" | "warn" | "fail" | "dim" | "";

export interface LangText {
  badge: string;
  navLifecycle: string;
  navFeatures: string;
  navDemo: string;
  navStart: string;
  navContribute: string;
  ctaGithub: string;
  copy: string;
  copied: string;
  heroKicker: string;
  heroTitleA: string;
  heroTitleB: string;
  heroLead: string;
  heroWink: string;
  heroCta1: string;
  heroCta2: string;
  figCaption: string;
  figNote: string;
  stats: [string, string, string, string];
  lifeKicker: string;
  lifeTitle: string;
  lifeLead: string;
  phases: [string, string][];
  gates: [string, string, string][];
  featKicker: string;
  featTitle: string;
  features: [string, string, string[]][];
  termKicker: string;
  termTitle: string;
  termLead: string;
  tabHints: [string, string, string];
  startKicker: string;
  startTitle: string;
  startLead: string;
  startNote: string;
  steps: [string, string][];
  contribKicker: string;
  contribTitle: string;
  contribLead: string;
  contribBug: string;
  contribFeat: string;
  contribute: [string, string][];
}

export const SCRIPTS: Record<TabKey, [string, LineKind][]> = {
  init: [
    ["$ /new-rn-project", "cmd"], ["", ""],
    ["→ reading package.json …", "dim"], ["", ""],
    ["  State        Zustand         [detected]", "ok"],
    ["  Navigation   Expo Router     [detected]", "ok"],
    ["  Styling      NativeWind      [detected]", "ok"],
    ["  Backend      Supabase        [detected]", "ok"],
    ["  Storage      AsyncStorage    [WARNING]", "warn"],
    ["  Video        expo-av         [WARNING deprecated]", "warn"], ["", ""],
    ["? Confirm this stack? (Y/n) y", "dim"], ["", ""],
    ["  ✓ CLAUDE.md written (no placeholders)", "ok"],
    ["  ✓ docs/ — 6 phase templates", "ok"],
    ["  ✓ .githooks/ — profile: strict", "ok"],
    ["  ✓ .claude/rules/ — 9 of 15 rules copied", "ok"],
    ["  ✓ .claude/settings.json — denylist armed", "ok"], ["", ""],
    ["Next: /rn-doctor", "dim"],
  ],
  doctor: [
    ["$ bash ~/.rn-harness/scripts/doctor.sh", "cmd"], ["", ""],
    ["  [OK]   node v22.x >= 20", "ok"],
    ["  [OK]   pnpm, git, eas-cli present", "ok"],
    ["  [OK]   .gitignore covers .env*", "ok"],
    ["  [OK]   no hardcoded keys in .ts/.tsx", "ok"],
    ["  [OK]   Expo 56 · RN 0.76.x · Reanimated v3", "ok"],
    ["  [WARN] CLAUDE.md missing (not initialized)", "warn"],
    ["  [WARN] AsyncStorage in direct deps", "warn"],
    ['  [FAIL] tsconfig.json missing "strict": true', "fail"],
    ["         fix: add '\"strict\": true' to compilerOptions", "dim"],
    ["  [FAIL] lineHeight in StyleSheet (Android bug)", "fail"],
    ["         fix: remove lineHeight from src/ui/Card.tsx:42", "dim"], ["", ""],
    ["  OK: 20  WARN: 2  FAIL: 2  / 24 total", "cmd"],
    ["  exit 1", "dim"],
  ],
  gate: [
    ['$ git commit -m "feat: paywall"', "cmd"], ["", ""],
    ["pre-commit · profile: strict", "dim"],
    ["  ✓ tsc --noEmit", "ok"],
    ["  ✓ eslint (0 errors)", "ok"],
    ["  ✓ prettier --check", "ok"],
    ["  ✗ fta  src/screens/Paywall.tsx  score 68", "fail"], ["", ""],
    ["🚫 BLOCKED — fta score must be < 60.", "fail"],
    ["   Extract sub-components or a custom hook.", "dim"],
    ["   Never raise the score_cap.", "dim"], ["", ""],
    ["$ git commit --no-verify", "cmd"],
    ["🚫 BLOCKED by .claude/hooks/pre-tool-use.sh", "fail"],
    ["   nice try 🙂", "dim"],
  ],
};

export const LINE_COLOR: Record<LineKind, string> = {
  cmd: "#eef6ff",
  ok: "#b5d9fd",
  warn: "#e8c98a",
  fail: "#f0a08c",
  dim: "rgba(214,235,255,.55)",
  "": "transparent",
};

export const INSTALL =
  "curl -fsSL https://raw.githubusercontent.com/Jujubalandia/rn-harness/main/install.sh | sh";

export const CODE: Record<string, string> = {
  s1: "nvm install 20\nnpm i -g pnpm @anthropic-ai/claude-code",
  s2:
    "curl -fsSL https://raw.githubusercontent.com/\\\n  Jujubalandia/rn-harness/main/install.sh | sh\n\n# or clone it\ngit clone https://github.com/Jujubalandia/rn-harness \\\n  ~/.rn-harness && ~/.rn-harness/install.sh",
  s3: "~/.rn-harness/install.sh --profile strict",
  s4: "mkdir ~/projects/my-app && cd $_\nclaude\n> /new-rn-project",
  s5: "> /rn-doctor\n# OK: 24  WARN: 0  FAIL: 0  / 24",
};

export const DIMS: Record<Lang, string[]> = {
  en: ["State", "Navigation", "Styling", "Backend", "i18n", "Animation", "Monetization", "Testing"],
  pt: ["Estado", "Navegação", "Estilo", "Backend", "i18n", "Animação", "Monetização", "Testes"],
  es: ["Estado", "Navegación", "Estilos", "Backend", "i18n", "Animación", "Monetización", "Testing"],
};

export const DIM_VALS = [
  "Zustand", "Expo Router", "NativeWind", "Supabase", "i18next", "Reanimated v3", "RevenueCat", "RNTL · Detox",
];

export const PHASE_META = [
  { idx: "01", days: "D1–D3", doc: "01-spec.md", weight: "38%" },
  { idx: "02", days: "D1–D20", doc: "02-dev-plan.md", weight: "52%" },
  { idx: "03", days: "D4–D13", doc: "03-quality-gates.md", weight: "100%" },
  { idx: "04", days: "D13–D15", doc: "04-testing.md", weight: "78%" },
  { idx: "05", days: "D15–D17", doc: "05-store-launch.md", weight: "64%" },
  { idx: "06", days: "D17–D20", doc: "06-marketing.md", weight: "46%" },
];

export const STAT_N = ["20", "24", "15", "164"];

export const LANGS: [Lang, string, string][] = [
  ["en", "EN", "English"],
  ["pt", "PT", "Português (BR)"],
  ["es", "ES", "Español"],
];

export const L: Record<Lang, LangText> = {
  en: {
    badge: "v1 · open source",
    navLifecycle: "Lifecycle", navFeatures: "What it does", navDemo: "Demo", navStart: "Get started", navContribute: "Contribute",
    ctaGithub: "View on GitHub", copy: "Copy", copied: "Copied",
    heroKicker: "Built on Claude Code",
    heroTitleA: "Ship a React Native app to both stores in", heroTitleB: "20 days.",
    heroLead: "Not another boilerplate. rn-harness is the whole assembly line — spec, UX, dev, QA, store, marketing — wired into skills, quality gates and a wizard that reads your package.json and sets the rest up for you.",
    heroWink: "Yes, the boring parts too. Especially the boring parts.",
    heroCta1: "Get started in 5 steps", heroCta2: "See the lifecycle",
    figCaption: "Fig. 01 — What the wizard already knows",
    figNote: "13 dimensions auto-detected. It only asks you the five things it genuinely can’t guess.",
    stats: ["Days, spec to store submission", "Doctor checks, one command", "Knowledge rules, copied selectively", "Tests guarding the harness itself"],
    lifeKicker: "The whole lifecycle",
    lifeTitle: "Writing the code is one sixth of shipping an app.",
    lifeLead: 'Every phase gets a doc template, a gate, and a day range. Nothing gets to be the vague part you deal with "later".',
    phases: [
      ["Spec", "Problem, market, competitors, Cut/Keep list, viral loop. Decided before a line is written."],
      ["Plan", "Phases, milestones, definitions of done, and the blockers everyone hits anyway."],
      ["Dev", "One MVP feature a day, with selective knowledge rules loaded per file you touch."],
      ["QA", "Test tiers, a device matrix that assumes you don’t own a Mac, Maestro setup."],
      ["Store", "Assets, metadata, AAB/IPA upload, review checklist. The part nobody budgets for."],
      ["Launch", "A D-7 → D+14 calendar, per-platform post templates, and yes — a landing page."],
    ],
    gates: [
      ["Develop", "Rules that show up on cue", "Fifteen knowledge files load automatically by glob. Edit a Supabase call, get the RLS and SecureStore rules. Don’t use Supabase? You never see them."],
      ["Test", "24 checks, exit code 1", "Doctor reads only — env, structure, security, SDK versions, config, hooks, store config, forbidden patterns. FAIL blocks. WARN nags. Both come with a fix line."],
      ["Build", "Three gates, your pick", "minimal, standard or strict. Pre-commit runs typecheck → lint → format → fta; pre-push runs quality:full. Production needs preflight and a clean doctor."],
    ],
    featKicker: "What’s in the box",
    featTitle: "Six pieces that stop you re-deciding the same things.",
    features: [
      ["Init wizard", "Open a directory, type /new-rn-project. It detects your stack across 13 dimensions, shows the table, and only asks the five things it can’t infer.", ["13 dimensions", "new or existing"]],
      ["Doctor", "24 health checks on any project, human-readable or --json for CI. Every FAIL ships with the exact fix. It never edits your files uninvited.", ["bash", "powershell", "--json"]],
      ["Hook profiles", "minimal / standard / strict, chosen at install and swappable later. The wizard copies the matching hooks into every new project.", ["pre-commit", "pre-push"]],
      ["Selective rules", "Fifteen .md knowledge files — Expo Router, Supabase, Reanimated v3, i18next, RevenueCat, a11y. Copied only when your stack earns them.", ["glob-loaded", "15 files"]],
      ["Destructive-op guard", "A declarative denylist plus a runtime pre-tool hook. eas submit, db reset, force push, DROP TABLE, rm -rf / — blocked before they run.", ["settings.json", "pre-tool-use"]],
      ["Six phase docs", "Spec, dev plan, quality gates, testing, store launch, marketing. Pre-filled templates, not empty headings you’ll never come back to.", ["docs/", "D1 → D20"]],
    ],
    termKicker: "Live from the terminal", termTitle: "It talks back.",
    termLead: "Two commands do most of the work. One sets a project up; the other tells you, in 24 checks, exactly which part of it is about to embarrass you in front of App Review.",
    tabHints: ["init wizard · stack detection", "24 health checks", "quality gates, live"],
    startKicker: "Get started", startTitle: "Five steps. Roughly nine minutes.",
    startLead: "Prereqs: Node 20 LTS, pnpm, git, and Claude Code. The installer checks the rest.",
    startNote: "Public repo — clone it, fork it, open a PR.",
    steps: [
      ["Check your prereqs", "Node 20 LTS, pnpm, git and Claude Code. Windows works too — PowerShell 5.1+ with Git for Windows."],
      ["Install the harness", "One curl — no SSH key, no access request. Templates land in ~/.claude/templates/, skills in ~/.claude/skills/, scripts in ~/.rn-harness/."],
      ["Pick a gate profile", "strict is the default and the one you want. Drop to minimal for the first fast days, then come back up."],
      ["Run the wizard", "From your project directory. It detects, confirms, then writes CLAUDE.md, docs/, hooks and rules."],
      ["Ask the doctor", "Baseline the project on day one. Re-run it after every clone, every confusing hook failure, and before any production build."],
    ],
    contribKicker: "Open source", contribTitle: "It’s public now. Come break it.",
    contribLead: "No SSH key, no access request — clone it, run the 164-check suite, and send the rule or check you wish had been there. Template and rule changes land in projects created afterwards; existing ones are never touched.",
    contribBug: "Report a bug", contribFeat: "Request a check",
    contribute: [
      ["Clone it", "HTTPS, no key. git clone https://github.com/Jujubalandia/rn-harness ~/.rn-harness"],
      ["Prove it still works", "bash tests/test.sh — 164 checks. A PR lands with zero failures or it doesn’t land."],
      ["Try it for real", "Run /new-rn-project and /rn-doctor in a throwaway project before you open the PR."],
    ],
  },

  pt: {
    badge: "v1 · código aberto",
    navLifecycle: "Ciclo de vida", navFeatures: "O que faz", navDemo: "Demo", navStart: "Começar", navContribute: "Contribuir",
    ctaGithub: "Ver no GitHub", copy: "Copiar", copied: "Copiado",
    heroKicker: "Feito sobre o Claude Code",
    heroTitleA: "Publique um app React Native nas duas lojas em", heroTitleB: "20 dias.",
    heroLead: "Não é mais um boilerplate. O rn-harness é a linha de montagem inteira — spec, UX, dev, QA, loja, marketing — ligada a skills, quality gates e um assistente que lê o seu package.json e configura o resto por você.",
    heroWink: "Sim, as partes chatas também. Principalmente as partes chatas.",
    heroCta1: "Começar em 5 passos", heroCta2: "Ver o ciclo de vida",
    figCaption: "Fig. 01 — O que o assistente já sabe",
    figNote: "13 dimensões detectadas sozinhas. Ele só pergunta as cinco coisas que realmente não dá para adivinhar.",
    stats: ["Dias, da spec ao envio para a loja", "Checagens do doctor, um comando", "Regras de conhecimento, copiadas por stack", "Testes protegendo o próprio harness"],
    lifeKicker: "O ciclo de vida inteiro",
    lifeTitle: "Escrever o código é um sexto de publicar um app.",
    lifeLead: 'Cada fase ganha um template de doc, um gate e um intervalo de dias. Nada fica sendo "aquilo que a gente resolve depois".',
    phases: [
      ["Spec", "Problema, mercado, concorrentes, lista Cut/Keep, loop viral. Decidido antes da primeira linha."],
      ["Plano", "Fases, marcos, definições de pronto e os bloqueios que todo mundo enfrenta mesmo assim."],
      ["Dev", "Uma feature de MVP por dia, com regras de conhecimento carregadas conforme o arquivo aberto."],
      ["QA", "Camadas de teste, uma matriz de dispositivos que assume que você não tem Mac, setup do Maestro."],
      ["Loja", "Assets, metadados, upload de AAB/IPA, checklist de revisão. A parte que ninguém orça."],
      ["Lançamento", "Um calendário D-7 → D+14, templates de post por plataforma e, sim — uma landing page."],
    ],
    gates: [
      ["Desenvolver", "Regras que aparecem na hora certa", "Quinze arquivos de conhecimento carregam por glob. Editou uma chamada Supabase, chegam as regras de RLS e SecureStore. Não usa Supabase? Você nunca as vê."],
      ["Testar", "24 checagens, exit code 1", "O doctor só lê — ambiente, estrutura, segurança, versões de SDK, config, hooks, config de loja, padrões proibidos. FAIL bloqueia. WARN insiste. Ambos vêm com a linha de correção."],
      ["Buildar", "Três gates, você escolhe", "minimal, standard ou strict. O pre-commit roda typecheck → lint → format → fta; o pre-push roda quality:full. Produção exige preflight e doctor limpo."],
    ],
    featKicker: "O que vem na caixa",
    featTitle: "Seis peças para você parar de redecidir as mesmas coisas.",
    features: [
      ["Assistente de init", "Abra uma pasta e digite /new-rn-project. Ele detecta sua stack em 13 dimensões, mostra a tabela e só pergunta as cinco coisas que não dá para inferir.", ["13 dimensões", "novo ou existente"]],
      ["Doctor", "24 checagens de saúde em qualquer projeto, legível ou --json para CI. Todo FAIL vem com a correção exata. Ele nunca edita seus arquivos sem convite.", ["bash", "powershell", "--json"]],
      ["Perfis de hook", "minimal / standard / strict, escolhidos na instalação e trocáveis depois. O assistente copia os hooks certos para cada projeto novo.", ["pre-commit", "pre-push"]],
      ["Regras seletivas", "Quinze arquivos .md — Expo Router, Supabase, Reanimated v3, i18next, RevenueCat, a11y. Copiados só quando a sua stack pede.", ["por glob", "15 arquivos"]],
      ["Guarda de operações destrutivas", "Uma denylist declarativa mais um hook em tempo de execução. eas submit, db reset, force push, DROP TABLE, rm -rf / — bloqueados antes de rodar.", ["settings.json", "pre-tool-use"]],
      ["Seis docs de fase", "Spec, plano de dev, quality gates, testes, lançamento na loja, marketing. Templates preenchidos, não títulos vazios que você nunca revisita.", ["docs/", "D1 → D20"]],
    ],
    termKicker: "Ao vivo no terminal", termTitle: "Ele responde.",
    termLead: "Dois comandos fazem quase tudo. Um monta o projeto; o outro diz, em 24 checagens, exatamente que parte dele vai te envergonhar na revisão da App Store.",
    tabHints: ["assistente de init · detecção de stack", "24 checagens de saúde", "quality gates, ao vivo"],
    startKicker: "Começar", startTitle: "Cinco passos. Uns nove minutos.",
    startLead: "Pré-requisitos: Node 20 LTS, pnpm, git e Claude Code. O instalador confere o resto.",
    startNote: "Repositório público — clone, faça fork, abra um PR.",
    steps: [
      ["Confira os pré-requisitos", "Node 20 LTS, pnpm, git e Claude Code. Windows também funciona — PowerShell 5.1+ com Git for Windows."],
      ["Instale o harness", "Um curl — sem chave SSH, sem pedir acesso. Templates vão para ~/.claude/templates/, skills para ~/.claude/skills/, scripts para ~/.rn-harness/."],
      ["Escolha um perfil de gate", "strict é o padrão e é o que você quer. Caia para minimal nos primeiros dias rápidos e depois suba de novo."],
      ["Rode o assistente", "Na pasta do seu projeto. Ele detecta, confirma e então escreve CLAUDE.md, docs/, hooks e regras."],
      ["Chame o doctor", "Estabeleça a linha de base no dia um. Repita depois de cada clone, de cada hook que falha sem explicação e antes de qualquer build de produção."],
    ],
    contribKicker: "Código aberto", contribTitle: "Agora é público. Venha quebrar.",
    contribLead: "Sem chave SSH, sem pedir acesso — clone, rode a suíte de 164 checagens e mande a regra ou a checagem que você queria que existisse. Mudanças em templates e regras valem para projetos criados depois; os existentes nunca são tocados.",
    contribBug: "Reportar um bug", contribFeat: "Pedir uma checagem",
    contribute: [
      ["Clone", "HTTPS, sem chave. git clone https://github.com/Jujubalandia/rn-harness ~/.rn-harness"],
      ["Prove que ainda funciona", "bash tests/test.sh — 164 checagens. Um PR entra com zero falhas ou não entra."],
      ["Teste de verdade", "Rode /new-rn-project e /rn-doctor num projeto descartável antes de abrir o PR."],
    ],
  },

  es: {
    badge: "v1 · código abierto",
    navLifecycle: "Ciclo de vida", navFeatures: "Qué hace", navDemo: "Demo", navStart: "Empezar", navContribute: "Contribuir",
    ctaGithub: "Ver en GitHub", copy: "Copiar", copied: "Copiado",
    heroKicker: "Construido sobre Claude Code",
    heroTitleA: "Publica una app React Native en ambas tiendas en", heroTitleB: "20 días.",
    heroLead: "No es otro boilerplate. rn-harness es la línea de montaje completa — spec, UX, dev, QA, tienda, marketing — conectada a skills, quality gates y un asistente que lee tu package.json y configura el resto por ti.",
    heroWink: "Sí, también las partes aburridas. Sobre todo las aburridas.",
    heroCta1: "Empezar en 5 pasos", heroCta2: "Ver el ciclo de vida",
    figCaption: "Fig. 01 — Lo que el asistente ya sabe",
    figNote: "13 dimensiones detectadas solas. Solo te pregunta las cinco cosas que de verdad no puede adivinar.",
    stats: ["Días, de la spec al envío a la tienda", "Chequeos del doctor, un comando", "Reglas de conocimiento, copiadas según tu stack", "Tests que protegen al propio harness"],
    lifeKicker: "El ciclo de vida completo",
    lifeTitle: "Escribir el código es un sexto de publicar una app.",
    lifeLead: 'Cada fase tiene plantilla de doc, un gate y un rango de días. Nada queda como "eso lo vemos después".',
    phases: [
      ["Spec", "Problema, mercado, competencia, lista Cut/Keep, bucle viral. Decidido antes de la primera línea."],
      ["Plan", "Fases, hitos, definiciones de terminado y los bloqueos que igual le pasan a todo el mundo."],
      ["Dev", "Una función del MVP por día, con reglas de conocimiento cargadas según el archivo que tocas."],
      ["QA", "Niveles de test, una matriz de dispositivos que asume que no tienes Mac, configuración de Maestro."],
      ["Tienda", "Assets, metadatos, subida de AAB/IPA, checklist de revisión. La parte que nadie presupuesta."],
      ["Lanzamiento", "Un calendario D-7 → D+14, plantillas de post por plataforma y sí — una landing page."],
    ],
    gates: [
      ["Desarrollar", "Reglas que aparecen a tiempo", "Quince archivos de conocimiento se cargan por glob. Editas una llamada a Supabase y llegan las reglas de RLS y SecureStore. ¿No usas Supabase? Nunca las ves."],
      ["Probar", "24 chequeos, exit code 1", "El doctor solo lee — entorno, estructura, seguridad, versiones de SDK, config, hooks, config de tienda, patrones prohibidos. FAIL bloquea. WARN insiste. Ambos traen la línea de arreglo."],
      ["Compilar", "Tres gates, tú eliges", "minimal, standard o strict. El pre-commit corre typecheck → lint → format → fta; el pre-push corre quality:full. Producción pide preflight y un doctor limpio."],
    ],
    featKicker: "Qué trae la caja",
    featTitle: "Seis piezas para dejar de re-decidir lo mismo.",
    features: [
      ["Asistente de init", "Abre una carpeta y escribe /new-rn-project. Detecta tu stack en 13 dimensiones, muestra la tabla y solo pregunta las cinco cosas que no puede inferir.", ["13 dimensiones", "nuevo o existente"]],
      ["Doctor", "24 chequeos de salud en cualquier proyecto, legible o --json para CI. Cada FAIL trae el arreglo exacto. Nunca edita tus archivos sin permiso.", ["bash", "powershell", "--json"]],
      ["Perfiles de hook", "minimal / standard / strict, elegidos al instalar y cambiables después. El asistente copia los hooks correctos a cada proyecto nuevo.", ["pre-commit", "pre-push"]],
      ["Reglas selectivas", "Quince archivos .md — Expo Router, Supabase, Reanimated v3, i18next, RevenueCat, a11y. Se copian solo cuando tu stack los pide.", ["por glob", "15 archivos"]],
      ["Guardia de operaciones destructivas", "Una denylist declarativa más un hook en tiempo de ejecución. eas submit, db reset, force push, DROP TABLE, rm -rf / — bloqueados antes de ejecutarse.", ["settings.json", "pre-tool-use"]],
      ["Seis docs de fase", "Spec, plan de dev, quality gates, testing, lanzamiento en tienda, marketing. Plantillas rellenadas, no títulos vacíos que nunca vuelves a abrir.", ["docs/", "D1 → D20"]],
    ],
    termKicker: "En vivo desde la terminal", termTitle: "Te contesta.",
    termLead: "Dos comandos hacen casi todo. Uno monta el proyecto; el otro te dice, en 24 chequeos, qué parte exacta te va a avergonzar ante la revisión de la App Store.",
    tabHints: ["asistente de init · detección de stack", "24 chequeos de salud", "quality gates, en vivo"],
    startKicker: "Empezar", startTitle: "Cinco pasos. Unos nueve minutos.",
    startLead: "Requisitos: Node 20 LTS, pnpm, git y Claude Code. El instalador revisa el resto.",
    startNote: "Repositorio público — clónalo, haz fork, abre un PR.",
    steps: [
      ["Revisa los requisitos", "Node 20 LTS, pnpm, git y Claude Code. Windows también funciona — PowerShell 5.1+ con Git for Windows."],
      ["Instala el harness", "Un curl — sin clave SSH, sin pedir acceso. Las plantillas van a ~/.claude/templates/, las skills a ~/.claude/skills/, los scripts a ~/.rn-harness/."],
      ["Elige un perfil de gate", "strict es el predeterminado y el que quieres. Baja a minimal en los primeros días rápidos y luego vuelve a subir."],
      ["Corre el asistente", "Desde la carpeta de tu proyecto. Detecta, confirma y escribe CLAUDE.md, docs/, hooks y reglas."],
      ["Llama al doctor", "Fija la línea base el día uno. Repítelo tras cada clon, tras cada hook que falla sin motivo claro y antes de cualquier build de producción."],
    ],
    contribKicker: "Código abierto", contribTitle: "Ya es público. Ven a romperlo.",
    contribLead: "Sin clave SSH, sin pedir acceso — clónalo, corre la suite de 164 chequeos y manda la regla o el chequeo que te hubiera gustado tener. Los cambios en plantillas y reglas aplican a proyectos creados después; los existentes nunca se tocan.",
    contribBug: "Reportar un bug", contribFeat: "Pedir un chequeo",
    contribute: [
      ["Clónalo", "HTTPS, sin clave. git clone https://github.com/Jujubalandia/rn-harness ~/.rn-harness"],
      ["Demuestra que sigue vivo", "bash tests/test.sh — 164 chequeos. Un PR entra con cero fallos o no entra."],
      ["Pruébalo de verdad", "Corre /new-rn-project y /rn-doctor en un proyecto desechable antes de abrir el PR."],
    ],
  },
};

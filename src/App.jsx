import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lurgjmlvgdiuztpaszkp.supabase.co";
const supabaseAnonKey = "sb_publishable_FQKboZwTnmdhH6Cy6uftsw_Z0KKekv7";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const COLORES = {
  fondo: "#0A0A0F",
  tarjeta: "#12121A",
  borde: "#1E1E2E",
  morado: "#A78BFA",
  verde: "#00FF66",
  rojo: "#FF6B6B",
  gris: "#888",
  blanco: "#FFF",
  amarillo: "#FFD700",
  naranja: "#FF8C00",
};

const s = {
  app: { minHeight: "100vh", backgroundColor: COLORES.fondo, color: COLORES.blanco, fontFamily: "monospace", padding: 0 },
  header: { backgroundColor: COLORES.tarjeta, borderBottom: `1px solid ${COLORES.borde}`, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", color: COLORES.blanco },
  subtitulo: { color: COLORES.morado, fontSize: 12, marginTop: 2 },
  body: { padding: 24 },
  login: { maxWidth: 400, margin: "100px auto", backgroundColor: COLORES.tarjeta, borderRadius: 16, padding: 32, border: `1px solid ${COLORES.borde}` },
  loginTitulo: { fontSize: 20, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  loginSub: { color: COLORES.gris, fontSize: 13, marginBottom: 24, textAlign: "center" },
  input: { width: "100%", backgroundColor: COLORES.fondo, border: `1px solid ${COLORES.borde}`, borderRadius: 8, padding: "10px 12px", color: COLORES.blanco, fontSize: 14, marginBottom: 12, boxSizing: "border-box" },
  btn: { width: "100%", backgroundColor: COLORES.morado, border: "none", borderRadius: 8, padding: "12px", color: COLORES.blanco, fontWeight: "bold", fontSize: 14, cursor: "pointer" },
  btnSm: { backgroundColor: COLORES.morado, border: "none", borderRadius: 6, padding: "6px 12px", color: COLORES.blanco, fontWeight: "bold", fontSize: 12, cursor: "pointer" },
  btnRojo: { backgroundColor: COLORES.rojo, border: "none", borderRadius: 6, padding: "6px 12px", color: COLORES.blanco, fontWeight: "bold", fontSize: 12, cursor: "pointer" },
  btnGris: { backgroundColor: "#222", border: `1px solid ${COLORES.borde}`, borderRadius: 6, padding: "6px 12px", color: COLORES.blanco, fontWeight: "bold", fontSize: 12, cursor: "pointer" },
  error: { color: COLORES.rojo, fontSize: 13, marginTop: 8, textAlign: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 },
  kpi: { backgroundColor: COLORES.tarjeta, borderRadius: 12, padding: 20, border: `1px solid ${COLORES.borde}` },
  kpiValor: { fontSize: 32, fontWeight: "bold", color: COLORES.morado },
  kpiLabel: { color: COLORES.gris, fontSize: 12, marginTop: 4 },
  seccion: { backgroundColor: COLORES.tarjeta, borderRadius: 12, padding: 20, border: `1px solid ${COLORES.borde}`, marginBottom: 24 },
  seccionTitulo: { fontSize: 16, fontWeight: "bold", marginBottom: 16, color: COLORES.blanco },
  tabla: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: { textAlign: "left", color: COLORES.gris, fontWeight: "bold", paddingBottom: 8, borderBottom: `1px solid ${COLORES.borde}`, paddingRight: 16 },
  td: { paddingVertical: 8, paddingRight: 16, borderBottom: `1px solid ${COLORES.borde}22`, color: COLORES.blanco, paddingTop: 8, paddingBottom: 8 },
  badge: (color) => ({ backgroundColor: color + "22", border: `1px solid ${color}`, borderRadius: 6, padding: "2px 8px", color: color, fontSize: 11, fontWeight: "bold", display: "inline-block" }),
  barra: { height: 6, borderRadius: 3, backgroundColor: "#1E1E2E", overflow: "hidden", marginTop: 4 },
  barraFill: (pct, color) => ({ height: "100%", width: `${pct}%`, backgroundColor: color, borderRadius: 3 }),
  tabs: { display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" },
  tab: (activa) => ({ padding: "8px 16px", borderRadius: 8, border: `1px solid ${activa ? COLORES.morado : COLORES.borde}`, backgroundColor: activa ? COLORES.morado : COLORES.tarjeta, color: COLORES.blanco, fontWeight: "bold", fontSize: 13, cursor: "pointer" }),
  alerta: { backgroundColor: "#FF6B6B22", border: `1px solid ${COLORES.rojo}`, borderRadius: 8, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" },
  alertaTexto: { color: COLORES.blanco, fontSize: 13 },
};

export default function MyVibeAdmin() {
  const [sesion, setSesion] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [tab, setTab] = useState("dashboard");

  // Datos
  const [kpis, setKpis] = useState({ usuarios: 0, vibesHoy: 0, clanes: 0, capsulas: 0 });
  const [trending, setTrending] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [vibes, setVibes] = useState([]);
  const [metricas, setMetricas] = useState({ totalUsuarios: 0, dau7: 0, mau30: 0, totalReacciones: 0, amistades: 0, mensajes: 0, duelos: 0 });
  const [actividadDiaria, setActividadDiaria] = useState([]);
  const [opiniones, setOpiniones] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [filtroDenuncias, setFiltroDenuncias] = useState("pendiente");
  const [denunciasPendientes, setDenunciasPendientes] = useState(0);
  const [errorDenuncias, setErrorDenuncias] = useState("");

  // === LOGIN ===
  const login = async () => {
    setLoginError("");
    setCargando(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setLoginError("Credenciales incorrectas"); return; }
      const { data: perfil } = await supabase.from("perfiles").select("es_admin").eq("user_id", data.user.id).maybeSingle();
      if (!perfil?.es_admin) { setLoginError("No tienes permisos de administrador"); await supabase.auth.signOut(); return; }
      setSesion(data.user);
    } catch (e) {
      setLoginError("Error de conexión");
    } finally {
      setCargando(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSesion(null);
  };

  // === CARGAR DATOS ===
  useEffect(() => {
    if (!sesion) return;
    cargarTodo();
  }, [sesion]);

  const cargarTodo = async () => {
    await Promise.all([cargarKpis(), cargarTrending(), cargarSnapshots(), cargarUsuarios(), cargarVibes(), cargarMetricas(), cargarOpiniones(), cargarDenuncias()]);
  };

  const cargarKpis = async () => {
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const [{ count: usuarios }, { count: vibesHoy }, { count: clanes }, { count: capsulas }] = await Promise.all([
      supabase.from("perfiles").select("*", { count: "exact", head: true }),
      supabase.from("vibes_diarios").select("*", { count: "exact", head: true }).gte("creado_en", hoy.toISOString()),
      supabase.from("clanes").select("*", { count: "exact", head: true }),
      supabase.from("capsulas").select("*", { count: "exact", head: true }).gt("caduca_en", new Date().toISOString()),
    ]);
    setKpis({ usuarios: usuarios || 0, vibesHoy: vibesHoy || 0, clanes: clanes || 0, capsulas: capsulas || 0 });
  };

  const cargarTrending = async () => {
    const { data } = await supabase.from("tendencias_myvibe").select("*");
    if (!data) return;
    const agregado = Object.values(data.reduce((acc, t) => {
      if (!acc[t.cancion]) { acc[t.cancion] = { ...t, zona: null }; }
      else {
        acc[t.cancion].total_usuarios += t.total_usuarios;
        acc[t.cancion].usuarios_ultima_6h += t.usuarios_ultima_6h || 0;
        acc[t.cancion].score_trending = parseFloat(((acc[t.cancion].score_trending || 0) + (t.score_trending || 0)).toFixed(2));
        acc[t.cancion].velocidad_crecimiento = Math.max(acc[t.cancion].velocidad_crecimiento || 0, t.velocidad_crecimiento || 0);
      }
      return acc;
    }, {})).sort((a, b) => (b.score_trending || 0) - (a.score_trending || 0));
    setTrending(agregado);
    const nuevasAlertas = agregado.filter(t => (t.score_trending || 0) >= 3 || (t.usuarios_ultima_6h || 0) >= 5).map(t => ({
      cancion: t.cancion,
      mensaje: `🚀 "${t.cancion}" tiene score ${t.score_trending} — posible explosión inminente`,
      nivel: (t.score_trending || 0) >= 5 ? "critico" : "alto",
    }));
    setAlertas(nuevasAlertas);
  };

  const cargarSnapshots = async () => {
    const { data } = await supabase.from("snapshots_trending").select("*").order("fecha", { ascending: false }).order("score_trending", { ascending: false }).limit(50);
    setSnapshots(data || []);
  };

  const cargarUsuarios = async () => {
    const { data } = await supabase.from("perfiles").select("*").order("puntos", { ascending: false }).limit(50);
    setUsuarios(data || []);
  };

  const cargarVibes = async () => {
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const { data } = await supabase.from("vibes_diarios").select("*").gte("creado_en", hoy.toISOString()).order("creado_en", { ascending: false }).limit(50);
    setVibes(data || []);
  };

  const cargarMetricas = async () => {
    const hace7 = new Date(Date.now() - 7 * 86400000).toISOString();
    const hace30 = new Date(Date.now() - 30 * 86400000).toISOString();
    const [
      { count: totalUsuarios },
      { count: dau7 },
      { count: mau30 },
      { count: totalReacciones },
      { count: amistades },
      { count: mensajes },
      { count: duelos },
    ] = await Promise.all([
      supabase.from("perfiles").select("*", { count: "exact", head: true }),
      supabase.from("vibes_diarios").select("user_id", { count: "exact", head: true }).gte("creado_en", hace7),
      supabase.from("vibes_diarios").select("user_id", { count: "exact", head: true }).gte("creado_en", hace30),
      supabase.from("reacciones").select("*", { count: "exact", head: true }),
      supabase.from("solicitudes").select("*", { count: "exact", head: true }).eq("estado", "aceptada"),
      supabase.from("mensajes_chat").select("*", { count: "exact", head: true }),
      supabase.from("duelos").select("*", { count: "exact", head: true }),
    ]);
    setMetricas({ totalUsuarios: totalUsuarios||0, dau7: dau7||0, mau30: mau30||0, totalReacciones: totalReacciones||0, amistades: amistades||0, mensajes: mensajes||0, duelos: duelos||0 });
    const { data: actividad } = await supabase.from("vibes_diarios").select("creado_en").gte("creado_en", hace30).order("creado_en", { ascending: true });
    const porDia = {};
    (actividad || []).forEach(v => {
      const dia = v.creado_en.split("T")[0];
      porDia[dia] = (porDia[dia] || 0) + 1;
    });
    setActividadDiaria(Object.entries(porDia).map(([dia, count]) => ({ dia, count })));
  };

  const cargarOpiniones = async () => {
    const { data } = await supabase.from("opiniones_web").select("id, nick, valoracion, texto, creado_en").order("creado_en", { ascending: false }).limit(100);
    setOpiniones(data || []);
  };

  // === DENUNCIAS — las Normas de la comunidad prometen revisarlas en 24 h ===
  const cargarDenuncias = async (estado = filtroDenuncias) => {
    setErrorDenuncias("");
    const [{ data, error }, { data: pendientes }] = await Promise.all([
      supabase.rpc("admin_reportes", { p_estado: estado === "todas" ? null : estado }),
      supabase.rpc("admin_reportes", { p_estado: "pendiente" }),
    ]);
    if (error) { setErrorDenuncias(`No se pudieron cargar las denuncias: ${error.message}`); return; }
    setDenuncias(data || []);
    setDenunciasPendientes((pendientes || []).length);
  };

  const resolverDenuncia = async (d, accion) => {
    const avisos = {
      borrar_contenido: "¿Borrar el contenido denunciado? No se puede deshacer.",
      suspender: `¿Borrar el contenido y SUSPENDER la cuenta de ${d.reportado_nick || "este usuario"}? No podrá volver a entrar con esa cuenta.`,
    };
    if (avisos[accion] && !window.confirm(avisos[accion])) return;
    const { error } = await supabase.rpc("admin_resolver_reporte", { p_reporte_id: d.id, p_accion: accion });
    if (error) { window.alert(`No se pudo completar: ${error.message}`); return; }
    cargarDenuncias();
  };

  // === EXPORTAR CSV ===
  const exportarCSV = (datos, nombre) => {
    if (!datos.length) return;
    const keys = Object.keys(datos[0]);
    const csv = [keys.join(","), ...datos.map(r => keys.map(k => `"${r[k] ?? ""}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${nombre}.csv`; a.click();
  };

  // === LOGIN SCREEN ===
  if (!sesion) return (
    <div style={s.app}>
      <div style={s.login}>
        <div style={s.loginTitulo}>🎵 MyVibe Admin</div>
        <div style={s.loginSub}>Panel de administración</div>
        <input style={s.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
        <input style={s.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
        <button style={s.btn} onClick={login} disabled={cargando}>{cargando ? "Entrando..." : "Entrar"}</button>
        {loginError && <div style={s.error}>{loginError}</div>}
      </div>
    </div>
  );

  // === ADMIN PANEL ===
  const maxScore = trending[0]?.score_trending || 1;

  return (
    <div style={s.app}>
      {/* HEADER */}
      <div style={s.header}>
        <div>
          <div style={s.titulo}>🎵 MyVibe <span style={{ color: COLORES.morado }}>Admin</span></div>
          <div style={s.subtitulo}>Panel de control — {new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button style={s.btnSm} onClick={cargarTodo}>🔄 Actualizar</button>
          <button style={s.btnGris} onClick={logout}>Salir</button>
        </div>
      </div>

      <div style={s.body}>
        {/* TABS */}
        <div style={s.tabs}>
          {[
            { key: "dashboard", label: "📊 Dashboard" },
            { key: "trending", label: "🔥 Trending" },
            { key: "historial", label: "📈 Historial" },
            { key: "usuarios", label: "👥 Usuarios" },
            { key: "vibes", label: "🎵 Vibes Hoy" },
            { key: "metricas", label: "📊 Métricas" },
            { key: "opiniones", label: "💬 Opiniones" },
            { key: "denuncias", label: `🚩 Denuncias${denunciasPendientes ? ` (${denunciasPendientes})` : ""}` },
          ].map(t => (
            <button key={t.key} style={s.tab(tab === t.key)} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {/* ══ DASHBOARD ══ */}
        {tab === "dashboard" && (<>
          <div style={s.grid}>
            {[
              { label: "Usuarios registrados", valor: kpis.usuarios, icono: "👥" },
              { label: "Vibes publicados hoy", valor: kpis.vibesHoy, icono: "🎵" },
              { label: "Clanes activos", valor: kpis.clanes, icono: "🛡️" },
              { label: "Cápsulas activas", valor: kpis.capsulas, icono: "📍" },
            ].map(k => (
              <div key={k.label} style={s.kpi}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{k.icono}</div>
                <div style={s.kpiValor}>{k.valor}</div>
                <div style={s.kpiLabel}>{k.label}</div>
              </div>
            ))}
          </div>
          {alertas.length > 0 && (
            <div style={s.seccion}>
              <div style={s.seccionTitulo}>⚠️ Alertas automáticas</div>
              {alertas.map((a, i) => (
                <div key={i} style={s.alerta}>
                  <span style={s.alertaTexto}>{a.mensaje}</span>
                  <span style={s.badge(a.nivel === "critico" ? COLORES.rojo : COLORES.amarillo)}>
                    {a.nivel === "critico" ? "🔴 Crítico" : "🟡 Alto"}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div style={s.seccion}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={s.seccionTitulo}>🔥 Top Trending ahora</div>
              <button style={s.btnSm} onClick={() => exportarCSV(trending, "trending_myvibe")}>⬇️ Exportar CSV</button>
            </div>
            {trending.slice(0, 5).map((t, i) => (
              <div key={t.cancion} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: COLORES.blanco, fontWeight: "bold", fontSize: 14 }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`} {t.cancion}
                  </span>
                  <span style={s.badge((t.score_trending || 0) >= 3 ? COLORES.rojo : (t.score_trending || 0) >= 1.5 ? COLORES.amarillo : COLORES.gris)}>
                    Score: {t.score_trending}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                  <span style={{ color: COLORES.morado, fontSize: 12 }}>👥 {t.total_usuarios} usuarios</span>
                  <span style={{ color: COLORES.verde, fontSize: 12 }}>+{t.usuarios_ultima_6h} en 6h</span>
                  <span style={{ color: COLORES.amarillo, fontSize: 12 }}>×{t.velocidad_crecimiento} vel.</span>
                </div>
                <div style={s.barra}>
                  <div style={s.barraFill(Math.min(((t.score_trending || 0) / maxScore) * 100, 100), (t.score_trending || 0) >= 3 ? COLORES.rojo : COLORES.morado)} />
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ══ TRENDING COMPLETO ══ */}
        {tab === "trending" && (
          <div style={s.seccion}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={s.seccionTitulo}>🔥 Ranking completo</div>
              <button style={s.btnSm} onClick={() => exportarCSV(trending, "trending_completo")}>⬇️ Exportar CSV</button>
            </div>
            <table style={s.tabla}>
              <thead>
                <tr>
                  <th style={s.th}>#</th>
                  <th style={s.th}>Canción</th>
                  <th style={s.th}>Total usuarios</th>
                  <th style={s.th}>Últimas 6h</th>
                  <th style={s.th}>Velocidad</th>
                  <th style={s.th}>Score</th>
                  <th style={s.th}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {trending.map((t, i) => (
                  <tr key={t.cancion}>
                    <td style={s.td}>{i + 1}</td>
                    <td style={{ ...s.td, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.cancion}</td>
                    <td style={s.td}>{t.total_usuarios}</td>
                    <td style={{ ...s.td, color: COLORES.verde }}>+{t.usuarios_ultima_6h}</td>
                    <td style={{ ...s.td, color: COLORES.amarillo }}>×{t.velocidad_crecimiento}</td>
                    <td style={{ ...s.td, color: COLORES.morado, fontWeight: "bold" }}>{t.score_trending}</td>
                    <td style={s.td}>
                      <span style={s.badge((t.score_trending || 0) >= 3 ? COLORES.rojo : (t.score_trending || 0) >= 1.5 ? COLORES.amarillo : COLORES.gris)}>
                        {(t.score_trending || 0) >= 3 ? "🚀 Explosiva" : (t.score_trending || 0) >= 1.5 ? "📈 Subiendo" : "🌱 Nueva"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ══ HISTORIAL ══ */}
        {tab === "historial" && (
          <div style={s.seccion}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={s.seccionTitulo}>📈 Historial de predicciones</div>
              <button style={s.btnSm} onClick={() => exportarCSV(snapshots, "historial_trending")}>⬇️ Exportar CSV</button>
            </div>
            <table style={s.tabla}>
              <thead>
                <tr>
                  <th style={s.th}>Fecha</th>
                  <th style={s.th}>Canción</th>
                  <th style={s.th}>Total usuarios</th>
                  <th style={s.th}>Últimas 6h</th>
                  <th style={s.th}>Velocidad</th>
                  <th style={s.th}>Score</th>
                </tr>
              </thead>
              <tbody>
                {snapshots.map(snap => (
                  <tr key={snap.id}>
                    <td style={{ ...s.td, color: COLORES.gris, fontSize: 12 }}>{snap.fecha}</td>
                    <td style={{ ...s.td, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{snap.cancion}</td>
                    <td style={s.td}>{snap.total_usuarios}</td>
                    <td style={{ ...s.td, color: COLORES.verde }}>+{snap.usuarios_ultima_6h}</td>
                    <td style={{ ...s.td, color: COLORES.amarillo }}>×{snap.velocidad_crecimiento}</td>
                    <td style={{ ...s.td, color: COLORES.morado, fontWeight: "bold" }}>{snap.score_trending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ══ USUARIOS ══ */}
        {tab === "usuarios" && (
          <div style={s.seccion}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={s.seccionTitulo}>👥 Usuarios registrados</div>
              <button style={s.btnSm} onClick={() => exportarCSV(usuarios, "usuarios_myvibe")}>⬇️ Exportar CSV</button>
            </div>
            <table style={s.tabla}>
              <thead>
                <tr>
                  <th style={s.th}>Nick</th>
                  <th style={s.th}>Puntos</th>
                  <th style={s.th}>Admin</th>
                  <th style={s.th}>User ID</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.user_id}>
                    <td style={s.td}>{u.nick || "—"}</td>
                    <td style={{ ...s.td, color: COLORES.amarillo }}>{u.puntos || 0}</td>
                    <td style={s.td}>{u.es_admin ? <span style={s.badge(COLORES.morado)}>Admin</span> : "—"}</td>
                    <td style={{ ...s.td, color: COLORES.gris, fontSize: 11 }}>{u.user_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ══ VIBES HOY ══ */}
        {tab === "vibes" && (
          <div style={s.seccion}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={s.seccionTitulo}>🎵 Vibes publicados hoy</div>
              <button style={s.btnSm} onClick={() => exportarCSV(vibes, "vibes_hoy")}>⬇️ Exportar CSV</button>
            </div>
            <table style={s.tabla}>
              <thead>
                <tr>
                  <th style={s.th}>Hora</th>
                  <th style={s.th}>Canción</th>
                  <th style={s.th}>Estado</th>
                  <th style={s.th}>User ID</th>
                </tr>
              </thead>
              <tbody>
                {vibes.map(v => (
                  <tr key={v.id}>
                    <td style={{ ...s.td, color: COLORES.gris, fontSize: 12 }}>{new Date(v.creado_en).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</td>
                    <td style={{ ...s.td, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.cancion}</td>
                    <td style={{ ...s.td, color: COLORES.gris, fontSize: 12 }}>{v.estado || "—"}</td>
                    <td style={{ ...s.td, color: COLORES.gris, fontSize: 11 }}>{v.user_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ══ MÉTRICAS ══ */}
        {tab === "metricas" && (<>
          <div style={s.grid}>
            {[
              { label: "Total usuarios registrados", valor: metricas.totalUsuarios, icono: "👥", color: COLORES.morado },
              { label: "Usuarios activos 7 días", valor: metricas.dau7, icono: "📅", color: COLORES.verde },
              { label: "Usuarios activos 30 días (MAU)", valor: metricas.mau30, icono: "📆", color: COLORES.amarillo },
              { label: "Ratio actividad DAU/MAU", valor: metricas.mau30 > 0 ? Math.round((metricas.dau7 / metricas.mau30) * 100) + "%" : "—", icono: "📈", color: COLORES.rojo },
              { label: "Total reacciones", valor: metricas.totalReacciones, icono: "🔥", color: COLORES.naranja },
              { label: "Amistades formadas", valor: metricas.amistades, icono: "🤝", color: COLORES.verde },
              { label: "Mensajes enviados", valor: metricas.mensajes, icono: "💬", color: COLORES.morado },
              { label: "Duelos lanzados", valor: metricas.duelos, icono: "⚔️", color: COLORES.amarillo },
            ].map(k => (
              <div key={k.label} style={s.kpi}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{k.icono}</div>
                <div style={{ ...s.kpiValor, color: k.color }}>{k.valor}</div>
                <div style={s.kpiLabel}>{k.label}</div>
              </div>
            ))}
          </div>

          <div style={s.seccion}>
            <div style={s.seccionTitulo}>📅 Actividad diaria — últimos 30 días</div>
            {actividadDiaria.length === 0 && <div style={{ color: COLORES.gris, fontSize: 13 }}>Sin datos</div>}
            {actividadDiaria.map(({ dia, count }) => {
              const maxCount = Math.max(...actividadDiaria.map(d => d.count), 1);
              const pct = Math.round((count / maxCount) * 100);
              return (
                <div key={dia} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: COLORES.gris, fontSize: 12 }}>{dia}</span>
                    <span style={{ color: COLORES.morado, fontSize: 12, fontWeight: "bold" }}>{count} vibes</span>
                  </div>
                  <div style={s.barra}>
                    <div style={s.barraFill(pct, COLORES.morado)} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={s.seccion}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={s.seccionTitulo}>📋 Resumen para inversores</div>
              <button style={s.btnSm} onClick={() => exportarCSV([{
                total_usuarios: metricas.totalUsuarios,
                usuarios_activos_7d: metricas.dau7,
                usuarios_activos_30d_MAU: metricas.mau30,
                ratio_actividad_pct: metricas.mau30 > 0 ? Math.round((metricas.dau7 / metricas.mau30) * 100) : 0,
                total_reacciones: metricas.totalReacciones,
                amistades: metricas.amistades,
                mensajes: metricas.mensajes,
                duelos: metricas.duelos,
                fecha: new Date().toISOString().split("T")[0],
              }], "metricas_inversores")}>⬇️ Exportar CSV</button>
            </div>
            {[
              { label: "Usuarios totales registrados", valor: metricas.totalUsuarios },
              { label: "Usuarios activos últimos 7 días", valor: metricas.dau7 },
              { label: "Usuarios activos últimos 30 días (MAU)", valor: metricas.mau30 },
              { label: "Tasa de actividad DAU/MAU", valor: metricas.mau30 > 0 ? Math.round((metricas.dau7 / metricas.mau30) * 100) + "%" : "—" },
              { label: "Total interacciones (reacciones)", valor: metricas.totalReacciones },
              { label: "Conexiones sociales (amistades)", valor: metricas.amistades },
              { label: "Mensajes intercambiados", valor: metricas.mensajes },
              { label: "Duelos de Vibe lanzados", valor: metricas.duelos },
            ].map(({ label, valor }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORES.borde}` }}>
                <span style={{ color: COLORES.gris, fontSize: 13 }}>{label}</span>
                <span style={{ color: COLORES.blanco, fontWeight: "bold", fontSize: 13 }}>{valor}</span>
              </div>
            ))}
          </div>
        </>)}

        {/* ══ OPINIONES ══ */}
        {tab === "opiniones" && (
          <div style={s.seccion}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={s.seccionTitulo}>💬 Opiniones de usuarios</div>
              <button style={s.btnSm} onClick={() => exportarCSV(opiniones, "opiniones_web")}>⬇️ Exportar CSV</button>
            </div>
            <table style={s.tabla}>
              <thead>
                <tr>
                  <th style={s.th}>Fecha</th>
                  <th style={s.th}>Nick</th>
                  <th style={s.th}>Valoración</th>
                  <th style={s.th}>Opinión</th>
                </tr>
              </thead>
              <tbody>
                {opiniones.map(o => (
                  <tr key={o.id}>
                    <td style={{ ...s.td, color: COLORES.gris, fontSize: 12 }}>{new Date(o.creado_en).toLocaleString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                    <td style={s.td}>{o.nick || "—"}</td>
                    <td style={s.td}>
                      <span style={s.badge((o.valoracion || 0) >= 4 ? COLORES.verde : (o.valoracion || 0) >= 3 ? COLORES.amarillo : COLORES.rojo)}>
                        {"★".repeat(o.valoracion || 0)}{"☆".repeat(Math.max(5 - (o.valoracion || 0), 0))}
                      </span>
                    </td>
                    <td style={{ ...s.td, maxWidth: 400, whiteSpace: "pre-wrap" }}>{o.texto}</td>
                  </tr>
                ))}
                {opiniones.length === 0 && (
                  <tr><td style={{ ...s.td, color: COLORES.gris }} colSpan={4}>Sin opiniones todavía</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ══ DENUNCIAS ══ */}
        {tab === "denuncias" && (
          <div style={s.seccion}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div style={{ ...s.seccionTitulo, marginBottom: 0 }}>🚩 Denuncias</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[
                  { key: "pendiente", label: "Pendientes" },
                  { key: "todas", label: "Todas" },
                  { key: "descartada", label: "Descartadas" },
                  { key: "contenido_borrado", label: "Contenido borrado" },
                  { key: "usuario_suspendido", label: "Suspendidos" },
                ].map(f => (
                  <button key={f.key} style={s.tab(filtroDenuncias === f.key)} onClick={() => { setFiltroDenuncias(f.key); cargarDenuncias(f.key); }}>{f.label}</button>
                ))}
              </div>
            </div>
            <div style={{ color: COLORES.gris, fontSize: 12, marginBottom: 16 }}>
              Compromiso de las Normas de la comunidad: revisar cada denuncia en menos de 24 horas.
            </div>
            {errorDenuncias && <div style={{ ...s.error, textAlign: "left", marginBottom: 12 }}>{errorDenuncias}</div>}
            <table style={s.tabla}>
              <thead>
                <tr>
                  <th style={s.th}>Fecha</th>
                  <th style={s.th}>Tipo</th>
                  <th style={s.th}>Contenido</th>
                  <th style={s.th}>Motivo</th>
                  <th style={s.th}>Denunciado</th>
                  <th style={s.th}>Denuncia</th>
                  <th style={s.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {denuncias.map(d => {
                  const horas = (Date.now() - new Date(d.creado_en).getTime()) / 3600000;
                  const pendiente = d.estado === "pendiente";
                  const colorEstado = { pendiente: horas > 24 ? COLORES.rojo : COLORES.amarillo, descartada: COLORES.gris, contenido_borrado: COLORES.naranja, usuario_suspendido: COLORES.rojo }[d.estado] || COLORES.gris;
                  return (
                    <tr key={d.id}>
                      <td style={{ ...s.td, color: COLORES.gris, fontSize: 12, whiteSpace: "nowrap" }}>
                        {new Date(d.creado_en).toLocaleString("es-ES", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                        <div><span style={s.badge(colorEstado)}>{pendiente ? `hace ${Math.floor(horas)} h` : d.estado.replace("_", " ")}</span></div>
                      </td>
                      <td style={s.td}>{{ vibe: "Vibe", post_tribu: "Post de tribu", usuario: "Usuario" }[d.tipo] || d.tipo}</td>
                      <td style={{ ...s.td, maxWidth: 320, whiteSpace: "pre-wrap" }}>{d.contenido_texto || "—"}</td>
                      <td style={{ ...s.td, maxWidth: 220, whiteSpace: "pre-wrap", color: COLORES.gris }}>{d.motivo || "—"}</td>
                      <td style={s.td}>
                        {d.reportado_nick || "—"}
                        {d.denuncias_al_reportado > 1 && <div style={{ color: COLORES.rojo, fontSize: 11 }}>{d.denuncias_al_reportado} denuncias en total</div>}
                        {d.reportado_suspendido && <div><span style={s.badge(COLORES.rojo)}>suspendido</span></div>}
                      </td>
                      <td style={{ ...s.td, color: COLORES.gris, fontSize: 12 }}>por {d.reportador_nick || "—"}</td>
                      <td style={s.td}>
                        {pendiente ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <button style={s.btnGris} onClick={() => resolverDenuncia(d, "descartar")}>Descartar</button>
                            {(d.tipo === "vibe" || d.tipo === "post_tribu") && d.contenido_id && (
                              <button style={{ ...s.btnSm, backgroundColor: COLORES.naranja }} onClick={() => resolverDenuncia(d, "borrar_contenido")}>Borrar contenido</button>
                            )}
                            {d.reportado_id && !d.reportado_suspendido && (
                              <button style={s.btnRojo} onClick={() => resolverDenuncia(d, "suspender")}>Borrar y suspender</button>
                            )}
                          </div>
                        ) : <span style={{ color: COLORES.gris, fontSize: 12 }}>Resuelta</span>}
                      </td>
                    </tr>
                  );
                })}
                {denuncias.length === 0 && !errorDenuncias && (
                  <tr><td style={{ ...s.td, color: COLORES.gris }} colSpan={7}>No hay denuncias en esta lista</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

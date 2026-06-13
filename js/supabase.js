/* ============================================
   a-letter-for-you — Supabase Integration
   ============================================ */

// ─── CONFIGURACIÓN ─────────────────────────
// Reemplaza estos valores con tus credenciales de Supabase
// (Las encuentras en Configuración > API en tu panel de Supabase)
const SUPABASE_URL = 'https://cllnwukstbqvkewtocac.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbG53dWtzdGJxdmtld3RvY2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMTAwOTgsImV4cCI6MjA5Njg4NjA5OH0.MBHIZDI1LiLC4H20ZSofmDmdspPNr9B5H5WEClNM5Uc';

// Limpieza automática por si se pega la URL de PostgREST con '/rest/v1/'
const formattedUrl = SUPABASE_URL.replace(/\/rest\/v1\/?$/, '');

// ─── CLIENTE SUPABASE ──────────────────────
// Se inicializa automáticamente si editas las credenciales arriba
const supabase = (window.supabase?.createClient && SUPABASE_URL !== 'https://TU_PROYECTO.supabase.co')
  ? window.supabase.createClient(formattedUrl, SUPABASE_ANON_KEY)
  : null;

// ─── FUNCIÓN PRINCIPAL ─────────────────────
async function saveMessage(name, message) {
  if (!name?.trim()) throw new Error('El nombre es obligatorio.');
  if (!message?.trim()) throw new Error('El mensaje es obligatorio.');

  // Si ya configuraste tus credenciales reales, guarda en la base de datos de Supabase
  if (supabase) {
    const { error } = await supabase
      .from('messages')
      .insert({ name: name.trim(), message: message.trim() });

    if (error) throw error;
    return { success: true };
  }

  // ─── DEMO / FALLBACK ───
  // Si dejas las credenciales por defecto, se simula éxito y se muestra en la consola
  console.log('[saveMessage] Modo Demo - Mensaje recibido:', { name, message });
  console.log('[saveMessage] Modifica SUPABASE_URL y SUPABASE_ANON_KEY en js/supabase.js para conectar tu Base de Datos.');

  // Simula una pequeña demora de red
  await new Promise(resolve => setTimeout(resolve, 800));

  return { success: true };
}

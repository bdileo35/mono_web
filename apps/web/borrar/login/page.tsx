'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Definir los usuarios y sus roles
const USUARIOS = {
  user: { password: "1234", role: "User" },
  admin: { password: "1234", role: "Admin" },
  super: { password: "1234", role: "SuperAdmin" }
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verificar credenciales
    const usuario = USUARIOS[username as keyof typeof USUARIOS];
    
    if (usuario && usuario.password === password) {
      // Guardar datos de sesión
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", usuario.role);
      localStorage.setItem("username", username);
      
      // Redirigir según el rol
      switch (usuario.role) {
        case "SuperAdmin":
          router.push("/admin/panel");
          break;
        case "Admin":
          router.push("/admin");
          break;
        case "User":
          router.push("/inicio");
          break;
        default:
          router.push("/inicio");
      }
    } else {
      setError("Usuario o contraseña incorrectos");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    setUsername("");
    setPassword("");
    setError("");
    router.push("/");
  };

  const handleSolicitarTimbre = () => {
    // Redirigir a la página pública con modal de solicitud
    if (typeof window !== 'undefined') {
      localStorage.setItem('showSolicitudModal', 'true');
      window.history.back();
    }
  };

  // Función para login rápido (solo para desarrollo)
  const handleQuickLogin = (user: string) => {
    setUsername(user);
    setPassword("1234");
    // Simular submit automático
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    }, 100);
  };

  // Función para login con Google (simulado)
  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simular proceso de OAuth
    setTimeout(() => {
      // Simular datos de Google
      const googleUser = {
        email: "usuario@gmail.com",
        name: "Usuario Google",
        role: "User" // Por defecto User - en producción se consultaría la BD
      };
      
      // En producción, aquí se consultaría la base de datos para determinar el rol
      // basado en el email del usuario de Google
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", googleUser.role);
      localStorage.setItem("username", googleUser.email);
      localStorage.setItem("userName", googleUser.name);
      localStorage.setItem("loginMethod", "google");
      
      router.push("/inicio");
    }, 1500);
  };

  // Función para login con Facebook (simulado)
  const handleFacebookLogin = () => {
    setIsLoading(true);
    // Simular proceso de OAuth
    setTimeout(() => {
      // Simular datos de Facebook
      const facebookUser = {
        email: "usuario@facebook.com",
        name: "Usuario Facebook",
        role: "User" // Por defecto User - en producción se consultaría la BD
      };
      
      // En producción, aquí se consultaría la base de datos para determinar el rol
      // basado en el email del usuario de Facebook
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", facebookUser.role);
      localStorage.setItem("username", facebookUser.email);
      localStorage.setItem("userName", facebookUser.name);
      localStorage.setItem("loginMethod", "facebook");
      
      router.push("/inicio");
    }, 1500);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div
        style={{
          width: 320,
          maxWidth: '90%',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 24px #0002',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h2 style={{ 
            color: "#1a4fa3", 
            fontWeight: 700, 
            marginBottom: 4,
            fontSize: 20
          }}>
            Login
          </h2>
          <p style={{ 
            fontSize: 12, 
            color: "#666", 
            marginBottom: 4 
          }}>
            Iniciá sesión para acceder al sistema
          </p>
          <div style={{ 
            fontSize: 10, 
            color: "#888",
            background: "#f8f9fa",
            padding: "3px 6px",
            borderRadius: 3,
            display: "inline-block"
          }}>
            Usuarios de prueba disponibles
          </div>
        </div>

        <form style={{ 
          marginBottom: 16, 
          width: '100%',
          padding: "10px",
          background: "#f8f9fa",
          borderRadius: 12,
          border: "1px solid #e0e0e0"
        }} onSubmit={handleSubmit}>
          <div style={{ 
            marginBottom: 8, 
            display: "flex", 
            alignItems: "center",
            gap: 10
          }}>
            <label style={{ 
              fontSize: 13, 
              color: "#555",
              fontWeight: 600,
              minWidth: 70,
              textAlign: "right"
            }}>
              Usuario:
            </label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="user, admin, super"
              style={{ 
                flex: 1,
                maxWidth: 180,
                padding: 10, 
                borderRadius: 6, 
                border: "1.5px solid #bfc5d2", 
                fontSize: 14,
                boxSizing: "border-box",
                background: "#fff",
                color: "#222",
                boxShadow: "0 1px 4px #0001",
                outline: "none",
                transition: "border 0.2s, box-shadow 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#1a4fa3"}
              onBlur={(e) => e.target.style.borderColor = "#bfc5d2"}
            />
          </div>
          
          <div style={{ 
            marginBottom: 8, 
            display: "flex", 
            alignItems: "center",
            gap: 10
          }}>
            <label style={{ 
              fontSize: 13, 
              color: "#555",
              fontWeight: 600,
              minWidth: 70,
              textAlign: "right"
            }}>
              Password:
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="1234"
              style={{ 
                flex: 1,
                maxWidth: 180,
                padding: 10, 
                borderRadius: 6, 
                border: "1.5px solid #bfc5d2", 
                fontSize: 14,
                boxSizing: "border-box",
                background: "#fff",
                color: "#222",
                boxShadow: "0 1px 4px #0001",
                outline: "none",
                transition: "border 0.2s, box-shadow 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#1a4fa3"}
              onBlur={(e) => e.target.style.borderColor = "#bfc5d2"}
            />
          </div>
          
          {error && (
            <div style={{ 
              color: '#e74c3c', 
              fontWeight: 600, 
              marginBottom: 16, 
              textAlign: 'center',
              background: "#fdf2f2",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #fecaca"
            }}>
              ❌ {error}
            </div>
          )}
          
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button 
              type="button" 
              style={{ 
                flex: 1, 
                background: "#f8f9fa", 
                color: "#666", 
                border: "2px solid #e0e0e0", 
                borderRadius: 8, 
                padding: 10, 
                fontWeight: 600, 
                fontSize: 14, 
                cursor: "pointer",
                transition: "all 0.2s"
              }} 
              onClick={handleCancel}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e9ecef"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f8f9fa"}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              style={{ 
                flex: 1, 
                background: isLoading ? "#ccc" : "#1a4fa3", 
                color: "#fff", 
                border: "none", 
                borderRadius: 8, 
                padding: 10, 
                fontWeight: 600, 
                fontSize: 14, 
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s"
              }}
            >
              {isLoading ? "⏳ Iniciando..." : "Login"}
            </button>
          </div>
        </form>

        {/* Login rápido para desarrollo */}
        <div style={{ 
          marginBottom: 16,
          padding: "10px",
          background: "#f8f9fa",
          borderRadius: 12,
          border: "1px solid #e0e0e0"
        }}>
          <h4 style={{ 
            margin: "0 0 12px 0", 
            fontSize: 14, 
            color: "#666",
            textAlign: "center"
          }}>
            🚀 Login Rápido (Desarrollo)
          </h4>
          <div style={{ 
            display: "flex", 
            gap: 8, 
            justifyContent: "center" 
          }}>
            <button 
              onClick={() => handleQuickLogin("user")}
              style={{ 
                background: "#388e3c", 
                color: "#fff", 
                border: "none", 
                borderRadius: 6, 
                padding: "8px 12px", 
                fontWeight: 600, 
                fontSize: 12, 
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#2e7d32"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#388e3c"}
            >
              👤 User
            </button>
            <button 
              onClick={() => handleQuickLogin("admin")}
              style={{ 
                background: "#1976d2", 
                color: "#fff", 
                border: "none", 
                borderRadius: 6, 
                padding: "8px 12px", 
                fontWeight: 600, 
                fontSize: 12, 
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#1565c0"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#1976d2"}
            >
              👨‍💼 Admin
            </button>
            <button 
              onClick={() => handleQuickLogin("super")}
              style={{ 
                background: "#7b1fa2", 
                color: "#fff", 
                border: "none", 
                borderRadius: 6, 
                padding: "8px 12px", 
                fontWeight: 600, 
                fontSize: 12, 
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#6a1b9a"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#7b1fa2"}
            >
              👑 Super
            </button>
          </div>
        </div>
        
        {/* Link para solicitar timbre */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 16, 
          padding: "10px",
          background: "#f8f9fa",
          borderRadius: 12,
          border: "1px solid #e0e0e0"
        }}>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
            ¿No tenés cuenta? ¿Sos residente?
          </p>
          <button 
            onClick={handleSolicitarTimbre}
            style={{ 
              background: "#4caf50", 
              color: "#fff", 
              border: "none", 
              borderRadius: 6, 
              padding: "10px 20px", 
              fontWeight: 600, 
              fontSize: 14, 
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#388e3c"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#4caf50"}
          >
            🏠 Solicitar mi timbre
          </button>
        </div>

        {/* Redes sociales */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 16, 
          marginTop: 12 
        }}>
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            style={{ 
              background: "#fff", 
              border: "2px solid #e0e0e0", 
              borderRadius: "50%", 
              width: 44, 
              height: 44, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: 22, 
              cursor: isLoading ? "not-allowed" : "pointer", 
              padding: 0,
              transition: "all 0.2s",
              opacity: isLoading ? 0.6 : 1
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.borderColor = "#1a4fa3")}
            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.borderColor = "#e0e0e0")}
            title="Iniciar sesión con Google"
          >
            {isLoading ? "⏳" : <Image src="/google-icon.png" alt="Google" width={24} height={24} />}
          </button>
          <button 
            onClick={handleFacebookLogin}
            disabled={isLoading}
            style={{ 
              background: "#fff", 
              border: "2px solid #e0e0e0", 
              borderRadius: "50%", 
              width: 44, 
              height: 44, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: 22, 
              cursor: isLoading ? "not-allowed" : "pointer", 
              padding: 0,
              transition: "all 0.2s",
              opacity: isLoading ? 0.6 : 1
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.borderColor = "#1a4fa3")}
            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.borderColor = "#e0e0e0")}
            title="Iniciar sesión con Facebook"
          >
            {isLoading ? "⏳" : <Image src="/facebook-icon.png" alt="Facebook" width={24} height={24} />}
          </button>
        </div>
      </div>
    </div>
  );
} 
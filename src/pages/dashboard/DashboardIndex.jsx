import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Music, CheckCircle } from 'lucide-react';
import '../../components/DashboardLayout.css'; // Asegura cargar los estilos

// Datos Hardcodeados de Ejemplo (hasta conectar Supabase)
const pieData = [
  { name: 'Mis descargas', value: 10 },
  { name: 'Resto', value: 90 },
];

const COLORS = ['var(--accent-color)', '#374151']; // Verde neón y gris oscuro

const lineData = [
  { name: 'Abr', ventas: 0, monto: 0 },
  { name: 'May', ventas: 0.1, monto: 0.2 },
  { name: 'Jun', ventas: 0.2, monto: 0.3 },
  { name: 'Jul', ventas: 0.25, monto: 0.25 },
  { name: 'Ago', ventas: 0.3, monto: 0.4 },
  { name: 'Sep', ventas: 0.4, monto: 0.3 },
  { name: 'Oct', ventas: 0.5, monto: 0.5 },
  { name: 'Nov', ventas: 0.8, monto: 0.6 },
  { name: 'Dic', ventas: 0.9, monto: 0.7 },
  { name: 'Ene', ventas: 0.85, monto: 0.8 },
  { name: 'Feb', ventas: 0.95, monto: 0.9 },
  { name: 'Mar', ventas: 1.0, monto: 1.0 },
];

const DashboardIndex = () => {
  return (
    <>
      <div className="dashboard-header">
        <h1>Escritorio</h1>
        <p>Resumen de tu cuenta</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Archivos vendidos</div>
          <div className="stat-value">0</div>
          <div className="stat-subtitle">
            <Music size={14} />
            <span>Ventas + Descargas</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Pendiente por cobrar</div>
          <div className="stat-value">$ 0</div>
          <div className="stat-subtitle">
            <CheckCircle size={14} />
            <span>Ventas + Suscripciones (Click detalles)</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Ganancia Total</div>
          <div className="stat-value">$ 0</div>
          <div className="stat-subtitle">
            <CheckCircle size={14} />
            <span>Ventas + Suscripciones</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Gráfico de Pastel - Porciento de Descargas */}
        <div className="chart-card">
          <h3>Porciento de Descargas</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  stroke="none"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="square" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Líneas - Relación de Ventas */}
        <div className="chart-card">
          <h3>Relación de ventas</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" tick={{fontSize: 12}} />
                <YAxis stroke="#888" tick={{fontSize: 12}} domain={[0, 1]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="square" />
                <Line type="monotone" dataKey="ventas" name="Ventas" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="monto" name="Monto total (ventas)" stroke="var(--accent-color)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardIndex;

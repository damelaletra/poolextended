import React, { useState } from 'react';
import { Search, Filter, Plus, X, Upload } from 'lucide-react';
import '../../components/DashboardLayout.css';
import './Archivos.css';

const Archivos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="dashboard-header flex-header">
        <div>
          <span className="breadcrumb">Archivos &gt; Listado</span>
          <h1>Archivos</h1>
        </div>
        <button className="btn-importar" onClick={() => setIsModalOpen(true)}>
          Importar archivos
        </button>
      </div>

      <div className="archivos-container glass-panel">
        <div className="archivos-toolbar">
          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder="Buscar" />
          </div>
          <button className="btn-filtros">
            <Filter size={16} />
            Filtros
          </button>
        </div>

        <div className="archivos-table-wrapper">
          <table className="archivos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>BPM</th>
                <th>Categorías</th>
                <th>Estado</th>
                <th>Secciones a mostrar</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state */}
              <tr>
                <td colSpan="6" className="empty-state">
                  <div className="empty-icon-circle">
                    <X size={24} />
                  </div>
                  <p>No se encontraron registros</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal (Mock) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            <h2>Importar Nuevo Archivo</h2>
            <div className="upload-area">
              <Upload size={32} />
              <p>Arrastra tu archivo de audio/video aquí o haz clic para seleccionar</p>
            </div>
            <div className="form-group">
              <label>Nombre del Track</label>
              <input type="text" placeholder="Ej: Charly & Johayron - Allo" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Precio ($)</label>
                <input type="number" placeholder="2.00" step="0.50" />
              </div>
              <div className="form-group">
                <label>BPM</label>
                <input type="number" placeholder="106" />
              </div>
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select>
                <option>Cubaton Video</option>
                <option>House Video</option>
                <option>Reggaeton</option>
              </select>
            </div>
            <button className="btn-accent" style={{ width: '100%', marginTop: '20px' }} onClick={() => setIsModalOpen(false)}>
              Guardar y Subir
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Archivos;

import React from 'react';
import { Modal } from './Modal';
import { Award, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';

export const CertificateModal = ({ isOpen, onClose, request }) => {
  if (!request) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recycling Certificate" maxWidth="520px">
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
          <Award size={32} />
        </div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-title)', marginBottom: '0.25rem' }}>Certificate of Responsible Recycling</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>EcoCycle Verified • ISO 14001 Compliant</p>

        <div style={{ backgroundColor: 'var(--color-gray-100)', borderRadius: '12px', padding: '1.25rem', textAlign: 'left', fontSize: '0.88rem' }}>
          <div style={{ marginBottom: '0.6rem' }}><strong>Certificate #:</strong> {request.certificateNumber || 'CERT-ECO-2026-XXXX'}</div>
          <div style={{ marginBottom: '0.6rem' }}><strong>Request ID:</strong> {request.id}</div>
          <div style={{ marginBottom: '0.6rem' }}><strong>Item:</strong> {request.itemName}</div>
          <div style={{ marginBottom: '0.6rem' }}><strong>Weight:</strong> {request.weightKg} kg</div>
          <div style={{ marginBottom: '0.6rem' }}><strong>Citizen:</strong> {request.userName}</div>
          <div><strong>Completed:</strong> {request.updatedAt ? new Date(request.updatedAt).toLocaleDateString() : 'N/A'}</div>
        </div>

        {request.recoveredMaterials && (
          <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center' }}>
              <Leaf size={16} color="#10b981" /> Recovered Materials
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.82rem' }}>
              <div>Gold: {request.recoveredMaterials.goldGrams}g</div>
              <div>Silver: {request.recoveredMaterials.silverGrams}g</div>
              <div>Copper: {request.recoveredMaterials.copperGrams}g</div>
              <div>Plastics: {request.recoveredMaterials.plasticsGrams}g</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.82rem', fontWeight: 600 }}>
          <ShieldCheck size={16} /> <CheckCircle2 size={16} /> Verified & Authenticated
        </div>
      </div>
    </Modal>
  );
};

export default CertificateModal;

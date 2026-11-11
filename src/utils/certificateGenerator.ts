import { jsPDF } from 'jspdf';

export interface CertificateData {
  educatorName: string;
  schoolName?: string;
  dateStr: string;
}

/**
 * Draws an elegant, high-resolution certificate on an HTML5 canvas
 * using pure 2D Canvas APIs. This avoids html2canvas CSS parsing bugs (such as Tailwind v4 oklch colors).
 */
export const drawCertificateToCanvas = (data: CertificateData): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  // High-resolution A4 landscape (approx 200 DPI for ultra-crisp print quality)
  canvas.width = 2380;
  canvas.height = 1684;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas 2D context');

  const w = canvas.width;
  const h = canvas.height;

  // 1. Background fill: warm luxury ivory
  ctx.fillStyle = '#fefcf6';
  ctx.fillRect(0, 0, w, h);

  // Subtle radial gradient in center
  const radial = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, w / 1.4);
  radial.addColorStop(0, '#ffffff');
  radial.addColorStop(1, '#fbf6ea');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, w, h);

  // 2. Borders
  // Outer gold border
  ctx.strokeStyle = '#b45309'; // warm amber-700
  ctx.lineWidth = 14;
  ctx.strokeRect(60, 60, w - 120, h - 120);

  // Thin outer line
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 3;
  ctx.strokeRect(45, 45, w - 90, h - 90);

  // Inner decorative border
  ctx.strokeStyle = '#d97706'; // amber-600
  ctx.lineWidth = 4;
  ctx.strokeRect(85, 85, w - 170, h - 170);

  // 3. Ornate Corner Decorations
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 4;
    ctx.beginPath();
    // Corner bracket
    ctx.moveTo(0, 50);
    ctx.lineTo(0, 0);
    ctx.lineTo(50, 0);
    ctx.stroke();

    // Corner diamond
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(32, 18);
    ctx.lineTo(39, 25);
    ctx.lineTo(32, 32);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  drawCorner(95, 95, 0);
  drawCorner(w - 95, 95, Math.PI / 2);
  drawCorner(w - 95, h - 95, Math.PI);
  drawCorner(95, h - 95, -Math.PI / 2);

  // 4. Header Seal Emblem
  const centerX = w / 2;
  const sealY = 250;

  // Gold seal circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, sealY, 65, 0, Math.PI * 2);
  const goldGrad = ctx.createLinearGradient(centerX - 65, sealY - 65, centerX + 65, sealY + 65);
  goldGrad.addColorStop(0, '#f59e0b');
  goldGrad.addColorStop(0.5, '#d97706');
  goldGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = goldGrad;
  ctx.fill();

  // Seal inner ring
  ctx.strokeStyle = '#fef3c7';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, sealY, 54, 0, Math.PI * 2);
  ctx.stroke();

  // Star in seal
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 50px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★', centerX, sealY);
  ctx.restore();

  // 5. Title Texts
  ctx.textAlign = 'center';

  // Subtitle banner
  ctx.fillStyle = '#92400e'; // amber-800
  ctx.font = 'bold 28px serif';
  ctx.fillText('CERTIFICATE OF RESPONSIBLE EDUCATIONAL CREATION', centerX, sealY + 120);

  // Main Framework Title
  ctx.fillStyle = '#0f172a'; // slate-900
  ctx.font = 'bold 84px serif';
  ctx.fillText('The Vibe-Code of Ethics', centerX, sealY + 225);

  // Framework Subtitle
  ctx.fillStyle = '#475569'; // slate-600
  ctx.font = 'italic 30px serif';
  ctx.fillText('A Responsible Creation Framework for Educators Building AI-Powered Educational Tools', centerX, sealY + 285);

  // 6. Recipient Announcement
  ctx.fillStyle = '#334155';
  ctx.font = 'italic 34px Georgia, serif';
  ctx.fillText('This certifies that', centerX, sealY + 390);

  // Recipient Name
  const name = data.educatorName.trim() || 'Educator-Creator';
  ctx.fillStyle = '#1e1b4b'; // deep indigo-950
  ctx.font = 'bold 74px Georgia, serif';
  ctx.fillText(name, centerX, sealY + 490);

  // Name underline flourish
  const nameWidth = ctx.measureText(name).width;
  const lineHalf = Math.max(nameWidth / 2 + 50, 300);
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - lineHalf, sealY + 520);
  ctx.lineTo(centerX + lineHalf, sealY + 520);
  ctx.stroke();

  // School name if present
  if (data.schoolName && data.schoolName.trim()) {
    ctx.fillStyle = '#4338ca'; // indigo-700
    ctx.font = 'bold 30px serif';
    ctx.fillText(data.schoolName.trim(), centerX, sealY + 575);
  }

  // 7. Citation / Statement of Competence
  ctx.fillStyle = '#334155'; // slate-700
  ctx.font = '30px serif';
  const startDescY = data.schoolName && data.schoolName.trim() ? sealY + 630 : sealY + 600;

  const line1 = 'has successfully studied, reflected upon, and formally pledged adherence to the 12 ethical commitments';
  const line2 = 'of The Vibe-Code of Ethics—promising to prioritize pedagogy over novelty, safeguard student privacy';
  const line3 = 'with zero unvetted data storage, ensure universal accessibility, and maintain meaningful human educator oversight.';

  ctx.fillText(line1, centerX, startDescY);
  ctx.fillText(line2, centerX, startDescY + 48);
  ctx.fillText(line3, centerX, startDescY + 96);

  // 8. Signatures & Badges Area (Bottom)
  const bottomY = h - 260;

  // Left Signature: Educator
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(220, bottomY);
  ctx.lineTo(620, bottomY);
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.font = 'italic bold 38px Georgia, serif';
  ctx.fillText(name, 420, bottomY - 20);

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('EDUCATOR-CREATOR SIGNATURE', 420, bottomY + 35);

  // Center Seal: Zero-Data Certified
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, bottomY - 20, 60, 0, Math.PI * 2);
  ctx.fillStyle = '#ecfdf5'; // emerald-50
  ctx.fill();
  ctx.strokeStyle = '#059669'; // emerald-600
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#065f46'; // emerald-800
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('ZERO-DATA', centerX, bottomY - 30);
  ctx.fillText('CERTIFIED', centerX, bottomY - 8);

  ctx.fillStyle = '#059669';
  ctx.font = '16px sans-serif';
  ctx.fillText('Privacy by Design', centerX, bottomY + 14);
  ctx.restore();

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('SECURITY & PRIVACY STANDARD', centerX, bottomY + 70);

  // Right Date: Issue Date
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w - 620, bottomY);
  ctx.lineTo(w - 220, bottomY);
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 32px serif';
  ctx.fillText(data.dateStr, w - 420, bottomY - 20);

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('DATE OF CERTIFICATION', w - 420, bottomY + 35);

  return canvas;
};

/**
 * Downloads the certificate directly as a high-resolution PNG image
 */
export const downloadCertificateAsPng = (data: CertificateData): void => {
  const canvas = drawCertificateToCanvas(data);
  const imgUrl = canvas.toDataURL('image/png');
  const safeName = (data.educatorName || 'Educator').replace(/[^a-zA-Z0-9_-]/g, '_');

  const link = document.createElement('a');
  link.href = imgUrl;
  link.download = `Vibe-Code-of-Ethics-Certificate-${safeName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Downloads the certificate directly as an A4 Landscape PDF document
 */
export const downloadCertificateAsPdf = (data: CertificateData): void => {
  const canvas = drawCertificateToCanvas(data);
  const imgData = canvas.toDataURL('image/png', 0.95);

  // A4 Landscape in mm: 297 x 210
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  pdf.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');

  const safeName = (data.educatorName || 'Educator').replace(/[^a-zA-Z0-9_-]/g, '_');
  pdf.save(`Vibe-Code-of-Ethics-Certificate-${safeName}.pdf`);
};

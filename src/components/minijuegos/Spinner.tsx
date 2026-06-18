import './Spinner.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  mensaje?: string;
}

export default function Spinner({ size = 'md', mensaje }: SpinnerProps) {
  return (
    <div className="spinner-contenedor">
      <div className={`spinner spinner-${size}`} />
      {mensaje && <p className="spinner-mensaje">{mensaje}</p>}
    </div>
  );
}

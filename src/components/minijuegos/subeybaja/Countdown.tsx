import './styles.css';

interface Props {
    numero: number;
}

export default function Countdown({ numero }: Props) {
    return (
        <div className="subeybaja-countdown-overlay">
            <div className="subeybaja-countdown-numero" key={numero}>
                {numero}
            </div>
        </div>
    );
}

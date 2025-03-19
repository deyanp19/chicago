import styles from './Clock.css';
import ClockUse from 'react-live-clock';

export default function Clock() {
    return (
        <div className="clock d-flex flex-column  align-items-end">
            
            <ClockUse
            format={'h:mm A'}
            
            ticking={true} />
            <div className="weekday">
                <ClockUse
            format={'dddd Mo MMMM'}
            
            ticking={true} />
            </div>
        
        </div>
        
    );
}

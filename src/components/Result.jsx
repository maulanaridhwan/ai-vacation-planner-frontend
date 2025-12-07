import styles from './Result.module.css';

const Result = ({ data, onReset }) => {
  if (!data) return null;

  const {
    destination,
    itinerary = [],
    booking_simulation = null,
    total_estimated_cost = 0,
  } = data;

  return (
    <div className={styles.resultPanel}>
      <div className={styles.header}>
        <h2>Your Vacation Plan</h2>
        <button onClick={onReset} className={styles.resetButton}>
          ← New Plan
        </button>
      </div>

      <div className={styles.destinationCard}>
        <h3>Destination</h3>
        <p className={styles.destination}>{destination}</p>
      </div>

      {itinerary.length > 0 && (
        <div className={styles.itinerarySection}>
          <h3>Day-by-Day Itinerary</h3>
          <div className={styles.itineraryList}>
            {itinerary.map((item, index) => (
              <div key={index} className={styles.itineraryItem}>
                <div className={styles.dayBadge}>
                  Day {item.day || index + 1}
                </div>
                <div className={styles.itineraryContent}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  {item.activities && item.activities.length > 0 && (
                    <ul className={styles.activities}>
                      {item.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {booking_simulation && (
        <div className={styles.bookingSection}>
          <h3>Booking Simulation Results</h3>
          <div className={styles.bookingGrid}>
            {booking_simulation.hotel && (
              <div className={styles.bookingCard}>
                <h4>Hotel</h4>
                <p className={styles.bookingName}>{booking_simulation.hotel.name}</p>
                {booking_simulation.hotel.price && (
                  <p className={styles.bookingPrice}>
                    ${booking_simulation.hotel.price.toFixed(2)}
                  </p>
                )}
                {booking_simulation.hotel.nights && (
                  <p className={styles.bookingDetail}>
                    {booking_simulation.hotel.nights} nights
                  </p>
                )}
              </div>
            )}
            {booking_simulation.flight && (
              <div className={styles.bookingCard}>
                <h4>Flight</h4>
                <p className={styles.bookingName}>
                  {booking_simulation.flight.airline}
                </p>
                {booking_simulation.flight.price && (
                  <p className={styles.bookingPrice}>
                    ${booking_simulation.flight.price.toFixed(2)}
                  </p>
                )}
                {booking_simulation.flight.route && (
                  <p className={styles.bookingDetail}>
                    {booking_simulation.flight.route}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cost summary removed by request */}
    </div>
  );
};

export default Result;

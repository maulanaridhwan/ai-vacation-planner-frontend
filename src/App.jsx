import { useState } from 'react';
import Form from './components/Form';
import Result from './components/Result';
import { planVacation } from './api/client';
import styles from './App.module.css';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await planVacation(formData);
      setResult(response);
    } catch (err) {
      console.error('Error planning vacation:', err);
      setError(
        err.error ||
          err.message ||
          'Failed to plan vacation. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>AI Vacation Planner</h1>
          <p>Plan your perfect getaway with AI-powered suggestions</p>
        </div>
      </header>

      <main className={styles.main}>
        {error && (
          <div className={styles.errorBanner}>
            <div className={styles.errorContent}>
              <span className={styles.errorIcon}>Oh no, </span>
              <div>
                <h3>Something went wrong</h3>
                <p>{error}</p>
              </div>
              <button
                className={styles.errorClose}
                onClick={() => setError(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
            <p>Planning your vacation...</p>
          </div>
        )}

        {result ? (
          <Result data={result} onReset={handleReset} />
        ) : (
          <div className={styles.formContainer}>
            <Form onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 AI Vacation Planner.</p>
      </footer>
    </div>
  );
}

export default App;

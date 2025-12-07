import { useState } from 'react';
import styles from './Form.module.css';

const Form = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    origin: '',
    startDate: '',
    endDate: '',
    preferences: {
      beach: false,
      nature: false,
      food: false,
      museum: false,
    },
    budget: '',
    allowBookingSimulation: false,
    paymentToken: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('pref_')) {
      const prefName = name.replace('pref_', '');
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefName]: checked,
        },
      }));
    } else if (name === 'allowBookingSimulation') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || '' : value,
      }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.origin.trim()) {
      newErrors.origin = 'Origin city is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = 'Budget must be greater than 0';
    }
    const hasPreference = Object.values(formData.preferences).some(p => p);
    if (!hasPreference) {
      newErrors.preferences = 'Select at least one preference';
    }
    if (formData.allowBookingSimulation && !formData.paymentToken.trim()) {
      newErrors.paymentToken = 'Payment token is required when booking simulation is enabled';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="origin">Origin City *</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleInputChange}
          placeholder="e.g., New York"
          disabled={isLoading}
        />
        {errors.origin && <span className={styles.error}>{errors.origin}</span>}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">Start Date *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endDate">End Date *</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Preferences *</label>
        <div className={styles.checkboxGroup}>
          {['beach', 'nature', 'food', 'museum'].map(pref => (
            <div key={pref} className={styles.checkboxItem}>
              <input
                type="checkbox"
                id={`pref_${pref}`}
                name={`pref_${pref}`}
                checked={formData.preferences[pref]}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <label htmlFor={`pref_${pref}`} className={styles.checkboxLabel}>
                {pref.charAt(0).toUpperCase() + pref.slice(1)}
              </label>
            </div>
          ))}
        </div>
        {errors.preferences && <span className={styles.error}>{errors.preferences}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="budget">Budget ($) *</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          placeholder="e.g., 2000"
          min="0"
          step="0.01"
          disabled={isLoading}
        />
        {errors.budget && <span className={styles.error}>{errors.budget}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            name="allowBookingSimulation"
            checked={formData.allowBookingSimulation}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.toggleInput}
          />
          <span className={styles.toggleSwitch}></span>
          <span className={styles.toggleText}>Allow Booking Simulation</span>
        </label>
      </div>

      {formData.allowBookingSimulation && (
        <div className={styles.formGroup}>
          <label htmlFor="paymentToken">Payment Token *</label>
          <input
            type="password"
            id="paymentToken"
            name="paymentToken"
            value={formData.paymentToken}
            onChange={handleInputChange}
            placeholder="Enter your payment token"
            disabled={isLoading}
          />
          {errors.paymentToken && <span className={styles.error}>{errors.paymentToken}</span>}
        </div>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Planning Vacation...' : 'Plan My Vacation'}
      </button>
    </form>
  );
};

export default Form;

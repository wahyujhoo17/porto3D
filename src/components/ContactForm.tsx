import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would use EmailJS or a similar service here
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      if (formState.name && formState.email && formState.message) {
        setFormStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    }, 1500);
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          placeholder="Your name"
          disabled={formStatus === 'submitting'}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          placeholder="Your email"
          disabled={formStatus === 'submitting'}
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
          placeholder="Your message"
          disabled={formStatus === 'submitting'}
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={formStatus === 'submitting'}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex justify-center items-center"
      >
        {formStatus === 'submitting' ? (
          <>
            <Loader size={20} className="animate-spin mr-2" />
            Sending...
          </>
        ) : 'Send Message'}
      </button>
      
      {formStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center"
        >
          <CheckCircle size={20} className="mr-2" />
          Your message has been sent successfully!
        </motion.div>
      )}
      
      {formStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center"
        >
          <XCircle size={20} className="mr-2" />
          There was an error sending your message. Please try again.
        </motion.div>
      )}
    </motion.form>
  );
};

export default ContactForm;
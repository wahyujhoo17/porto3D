import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import { socialLinks } from "../data";
import * as LucideIcons from "lucide-react";

const ContactSection: React.FC = () => {
  const contactInfo = [
    {
      icon: <Mail size={24} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Email",
      content: "wahyujhoo.17@gmail.com",
      link: "mailto:wahyujhoo.17@gmail.com",
    },
    {
      icon: (
        <Phone size={24} className="text-indigo-600 dark:text-indigo-400" />
      ),
      title: "WhatsApp",
      content: "+62 838-3121-1636",
      link: "https://wa.me/6283831211636",
    },
    {
      icon: (
        <MapPin size={24} className="text-indigo-600 dark:text-indigo-400" />
      ),
      title: "Location",
      content: "Bojonegoro, Indonesia",
      link: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out if you have any questions, project inquiries,
            or just want to say hello. I'm always open to discussing new
            opportunities and interesting projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.content}
                  </p>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center md:text-left">
                Connect with Me
              </h3>
              <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((link, index) => {
                  const IconComponent =
                    LucideIcons[link.icon as keyof typeof LucideIcons];
                  return (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      aria-label={link.name}
                    >
                      {IconComponent && <IconComponent size={20} />}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

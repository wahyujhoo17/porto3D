import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code,
  Globe,
  Server,
  Smartphone,
  User,
  Calendar,
  Briefcase,
  MapPin,
} from "lucide-react";
import Lanyard from "./ui/lanyard";

const AboutSection: React.FC = () => {
  // Tambahkan ref untuk tracking scroll
  const scrollRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  // Value transformasi untuk posisi dan rotasi Lanyard berdasarkan scroll
  const lanyardY = useTransform(scrollYProgress, [0, 1], [2, 5]);
  const lanyardX = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const gravityForce = useTransform(scrollYProgress, [0, 1], [-20, -10]);

  // State untuk posisi Lanyard
  const [lanyardPosition, setLanyardPosition] = useState([0, 2, 12]);
  const [lanyardGravity, setLanyardGravity] = useState([0, -20, 0]);

  // Update posisi Lanyard berdasarkan scroll
  useEffect(() => {
    const unsubscribeY = lanyardY.onChange((v) => {
      setLanyardPosition((prev) => [lanyardX.get(), v, prev[2]]);
    });

    const unsubscribeX = lanyardX.onChange((v) => {
      setLanyardPosition((prev) => [v, prev[1], prev[2]]);
    });

    const unsubscribeGravity = gravityForce.onChange((v) => {
      setLanyardGravity([0, v, 0]);
    });

    return () => {
      unsubscribeY();
      unsubscribeX();
      unsubscribeGravity();
    };
  }, [lanyardY, lanyardX, gravityForce]);

  const services = [
    {
      title: "Frontend Development",
      description:
        "Creating responsive, interactive user interfaces with modern JavaScript frameworks like React, Vue, and Angular.",
      icon: <Code size={24} className="text-indigo-600 dark:text-indigo-400" />,
    },
    {
      title: "Backend Development",
      description:
        "Building robust APIs and server-side applications with Node.js, Laravel, and Express.",
      icon: (
        <Server size={24} className="text-indigo-600 dark:text-indigo-400" />
      ),
    },
    {
      title: "Mobile Development",
      description:
        "Developing cross-platform mobile applications with Flutter and React Native for iOS and Android.",
      icon: (
        <Smartphone
          size={24}
          className="text-indigo-600 dark:text-indigo-400"
        />
      ),
    },
    {
      title: "Web Design",
      description:
        "Designing beautiful and functional user interfaces with a focus on user experience and accessibility.",
      icon: (
        <Globe size={24} className="text-indigo-600 dark:text-indigo-400" />
      ),
    },
  ];

  const personalInfo = [
    { icon: <User size={20} />, label: "Name", value: "Wahyu Bagus S" },
    {
      icon: <Calendar size={20} />,
      label: "Date of Birth",
      value: "Desember 25, 2000",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Bojonegoro, INA",
    },
    { icon: <Briefcase size={20} />, label: "Experience", value: "1+ Years" },
  ];

  return (
    <section
      id="about"
      ref={scrollRef}
      className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative w-full overflow-visible"
    >
      {/* Main content container - sesuaikan gap untuk akomodasi sizing baru */}
      <div className="container mx-auto px-4 relative z-10 max-w-[1280px] overflow-visible">
        {/* Gunakan grid dengan gap yang lebih besar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Lanyard container dengan ukuran lebih besar */}
          <div className="lg:col-span-6 lg:sticky lg:top-0 self-start py-16 overflow-visible overflow-all-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl bg-gradient-to-br from-indigo-50/20 to-white/5 dark:from-indigo-950/20 dark:to-gray-900/5 backdrop-blur-sm h-[600px] sm:h-[650px] md:h-[700px] border border-indigo-100/30 dark:border-indigo-900/30 shadow-xl relative overflow-visible overflow-all-visible"
            >
              {/* Elemen dekoratif yang lebih besar */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-500/10 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full"></div>

              {/* Tambahan elemen dekoratif untuk visual yang lebih kaya */}
              <div className="absolute top-1/4 right-10 w-16 h-16 bg-purple-500/10 rounded-full"></div>
              <div className="absolute bottom-1/3 left-10 w-24 h-24 bg-teal-500/10 rounded-full"></div>

              {/* Lanyard dengan interaksi yang tidak dibatasi container */}
              <div className="absolute inset-0 overflow-visible z-10">
                {/* Overlay transparan untuk area interaksi lebih luas */}
                <div
                  className="absolute -inset-[100px] z-0" // Lebih lebar dari sebelumnya (-inset-20)
                  style={{ pointerEvents: "none" }}
                ></div>

                <Lanyard
                  position={lanyardPosition as [number, number, number]}
                  gravity={lanyardGravity as [number, number, number]}
                  fov={22}
                />
              </div>
            </motion.div>
          </div>

          {/* About Text - sesuaikan margin untuk lanyard lebih besar */}
          <div className="lg:col-span-6 mt-16 lg:mt-48 px-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 inline-flex items-center">
                About{" "}
                <span className="text-indigo-600 dark:text-indigo-400 mx-2">
                  Me
                </span>
                <div className="h-1 w-10 bg-indigo-600 dark:bg-indigo-400 rounded-full ml-4"></div>
              </h2>

              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                I'm Wahyu Bagus Setiawan, a fullstack developer with a strong
                passion for building modern web and mobile applications. I
                specialize in technologies like Laravel, Flutter, and
                JavaScript, with a deep interest in frameworks such as React.js
                and Next.js to create high-performance and scalable apps.
              </p>

              <p className="text-gray-600 dark:text-gray-400 mb-8">
                With a background in Informatics Engineering and real-world
                project experience—from restaurant management systems to supply
                chain platforms—I aim to deliver seamless user experiences
                through clean code, efficient architecture, and responsive
                design. I believe that powerful digital products are built at
                the intersection of thoughtful UI/UX and robust functionality.
              </p>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {personalInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                      {info.icon}
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {info.label}:
                      </span>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {info.value}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Convert Google Drive view link to direct download link
                    const directDownloadUrl =
                      "https://drive.google.com/uc?export=download&id=17LNs_VB6-3ds55NnBFyAaHkrMbzgo9eg";

                    // Create temporary link element for download
                    const link = document.createElement("a");
                    link.href = directDownloadUrl;
                    link.download = "Wahyu_Bagus_Setiawan_CV.pdf"; // Suggested filename
                    link.target = "_blank";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Download CV
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="px-6 py-3 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-24 overflow-x-hidden">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Services I{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Offer</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg inline-block mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

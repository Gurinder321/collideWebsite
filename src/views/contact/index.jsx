import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/validation/contactForm";
import { useProfanityChecker } from "glin-profanity";
import { ImSpinner2 } from "react-icons/im";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 18 } },
};

const Subscribe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: "onSubmit",
  });

  const { result, checkText } = useProfanityChecker({
    languages: ["english"],
    customWords: [
      "Ashamed", "Bomb", "Die", "Disgusting", "Dumb", "Idiot",
      "Kill", "Loser", "Shame", "Slaughter", "Stupid", "Torture",
    ],
  });

  const handleTextChange = (e) => checkText(e.target.value);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const onSubmit = async (data) => {
    if (result?.containsProfanity) {
      alert("Please revise your message to remove inappropriate content.");
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      if (response.status === 200) {
        alert("Message sent successfully!");
      } else {
        alert("Failed to send the message. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 bg-transparent border ${
      hasError ? "border-red-500" : "border-gray-500"
    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
      hasError ? "focus:ring-red-500" : "focus:ring-[#d6d5db]"
    } rounded-sm transition-all duration-200 focus:border-[#d6d5db]`;

  return (
    <section ref={ref} id="contact" className="w-full sm:min-h-[90vh] bg-[#1f1e2c] p-6">
      <motion.div
        className="flex flex-col justify-between items-center"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="mb-8 py-6 sm:py-20 text-4xl sm:text-7xl font-thin italic font-metal text-gray-200"
          variants={fadeUp}
        >
          Get <span className="not-italic font-stix">In Touch.</span>
        </motion.h2>

        <div className="w-full max-w-screen-xl text-white flex flex-col sm:flex-row items-center lg:items-end justify-start gap-6">
          {/* Left Section */}
          <motion.div
            className="w-full md:w-2/5 h-full relative sm:bottom-8 flex flex-col text-center mb-8 lg:mb-0 space-y-6 sm:space-y-10"
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p
              className="text-6xl top-10 font-light italic text-[#d6d5db] font-allinpiska sm:text-9xl"
              variants={fadeUp}
            >
              Questions?
            </motion.p>
            <motion.p className="text-lg text-gray-300" variants={fadeUp}>
              SEND ME A MESSAGE OR CONTACT <br /> MY TEAM FOR BUSINESS INQUIRIES
            </motion.p>
            <motion.div className="space-y-2 sm:space-y-4" variants={fadeUp}>
              <p className="font-semibold text-gray-400">LITERARY AGENT:</p>
              <p>Jessica Watterson</p>
              <a href="mailto:jessica@dijkstraagency.com" className="text-[#d6d5db] underline hover:text-white transition-colors duration-200">
                jessica@dijkstraagency.com
              </a>
            </motion.div>
            <motion.div className="space-y-2 sm:space-y-4" variants={fadeUp}>
              <p className="font-semibold text-gray-400">SUBRIGHTS & LICENSING:</p>
              <p>Andrea Cavallaro</p>
              <a href="mailto:andrea@dijkstraagency.com" className="text-[#d6d5db] underline hover:text-white transition-colors duration-200">
                andrea@dijkstraagency.com
              </a>
            </motion.div>
          </motion.div>

          {/* Right Section (Form) */}
          <motion.div
            className="w-full md:w-1/2"
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <motion.div className="gap-1 w-full flex flex-col" variants={fadeUp}>
                <input
                  type="text"
                  placeholder="full name"
                  className={inputClass(errors.fullName)}
                  {...register("fullName")}
                />
                {errors?.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
                )}
              </motion.div>

              <motion.div className="w-full flex flex-col gap-1" variants={fadeUp}>
                <input
                  type="text"
                  placeholder="email address"
                  className={inputClass(errors.email)}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm">{errors.email?.message}</p>
                )}
              </motion.div>

              <motion.div className="w-full flex flex-col gap-1" variants={fadeUp}>
                <textarea
                  placeholder="message..."
                  rows="7"
                  className={inputClass(errors.message)}
                  {...register("message")}
                  onChange={handleTextChange}
                />
                {errors?.message && (
                  <p className="text-red-500 text-sm">{errors.message?.message}</p>
                )}
                {result?.containsProfanity && (
                  <p className="text-red-500 text-sm">
                    This message contains inappropriate content. Please revise.
                  </p>
                )}
              </motion.div>

              <motion.div variants={fadeUp}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 w-24 bg-transparent border border-gray-500 text-white font-semibold rounded-sm flex items-center justify-center hover:border-[#d6d5db] transition-colors duration-200"
                  whileHover={{ scale: 1.03, borderColor: '#d6d5db' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? (
                    <ImSpinner2 className="animate-spin text-white text-xl" />
                  ) : (
                    "SEND"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Subscribe;

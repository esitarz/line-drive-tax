"use client";

import { useSectionInView } from "@/lib/useSectionInView";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeoapyqv";

export interface ContactSectionProps {
  title: string;
  submitButtonText: string;
  officeAddress?: string;
  phoneNumber: string;
  emailAddress: string;
  onVisible?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  submitButtonText,
  officeAddress,
  phoneNumber,
  emailAddress,
  onVisible,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useSectionInView(onVisible);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Your message has been sent!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const errorData = await response.json();
        console.error("Form error:", errorData);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-5xl font-thin mb-8">{title}</h2>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {officeAddress && (
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-3">Address</h3>
              <p className="text-gray-600 dark:text-card-foreground/80">
                {officeAddress}
              </p>
            </div>
          )}
          {phoneNumber && (
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="text-gray-600 dark:text-card-foreground/80">
                {phoneNumber}
              </p>
            </div>
          )}
          {emailAddress && (
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-gray-600 dark:text-card-foreground/80">
                {emailAddress}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-card p-8 rounded-lg shadow-md">
          <div className="prose dark:prose-invert max-w-none mb-6"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-card-foreground mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-card-foreground mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-card-foreground mb-1"
              >
                Message
              </label>
              <Textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center border border-transparent transition-colors bg-secondary text-white hover:text-secondary rounded-md hover:bg-accent dark:hover:bg-secondary-300 font-medium h-10 sm:h-12 px-4 sm:px-8 sm:w-auto cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : submitButtonText}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

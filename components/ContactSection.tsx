"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MDXRemote } from "next-mdx-remote";
import { components } from "./MDXComponents";
import { toast } from "sonner";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeoapyqv";

export interface ContactSectionFrontmatter {
  title: string;
  submitButtonText: string;
  officeAddress: string;
  phoneNumber: string;
  emailAddress: string;
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | object
    | null
    | undefined;
}

export interface ContactSectionProps {
  contact: {
    frontmatter: ContactSectionFrontmatter;
    mdxSource: any;
  };
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-4xl font-bold mb-8">{contact.frontmatter.title}</h2>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {contact.frontmatter.officeAddress && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-3">Address</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {contact.frontmatter.officeAddress}
              </p>
            </div>
          )}
          {contact.frontmatter.phoneNumber && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {contact.frontmatter.phoneNumber}
              </p>
            </div>
          )}
          {contact.frontmatter.emailAddress && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex-1">
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {contact.frontmatter.emailAddress}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="prose dark:prose-invert max-w-none mb-6">
            <MDXRemote {...contact.mdxSource} components={components} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending..."
                : contact.frontmatter.submitButtonText}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

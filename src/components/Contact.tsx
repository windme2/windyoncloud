"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Contact component featuring contact links and a form.
 * Handles client-side state submission (e.g. to Formspree).
 */
export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Handle asynchronous form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formspreeEndpoint =
        process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
        "https://formspree.io/f/YOUR_FORM_ID";

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 relative bg-background bg-grid-pattern dark:bg-gray-950"
    >
      <div className="container">
        {/* Heading title - Clean solid text */}
        <h2 className="reveal text-3xl md:text-4xl font-bold mb-6 text-center text-slate-900 dark:text-white">
          Get in <span className="text-orange-500">Touch</span>
        </h2>
        <p className="reveal delay-100 text-lg text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Always open to collaborations, freelance opportunities, or a friendly
          chat about web development.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Links (Minimal list style, no boxes/borders) */}
          <div className="reveal delay-200 space-y-6 text-left">
            <h3 className="text-xl font-semibold mb-10 text-slate-900 dark:text-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <a
                href="mailto:intouch.crp@gmail.com"
                className="flex items-center space-x-4 group p-1 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                <div className="bg-rose-500 p-3 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Email
                  </p>
                  <p className="text-lg font-medium group-hover:text-rose-500 transition-colors">
                    intouch.crp@gmail.com
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/intouch-charoenphon-a89b21207/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 group p-1 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                <div className="bg-blue-600 p-3 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    LinkedIn
                  </p>
                  <p className="text-lg font-medium group-hover:text-blue-600 transition-colors">
                    linkedin.com/in/intouch-charoenphon
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/windme2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 group p-1 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                <div className="bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 p-3 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Github className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    GitHub
                  </p>
                  <p className="text-lg font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    github.com/windme2
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/withcrpn/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 group p-1 transition-all duration-300 hover:translate-x-1 cursor-pointer"
              >
                <div className="bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-3 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Instagram
                  </p>
                  <p className="text-lg font-medium group-hover:text-pink-500 transition-colors">
                    instagram.com/withcrpn
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Form (Clean styling) */}
          <div className="reveal delay-300">
            <form
              onSubmit={handleSubmit}
              className={cn(
                "space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800 shadow-md transition-all duration-300 text-left",
                submitStatus === "success" &&
                  "border-green-500 shadow-green-200/50 shadow-lg",
                submitStatus === "error" &&
                  "border-red-500 shadow-red-200/50 shadow-lg",
              )}
            >
              {/* Success/Error status message feedback */}
              {submitStatus !== "idle" && (
                <div
                  className={cn(
                    "p-3 rounded-lg text-sm font-medium transition-all duration-300",
                    submitStatus === "success" &&
                      "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30",
                    submitStatus === "error" &&
                      "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30",
                  )}
                >
                  {submitStatus === "success"
                    ? "✓ Message sent successfully!"
                    : "✗ Failed to send message. Please try again."}
                </div>
              )}

              {/* Name + Email fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Subject field */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                />
              </div>

              {/* Message textarea field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="min-h-32 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Submit button and tagline grouped together to fix spacing issue */}
              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white disabled:opacity-70 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] rounded-lg border-0 cursor-pointer"
                >
                  <span className={cn(isSubmitting && "animate-pulse")}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                </Button>
                <p className="text-center text-muted-foreground text-xs leading-relaxed">
                  Let’s create something great together.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

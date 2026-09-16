"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
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
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      console.error("NEXT_PUBLIC_FORMSPREE_ENDPOINT is not configured.");
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
      return;
    }

    setIsSubmitting(true);

    try {

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

  const links = [
    {
      label: "Email",
      value: "intouch.crp@gmail.com",
      href: "mailto:intouch.crp@gmail.com",
      icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "intouch-charoenphon",
      href: "https://linkedin.com/in/intouch-charoenphon-a89b21207/",
      icon: Linkedin,
    },
    {
      label: "GitHub",
      value: "windme2",
      href: "https://github.com/windme2",
      icon: Github,
    },
    {
      label: "Instagram",
      value: "withcrpn",
      href: "https://instagram.com/withcrpn/",
      icon: Instagram,
    },
  ];

  const fieldClass =
    "rounded-none border-0 border-b bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0";
  // foreground at 75% (not muted): the glass form sits on the purple lower sky at night
  const labelClass =
    "font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/75";

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 md:py-32">
      <div className="container max-w-7xl">
        <SectionHeading index="06" label="Contact" title="Get in" accent="touch" />

        <div className="grid gap-16 lg:grid-cols-12">
          {/* Links */}
          <div className="reveal delay-100 space-y-10 lg:col-span-5">
            <p className="max-w-sm font-display text-xl font-light leading-relaxed md:text-2xl">
              Open to collaborations and freelance work.
            </p>
            <ul className="border-t">
              {links.map(({ label, value, href, icon: Icon }) => (
                <li key={label} className="border-b">
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span className="flex items-center gap-4">
                      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary-ink" />
                      <span className={labelClass}>{label}</span>
                    </span>
                    <span className="text-sm transition-transform group-hover:translate-x-1">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="reveal delay-200 lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass space-y-8 rounded-3xl p-6 md:p-10">
              {submitStatus !== "idle" && (
                <div
                  role="status"
                  className={cn(
                    "border px-4 py-3 text-sm",
                    submitStatus === "success"
                      ? "border-emerald-400/50 text-emerald-300"
                      : "border-red-400/50 text-red-300",
                  )}
                >
                  {submitStatus === "success"
                    ? "Message sent successfully."
                    : "Failed to send message. Please try again."}
                </div>
              )}

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className={labelClass}>
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
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className={fieldClass}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project"
                  required
                  className={cn(fieldClass, "min-h-32 resize-none")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex cursor-pointer items-center gap-5 disabled:opacity-60"
              >
                <span className="glow-btn grid h-16 w-16 place-items-center rounded-full border border-white/60 transition-colors duration-300 group-hover:border-primary group-hover:text-primary-ink group-disabled:border-white/60 group-disabled:text-current">
                  <ArrowUpRight size={20} strokeWidth={1.25} />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium uppercase tracking-[0.3em]",
                    isSubmitting && "animate-pulse",
                  )}
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

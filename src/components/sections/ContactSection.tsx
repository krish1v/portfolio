import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Github, Linkedin, Twitter, Instagram, Mail, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export function ContactSection() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_6h8teqc",
        "template_yj26vsr",
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
          to_email: "khatrikrishiv@gmail.com",
        },
        "0ZVvpJIoY9GMc830y"
      );
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      toast({
        title: "Message sent",
        description: "Thanks for reaching out — I'll get back to you soon.",
        duration: 5000,
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast({
        title: "Couldn't send that",
        description: "Please try again, or email me directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "krishivkhatri@gatech.edu", href: "mailto:krishivkhatri@gatech.edu" },
    { icon: Mail, label: "khatrikrishiv@gmail.com", href: "mailto:khatrikrishiv@gmail.com" },
    { icon: Phone, label: "+1 (470) 313-5969", href: "tel:+14703135969" },
  ];

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/krishiv-khatri" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/krishiv-khatri" },
    { icon: Twitter, label: "X", href: "https://x.com/krishivkhatri" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/_krishiv__" },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-24 border-t border-border/20">
      <div className="section relative">
        <h2 className="section-title">Get In Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-12 items-start">
          {/* Reach out */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Reach out</h3>

            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors group-hover:border-foreground/40">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3">Find me online</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-foreground hover:text-background hover:border-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Send a message</h4>
              {isSubmitted ? (
                <div className="rounded-xl border border-border bg-muted/40 p-5">
                  <p className="font-medium">Thanks for reaching out.</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    I'll get back to you as soon as I can.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    minLength={2}
                  />
                  <Input
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                  <Textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={4}
                    required
                    minLength={10}
                    className="resize-none"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending…" : "Send message"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Schedule a call</h3>
              <Button asChild variant="outline" size="sm">
                <a href="https://cal.com/krishivkhatri" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Open in new tab
                </a>
              </Button>
            </div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <iframe
                src="https://cal.com/krishivkhatri?embed=true&theme=light"
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule a call with Krishiv"
                className="w-full"
                style={{ minHeight: "600px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

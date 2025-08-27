import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export function ContactSection() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
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
        'service_6h8teqc', // Service ID
        'template_yj26vsr', // Template ID
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
          to_email: 'krishivkhatri2409@gmail.com',
        },
        '0ZVvpJIoY9GMc830y' // Public Key
      );

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
        duration: 5000,
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-24 border-t border-border/20">
      <div className="section relative md:scale-[0.94] md:origin-top">
        <h2 className="section-title">Get In Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Schedule a Call</h3>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button asChild variant="outline" size="sm">
                  <a 
                    href="https://cal.com/krishivkhatri" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Open in new tab
                  </a>
                </Button>
              </motion.div>
            </div>
            <div className="bg-card border rounded-xl overflow-hidden">
              <iframe
                src="https://cal.com/krishivkhatri?embed=true"
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule a call with Krishiv"
                className="w-full"
                style={{ minHeight: '600px' }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Other Ways to Connect</h3>
            
            <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-3">Contact</h4>
                  <div className="space-y-2">
                    <a
                      href="mailto:krishivkhatri@gatech.edu"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      krishivkhatri@gatech.edu
                    </a>
                    <a
                      href="mailto:krishivkhatri2409@gmail.com"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      krishivkhatri2409@gmail.com
                    </a>
                    <a
                      href="tel:+17709915129"
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +1 (470) 313-5969
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Social</h4>
                  <div className="flex gap-4">
                    <motion.a
                      href="https://github.com/Krishiv2409" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ y: -1, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/krishiv-khatri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ y: -1, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href="https://x.com/krishivkhatri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ y: -1, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href="https://instagram.com/_krishiv__"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ y: -1, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Send a Message</h4>
                  {isSubmitted ? (
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="font-medium">Thanks for reaching out!</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        I'll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        minLength={2}
                        className="font-sans"
                      />
                      <Input
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="font-sans"
                      />
                      <Textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="What's on your mind?"
                        rows={4}
                        required
                        minLength={10}
                        className="font-sans resize-none"
                      />
                      <motion.div
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button 
                          type="submit" 
                          variant="outline"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

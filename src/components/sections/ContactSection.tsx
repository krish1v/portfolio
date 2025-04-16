import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";

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
    <section id="contact" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple/5 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(124,58,237,0.05),transparent_50%)]" />
      </div>
      <div className="section relative">
        <h2 className="section-title">Get In Touch</h2>
        <p className="text-muted-foreground max-w-2xl mt-4">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div>
            <div className="card p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MessageSquare className="text-highlight h-5 w-5" />
                Send me a message
              </h3>

              {isSubmitted ? (
                <div className="bg-highlight/10 border border-highlight/20 rounded-lg p-4 text-center animate-fade-in">
                  <p className="font-medium text-lg">Thanks for reaching out!</p>
                  <p className="text-muted-foreground mt-1">
                    I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="your name"
                      required
                      minLength={2}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="What's on your mind?"
                      rows={5}
                      required
                      minLength={10}
                      className="w-full"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    variant="accent"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="mailto:krishivkhatri@gatech.edu"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-highlight/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-highlight" />
                  </div>
                  <span>krishivkhatri@gatech.edu</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Social Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-highlight/10 flex items-center justify-center">
                    <Github className="h-5 w-5 text-highlight" />
                  </div>
                  <span>GitHub</span>
                </a>
                
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-highlight/10 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-highlight" />
                  </div>
                  <span>LinkedIn</span>
                </a>
                
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-highlight/10 flex items-center justify-center">
                    <Twitter className="h-5 w-5 text-highlight" />
                  </div>
                  <span>Twitter</span>
                </a>

                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-highlight/10 flex items-center justify-center">
                    <Instagram className="h-5 w-5 text-highlight" />
                  </div>
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            <div className="card p-6 bg-highlight/5 border-highlight/20">
              <h3 className="text-lg font-semibold mb-3">Availability</h3>
              <p className="text-muted-foreground">
                I'm currently open to freelance projects, collaborations, and full-time opportunities. Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

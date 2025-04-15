
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter } from "lucide-react";

export function ContactSection() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="section">
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
                      placeholder="Your name"
                      required
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
                      placeholder="How can I help you?"
                      rows={5}
                      required
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
                  href="mailto:hello@example.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-highlight/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-highlight" />
                  </div>
                  <span>hello@example.com</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Social Links</h3>
              <div className="space-y-4">
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

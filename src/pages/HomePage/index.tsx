import { Button, Card } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css"
export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3}
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center px-4 py-36 text-center mx-auto bg-background text-foreground">
      {/* Hero Section */}
      <header className="px-4 py-16 md:py-24 w-full max-w-4xl mx-auto">
        <div className="w-full flex flex-col items-start space-y-12">
          {/* Headline */}
          <div className="text-left w-full">
            <span
              aria-hidden="true"
              className="inline-flex flex-wrap gap-2 text-4xl md:text-5xl font-bold tracking-tighter"
            >
              { ["Streamlining", "Processes", "the", "Modern", "Way"].map(
                (word, index) => (
                  <span
                    key={index}
                    className="inline-block animate-[fadeInUp_0.5s_ease-in-out_forwards] opacity-0 translate-y-6"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {word}
                  </span>
                )
              )}
            </span>
          </div>
          {/* Subheading */}
          <p className="text-lg md:text-xl font-medium text-muted-foreground animate-fade-in [animation-delay:0.6s] opacity-0">
            Smarter Retail Tracking
          </p>
          {/* Buttons */}
          <div className="flex gap-4 animate-fade-in [animation-delay:0.7s] opacity-0">
            <Link
              to="/login"
              className="px-5 py-2 bg-foreground text-background rounded-md hover:bg-background hover:text-foreground border border-foreground transition-all duration-300 font-medium text-sm"
            >
              Get Started
            </Link>
            <a
              href="https://linear.app/agents"
              className="px-5 py-2 text-foreground border border-foreground rounded-md hover:bg-foreground hover:text-background transition-all duration-300 font-medium text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Log in →
            </a>
          </div>
        </div>
      </header>
      <img
        ref={imgRef}
        src="/course-explainer.avif"
        alt="Course Explainer"
        className={`w-full max-w-4xl rounded-lg shadow-md mb-16 transform transition-opacity duration-1000 ease-in-out ${isVisible ? "opacity-100 translate-y-0 animate-fade-in" : "opacity-0 translate-y-6"} bg-background "`}
      />
      {/* How It Works */}
      <section className="mb-16 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-8 text-foreground">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          { [
            { title: "1. Take a Shelf Photo", desc: "Store managers snap a picture of the ANS product shelf." },
            { title: "2. AI SKU Detection", desc: "Our AI detects and counts each visible ANS SKU." },
            { title: "3. Analyze Instantly", desc: "View real-time analytics on your personalized dashboard." }
          ].map((step, i) => (
            <Card key={i} className="border border-foreground bg-background p-6">
              <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>
      {/* Why Faceable? */}
      <section className="mb-16 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-8 text-foreground">Why Faceable?</h2>
        <ul className="space-y-4 text-left text-sm text-muted-foreground list-disc list-inside">
          <li>Reduces time spent on manual shelf checks</li>
          <li>Provides real-time product visibility</li>
          <li>Helps make smarter merchandising decisions</li>
        </ul>
      </section>
      {/* Final CTA */}
      <section className="w-full max-w-4xl text-center">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Ready to streamline shelf audits?
        </h2>
        <Link to="/upload">
          <Button className="px-8 py-4 text-base bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all duration-300">
            Start Now
          </Button>
        </Link>
      </section>
    </main>
  );
}

import React, { memo } from "react";
import faqs from "../data/faq.json";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const { user } = useUser();
  const userRole = user?.unsafeMetadata?.role;

  const renderButton = (url, text, variant) => (
    <Link to={url}>
      <Button variant={variant} size="xl">
        {text}
      </Button>
    </Link>
  );

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and get{" "}
            <img src="/logo.png" alt="logo" className="h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      <div className="flex gap-6 justify-center">
        {userRole ? (
          renderButton(
            userRole === "candidate" ? "/jobs" : "/post-job",
            userRole === "candidate" ? "View all Jobs" : "Post a Job",
            userRole === "candidate" ? "blue" : "destructive"
          )
        ) : (
          <>
            {renderButton("/jobs", "Find Jobs", "blue")}
            {renderButton(
              userRole === "candidate" ? "/jobs" : "/post-job",
              userRole === "candidate" ? "View all Jobs" : "Post a Job",
              "destructive"
            )}
          </>
        )}
      </div>

      {/* Carousel */}
      <Carousel plugins={[Autoplay({ delay: 1500 })]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Banner */}
      <img src="/banner.jpeg" alt="banner" className="w-full" />

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            id: 1,
            title: "For Job Seekers",
            content:
              "Search and apply for jobs, get matched with the right job and more.",
          },
          {
            id: 2,
            title: "For Employers",
            content:
              "Post jobs, manage applications and find the best candidates.",
          },
        ].map(({ id, title, content }) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{content}</CardContent>
          </Card>
        ))}
      </section>

      {/* FAQ */}
      <Accordion type="single" collapsible>
        {faqs.map(({ id, question, answer }) => (
          <AccordionItem key={id} value={`item-${id}`}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default memo(LandingPage);

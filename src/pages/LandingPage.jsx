import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2  sm:gap-6">
            and get{" "}
            <img src="/logo.png" alt="logo" className="h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 trext-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        {[
          { id: 1, url: "/jobs", text: "Find Jobs", variant: "blue" },
          {
            id: 2,
            url: "/post-job",
            text: "Post a Job",
            variant: "destructive",
          },
        ].map((i) => (
          <Link key={i.id} to={i.url}>
            <Button variant={i.variant} size="xl">
              {i.text}
            </Button>
          </Link>
        ))}
      </div>
      {/* Carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        className="w-full py-10"
      >
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
      <img src="/banner.jpeg" className="w-full" />

      {/* Cards Section  */}
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
          <AccordionItem key={id} value="item-1">
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;


import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { ArrowRight, Clock, Medal, BarChart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 flex flex-col items-center text-center">
        <div className="container max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
            Elegant Sudoku Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Challenge Your Mind with Beautiful Sudoku
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Experience Sudoku like never before with our elegantly designed puzzles,
            intuitive controls, and a minimalist interface that lets you focus on the game.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Link to="/game">
              <Button className="px-8 py-3 text-lg font-medium">
                Play Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="px-8 py-3 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-accent/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Designed for Focus</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our clean interface and intuitive controls help you focus on solving puzzles
              without distractions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-xl transition-all hover:shadow-md">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground">
                Keep track of your solving time and see how you improve with each puzzle.
              </p>
            </div>

            <div className="glass p-6 rounded-xl transition-all hover:shadow-md">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Medal className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Multiple Difficulties</h3>
              <p className="text-muted-foreground">
                From easy to expert, choose the level that matches your skills and challenge yourself.
              </p>
            </div>

            <div className="glass p-6 rounded-xl transition-all hover:shadow-md">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Helpful Features</h3>
              <p className="text-muted-foreground">
                Use notes, hints, and mistake tracking to help you solve even the most challenging puzzles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Challenge Yourself?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start playing now and experience the elegance of our Sudoku app. Train your brain with puzzles
            designed for the perfect balance of challenge and enjoyment.
          </p>
          <Link to="/game">
            <Button className="px-8 py-3 text-lg">
              Start Playing <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

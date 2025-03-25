
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { BookOpen, LayoutGrid, Brain, BarChart4 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 animate-fade-in">About Sudoku</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              A minimalist Sudoku experience designed with focus and elegance in mind.
            </p>
          </div>
          
          <div className="glass p-8 rounded-xl mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4">What is Sudoku?</h2>
            <p className="mb-4">
              Sudoku is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contain all of the digits from 1 to 9.
            </p>
            <p>
              The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution. Completed games are always a type of Latin square with an additional constraint on the contents of individual regions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass p-8 rounded-xl animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">How to Play</h3>
              <p className="text-muted-foreground mb-4">
                Fill in the grid so that every row, column, and 3×3 box contains the digits 1 through 9 only once.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Each row must contain the digits 1-9 without repetition</li>
                <li>Each column must contain the digits 1-9 without repetition</li>
                <li>Each 3×3 box must contain the digits 1-9 without repetition</li>
              </ul>
            </div>
            
            <div className="glass p-8 rounded-xl animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Game Features</h3>
              <p className="text-muted-foreground mb-4">
                Our Sudoku app comes with several features to enhance your puzzle-solving experience:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Four difficulty levels from Easy to Expert</li>
                <li>Notes mode for penciling in possibilities</li>
                <li>Hint system for when you're stuck</li>
                <li>Error tracking to help you learn</li>
                <li>Elegant design focused on the gameplay</li>
              </ul>
            </div>
          </div>
          
          <div className="glass p-8 rounded-xl mb-12 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-bold mb-4">Benefits of Playing Sudoku</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-start">
                <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Cognitive Exercise</h3>
                  <p className="text-muted-foreground">
                    Improves memory, concentration, and mental clarity through regular problem-solving.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                  <BarChart4 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Reduces Stress</h3>
                  <p className="text-muted-foreground">
                    The focused nature of Sudoku can be meditative and help reduce anxiety.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-bold mb-6">Ready to Start Playing?</h2>
            <Link to="/game">
              <Button className="px-8 py-3">
                Play Sudoku Now
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

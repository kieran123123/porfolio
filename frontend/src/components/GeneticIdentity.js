import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, RefreshCw } from 'lucide-react';

const GeneticIdentity = () => {
  const [userInput, setUserInput] = useState("Kieran Smith");
  const [target, setTarget] = useState("Kieran Smith");
  const [bestMatch, setBestMatch] = useState("");
  const [generation, setGeneration] = useState(0);
  const [fitness, setFitness] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const popSize = 100;
  const mutationRate = 0.02;
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789!@#$%^&*()_+-=";

  const populationRef = useRef([]);
  const requestRef = useRef();

  const createRandomStr = useCallback((len) => {
    return Array.from({ length: len }, () => 
      characters[Math.floor(Math.random() * characters.length)]
    ).join('');
  }, [characters]);

  const getFitness = useCallback((genes, targetStr) => {
    let matches = 0;
    for (let i = 0; i < targetStr.length; i++) {
      if (genes[i] === targetStr[i]) matches++;
    }
    return matches / targetStr.length;
  }, []);

  const evolve = useCallback(() => {
    populationRef.current.sort((a, b) => getFitness(b, target) - getFitness(a, target));
    
    const best = populationRef.current[0];
    const currentFitness = getFitness(best, target);

    setBestMatch(best);
    setFitness(currentFitness);
    setGeneration(prev => prev + 1);

    if (best === target) {
      setIsRunning(false);
      return;
    }

    let nextGen = [best]; 
    while (nextGen.length < popSize) {
      const p1 = populationRef.current[Math.floor(Math.random() * 15)];
      const p2 = populationRef.current[Math.floor(Math.random() * 15)];
      const pivot = Math.floor(Math.random() * target.length);
      let child = p1.substring(0, pivot) + p2.substring(pivot);
      child = child.split('').map(c => 
        Math.random() < mutationRate ? characters[Math.floor(Math.random() * characters.length)] : c
      ).join('');
      nextGen.push(child);
    }

    populationRef.current = nextGen;
    if (isRunning) requestRef.current = requestAnimationFrame(evolve);
  }, [isRunning, target, getFitness, characters]);

  useEffect(() => {
    if (isRunning) requestRef.current = requestAnimationFrame(evolve);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, evolve]);

  const handleStart = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setTarget(userInput);
    setGeneration(0);
    setBestMatch("");
    populationRef.current = Array.from({ length: popSize }, () => createRandomStr(userInput.length));
    setIsRunning(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-mono flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-400 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">Genetic Search Engine</h1>
        <p className="text-slate-500 mb-8">Input a string to see the algorithm evolve characters through natural selection.</p>

        {/* INPUT BOX */}
        <form onSubmit={handleStart} className="flex gap-4 mb-12">
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter target sentence..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
            disabled={isRunning}
          />
          <button 
            type="submit"
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all"
          >
            {isRunning ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
            {isRunning ? "Evolving" : "Run"}
          </button>
        </form>

        {/* DISPLAY PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 shadow-2xl">
          <div className="text-sm text-slate-500 uppercase tracking-widest mb-4">Current Best Candidate</div>
          <div className="text-4xl md:text-6xl font-bold text-green-400 break-all mb-8 min-h-[80px]">
            {bestMatch || "READY_"}
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-slate-800 pt-8">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Generation</div>
              <div className="text-2xl text-white">{generation}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Fitness Score</div>
              <div className="text-2xl text-white">{(fitness * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneticIdentity;
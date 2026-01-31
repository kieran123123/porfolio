import time
from logic import EvolutionEngine

def main():
    target_phrase = "tillywillymobile"
    engine = EvolutionEngine(target=target_phrase, population_size=200, mutation_rate=0.01)
    
    print(f"Starting evolution for: '{target_phrase}'\n")
    
    start_time = time.time()
    
    while True:
        best = engine.run_generation()
        
        print(f"Gen {engine.generation:4} | Best: '{best.genes}' | Fitness: {best.fitness:.2%}")
        
        if best.genes == target_phrase:
            duration = time.time() - start_time
            print(f"\nTarget reached in {engine.generation} generations!")
            print(f"Total time: {duration:.2f} seconds")
            break

if __name__ == "__main__":
    main()
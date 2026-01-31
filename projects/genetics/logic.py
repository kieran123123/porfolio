import random
import string

class Chromosome:
    """Represents a single individual (a string) in the population."""
    def __init__(self, target_length, genes=None):
        # If no genes are provided, initialize with random characters
        self.genes = genes or ''.join(random.choices(string.ascii_letters + " ", k=target_length))
        self.fitness = 0

    def calculate_fitness(self, target):
        """Calculates the percentage of characters that match the target at the correct index."""
        matches = sum(1 for a, b in zip(self.genes, target) if a == b)
        self.fitness = matches / len(target)
        return self.fitness

class EvolutionEngine:
    """Manages the population and the evolutionary lifecycle."""
    def __init__(self, target, population_size=100, mutation_rate=0.01):
        self.target = target
        self.pop_size = population_size
        self.mutation_rate = mutation_rate
        self.generation = 0
        self.population = [Chromosome(len(target)) for _ in range(population_size)]
        self.best_individual = None

    def run_generation(self):
        """Executes one cycle of the genetic algorithm."""
        # 1. Score population
        for individual in self.population:
            individual.calculate_fitness(self.target)

        # 2. Sort by fitness (descending)
        self.population.sort(key=lambda x: x.fitness, reverse=True)
        self.best_individual = self.population[0]

        # 3. Create next generation
        new_gen = []
        
        # Elitism: Keep the top 5% of the best performers automatically
        elite_count = max(1, int(self.pop_size * 0.05))
        new_gen.extend(self.population[:elite_count])

        # 4. Fill the rest of the population through Crossover and Mutation
        while len(new_gen) < self.pop_size:
            parent_a = self._select_parent()
            parent_b = self._select_parent()
            child_genes = self._crossover(parent_a, parent_b)
            mutated_genes = self._mutate(child_genes)
            new_gen.append(Chromosome(len(self.target), mutated_genes))

        self.population = new_gen
        self.generation += 1
        return self.best_individual

    def _select_parent(self):
        """Simple tournament selection: pick the best out of 5 random individuals."""
        tournament = random.sample(self.population[:50], 5) # Sample from top half
        return max(tournament, key=lambda x: x.fitness)

    def _crossover(self, p1, p2):
        """Single-point crossover: swaps genes at a random pivot point."""
        pivot = random.randint(0, len(self.target))
        return p1.genes[:pivot] + p2.genes[pivot:]

    def _mutate(self, genes):
        """Randomly flips characters based on the mutation rate."""
        gene_list = list(genes)
        for i in range(len(gene_list)):
            if random.random() < self.mutation_rate:
                gene_list[i] = random.choice(string.ascii_letters + " ")
        return "".join(gene_list)
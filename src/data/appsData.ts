/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MathApp } from '../types';

export const mathApps: MathApp[] = [
  // --- ALGEBRA ---
  {
    id: 'domain-range',
    title: 'Domain & Range Master',
    url: 'https://domainrange.netlify.app/',
    category: 'algebra',
    description: 'Master interval notation and identify restrictions on curves with this visual graph investigator.',
    difficulty: 'Intermediate',
    topics: ['Interval Notation', 'Functions', 'Asymptotes', 'Inequalities']
  },
  {
    id: 'parent-function-lab',
    title: 'Parent Function Lab',
    url: 'https://parentfunctionexploration.netlify.app/',
    category: 'algebra',
    description: 'Deconstruct fundamental curves like linear, quadratic, cubic, exponential, and rational families.',
    difficulty: 'Introductory',
    topics: ['Graph Families', 'Basic Curves', 'Functions']
  },
  {
    id: 'visual-function-lab',
    title: 'FUNCTIONLAB Visual Algebra Explorations',
    url: 'https://visualfunctionlab.netlify.app/',
    category: 'algebra',
    description: 'Visualize interactive algebraic transformations, functional mappings, and geometric coordinates.',
    difficulty: 'Intermediate',
    topics: ['Visual Algebra', 'Coordinate Geometry', 'Mappings']
  },
  {
    id: 'name-the-function',
    title: 'Name the Function',
    url: 'https://parentfunction.netlify.app/',
    category: 'algebra',
    description: 'Identify parents and structural parameters of a graph in this gamified function matching challenge.',
    difficulty: 'Introductory',
    topics: ['Curve Identification', 'Flashcards', 'Active Recall']
  },
  {
    id: 'function-morph',
    title: 'Function Morph',
    url: 'https://functionmorph.netlify.app/',
    category: 'algebra',
    description: 'Understand how changing parameters like stretch, shrink, horizontal, and vertical shifts morph active graphs.',
    difficulty: 'Intermediate',
    topics: ['Transformations', 'Scaling', 'Graph Shifts']
  },
  {
    id: 'inequality-explorer',
    title: 'Inequality Explorer',
    url: 'https://inequalitynotation.netlify.app/',
    category: 'algebra',
    description: 'Map inequalities and critical boundary points dynamically onto 1D and 2D coordinate environments.',
    difficulty: 'Introductory',
    topics: ['Inequalities', 'Boundary Points', 'Number Lines']
  },
  {
    id: 'polynomial-behaviors',
    title: 'Polynomial Behaviors Interactive Tool',
    url: 'https://polynomialbehaviors.netlify.app/',
    category: 'algebra',
    description: 'Interactive tool designed to help students visualize and explore the various behaviors of polynomial functions.',
    difficulty: 'Intermediate',
    topics: ['End Behavior', 'Zeros & Multiplicity', 'Local Extrema', 'Turning Points']
  },
  {
    id: 'quadratic-formula',
    title: 'Quadratic Formula Explorer',
    url: 'https://quadraticformulaexplorer.netlify.app/',
    category: 'algebra',
    description: 'Manipulate constants A, B, and C to observe real vs. complex roots on the complex grid and tracking vertex shifts.',
    difficulty: 'Introductory',
    topics: ['Discriminant', 'Quadratic Roots', 'Vertex Formula']
  },
  {
    id: 'quadratic-solver',
    title: 'Quadratic Application Solver',
    url: 'https://quadraticapplicationsolver.netlify.app/',
    category: 'algebra',
    description: 'Solve real-world word problems using quadratic formulas, modeling project trajectories and geometric boundaries.',
    difficulty: 'Intermediate',
    topics: ['Word Problems', 'Optimization', 'Projectile Motion']
  },
  {
    id: 'increasing-decreasing',
    title: 'Increasing Decreasing Extrema Exploration',
    url: 'https://increasingdecreatingexplorer.netlify.app/',
    category: 'algebra',
    description: 'Interact with intervals of increase, decrease, global/local heights, and turning points.',
    difficulty: 'Intermediate',
    topics: ['Extrema', 'Interval Analysis', 'Local Maximums']
  },
  {
    id: 'factoring-grouping',
    title: 'Factoring By Grouping',
    url: 'https://factoringbygrouping.netlify.app/',
    category: 'algebra',
    description: 'Learn step-by-step factoring by splitting middle terms and grouping pairs of polynomials.',
    difficulty: 'Introductory',
    topics: ['Polynomial Factoring', 'Step-by-Step Solver', 'Algebra Rules']
  },
  {
    id: 'log-rules',
    title: 'Log Rules',
    url: 'https://logrules.netlify.app/',
    category: 'algebra',
    description: 'Investigate logarithmic properties including the product, quotient, power, and change-of-base rules.',
    difficulty: 'Intermediate',
    topics: ['Logarithms', 'Log Expansion', 'Base Properties']
  },
  {
    id: 'mental-log-quest',
    title: 'Mental Math Log Quest',
    url: 'https://logarithmicmaster.netlify.app/',
    category: 'algebra',
    description: 'Train your brain with quick evaluation rounds of logarithmic bases, exponential relations, and values.',
    difficulty: 'Introductory',
    topics: ['Mental Math', 'Log Equations', 'Arithmetic Speed']
  },

  // --- TRIGONOMETRY ---
  {
    id: 'unit-circle-explorer',
    title: 'Unit Circle Explorer',
    url: 'https://unitcircleapp.netlify.app/',
    category: 'trig',
    description: 'Trace circular motion and find trigonometric coordinates across degree, radian, and (x, y) projections.',
    difficulty: 'Introductory',
    topics: ['Unit Circle', 'Sine & Cosine', 'Radian Degrees']
  },
  {
    id: 'coterminal-angles',
    title: 'Coterminal Angles',
    url: 'https://coterminalunitcircle.netlify.app/',
    category: 'trig',
    description: 'Explore angles that terminate in the same ray position using clockwise and counter-clockwise rotations.',
    difficulty: 'Introductory',
    topics: ['Coterminal', 'Angle Rotation', 'Periodic Nature']
  },
  {
    id: 'special-triangles',
    title: 'Unit Circle Special Triangles',
    url: 'https://unitcirclespectriangles.netlify.app/',
    category: 'trig',
    description: 'Embed 30-60-90 and 45-45-90 triangles inside standard cartesian angles to find unit circle coordinates.',
    difficulty: 'Intermediate',
    topics: ['Special Right Triangles', 'Trig Functions', 'Radical Geometry']
  },
  // Built-in Trigonometry activities that had no external Netlify links:
  {
    id: 'inverse-trig-master',
    title: 'Inverse Trig Master',
    category: 'trig',
    description: 'Visualize custom domain restrictions and solve principal values for arcsin, arccos, and arctan in real-time.',
    isBuiltIn: true,
    builtInKey: 'inverse-trig',
    difficulty: 'Intermediate',
    topics: ['Arcsine/Arccosine', 'Restricted Domains', 'Principal Values']
  },
  {
    id: 'six-trig-values',
    title: '6 Trig Values Explorer',
    category: 'trig',
    description: 'Discover sin, cos, tan, csc, sec, and cot values on any custom coordinate ray with exact radical steps.',
    isBuiltIn: true,
    builtInKey: 'six-trig-values',
    difficulty: 'Intermediate',
    topics: ['Fundamental Ratios', 'Reciprocal Functions', 'Reference Angles']
  },
  {
    id: 'radian-degree-converter',
    title: 'Radian Degree Converter',
    category: 'trig',
    description: 'Interactive conversion dial with visual pi-fraction step guides and standard conversion calculations.',
    isBuiltIn: true,
    builtInKey: 'radian-degree',
    difficulty: 'Introductory',
    topics: ['Angle Conversion', 'Radians & Degrees', 'Fraction Reductions']
  },

  // --- CALCULUS ---
  {
    id: 'rate-of-change',
    title: 'Rate of Change Explorer',
    url: 'https://rateofchangeexplorer.netlify.app/',
    category: 'calculus',
    description: 'Observe the visual transformation of average rate secant lines as they collapse into tangent line derivatives.',
    difficulty: 'Advanced',
    topics: ['Limits', 'Secant & Tangent', 'Instantaneous Rate']
  },
  {
    id: 'power-rule',
    title: 'Power Rule Interactive - Calculus B4 Calculus',
    url: 'https://powerruleinteractive.netlify.app/',
    category: 'calculus',
    description: 'Uncover rates of polynomial growth and investigate power derivatives through graphic verification.',
    difficulty: 'Intermediate',
    topics: ['Derivatives', 'Power Rule', 'Polynomials']
  }
];

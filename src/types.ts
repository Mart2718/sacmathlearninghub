/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MathCategory = 'algebra' | 'trig' | 'calculus';

export interface MathApp {
  id: string;
  title: string;
  url?: string;
  category: MathCategory;
  description: string;
  isBuiltIn?: boolean;
  builtInKey?: 'radian-degree' | 'six-trig-values' | 'inverse-trig';
  difficulty?: 'Introductory' | 'Intermediate' | 'Advanced';
  topics: string[];
}

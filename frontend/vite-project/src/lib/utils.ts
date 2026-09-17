import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function getAnimalLabel(animal: string): string {
  const labels: Record<string, string> = {
    dog: 'Cães',
    cat: 'Gatos',
    bird: 'Pássaros',
    fish: 'Peixes',
    rodent: 'Roedores',
    all: 'Todos',
  }
  return labels[animal] || animal
}

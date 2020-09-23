export function money(value?: number) {
  return value
    ? Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      }).format(value)
    : NaN;
}

export const isPhone = (value: unknown): boolean =>
  typeof value === 'string' && /^998(33|50|77|88|90|91|93|94|95|97|98|99)\d{7}$/.test(value)

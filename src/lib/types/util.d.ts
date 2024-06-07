type RequiredFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] }

type OptionalFields<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] }

export type { RequiredFields, OptionalFields }

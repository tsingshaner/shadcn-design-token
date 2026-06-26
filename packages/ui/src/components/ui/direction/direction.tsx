import { DirectionProvider as DirectionPrimitive, useDirection } from '@base-ui/react/direction-provider'

type DirectionProviderProps = DirectionPrimitive.Props

const DirectionProvider = (props: DirectionProviderProps) => <DirectionPrimitive {...props} />

export type { DirectionProviderProps }
export { DirectionProvider, useDirection }

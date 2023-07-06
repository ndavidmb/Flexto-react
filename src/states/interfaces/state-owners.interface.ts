export interface StateOwner {
  owner: string
  states: {
    stateId: string
    currentState: string
  }[]
}

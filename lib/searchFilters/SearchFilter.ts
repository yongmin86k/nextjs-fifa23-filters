import { orderBy } from 'lodash'
import { IPlayer } from '../players'

export class SearchFilter {
  private playerData: IPlayer[] = []

  hideLoan?: boolean

  min?: number

  max?: number

  orderBy: Map<keyof IPlayer, 'asc' | 'desc'> = new Map([
    ['rating', 'desc'],
    ['playerName', 'asc'],
  ])

  orderPriority = new Set(['rating', 'playerName'])

  setPlayerData = (playerData: IPlayer[]) => {
    this.playerData = playerData
  }

  toggleLoan = (hideLoan: boolean) => {
    this.hideLoan = hideLoan
  }

  toggleOrderBy = (key: keyof IPlayer) => {
    const current = this.orderBy.get(key)

    if (!current) {
      this.orderBy.set(key, 'desc')

      this.orderPriority.add(key)
    } else if (current === 'desc') {
      this.orderBy.set(key, 'asc')
      this.orderPriority.delete(key)
      this.orderPriority.add(key)
    } else {
      this.orderBy.delete(key)

      this.orderPriority.delete(key)
    }
  }

  showOrderIcon = (key: keyof IPlayer): string => {
    const value = this.orderBy.get(key)

    switch (value) {
      case 'asc':
        return '↑'
      case 'desc':
        return '↓'
      default:
        return ''
    }
  }

  private filterLoan = (data: IPlayer[]) => {
    if (this.hideLoan) {
      return data.filter((player) => !player.loans)
    }

    return data
  }

  private filterMin = (data: IPlayer[]) => {
    if (this.min) {
      return data.filter((player) => player.rating >= this.min)
    }

    return data
  }

  private filterMax = (data: IPlayer[]) => {
    if (this.max) {
      return data.filter((player) => player.rating <= this.max)
    }

    return data
  }

  private get filteredPlayers(): IPlayer[] {
    const filters = [
      this.filterLoan,
      this.filterMin,
      this.filterMax,
    ]

    return filters.reduce((acc, fn) => fn(acc), this.playerData)
  }

  get orderedPlayers(): IPlayer[] {
    if (this.orderPriority.size > 0) {
      const priority = Array.from(this.orderPriority)
      const values = priority.map((key) => this.orderBy.get(key as keyof IPlayer))

      // TODO: League, team, nation is an object...
      return orderBy(this.filteredPlayers, priority, values) as IPlayer[]
    }

    return this.filteredPlayers
  }
}

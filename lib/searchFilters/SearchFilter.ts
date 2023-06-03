import { groupBy, orderBy, sortBy } from 'lodash'
import { IPlayer } from '../players'

export class SearchFilter {
  private playerData: IPlayer[] = []

  private mappedPlayerData: Map<number, IPlayer> = new Map()

  hideLoan?: boolean

  min?: number

  max?: number

  orderBy: Map<keyof IPlayer, 'asc' | 'desc'> = new Map([
    ['rating', 'desc'],
    ['playerName', 'asc'],
  ])

  orderPriority = new Set(['rating', 'playerName'])

  private mapPlayerData = (playerData: IPlayer[]) => {
    playerData.forEach((player) => {
      this.mappedPlayerData.set(player.id, player)
    })
  }

  setPlayerData = (playerData: IPlayer[]) => {
    this.playerData = playerData

    this.mapPlayerData(playerData)
  }

  toggleLoan = (hideLoan: boolean) => {
    this.hideLoan = hideLoan
  }

  setMin = (min?: number) => {
    this.min = min
  }

  setMax = (max?: number) => {
    this.max = max
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
    if (this.min > 10) {
      return data.filter((player) => player.rating >= this.min)
    }

    return data
  }

  private filterMax = (data: IPlayer[]) => {
    if (this.max > 10) {
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

  private get flattenedPlayerData() {
    return this.filteredPlayers.map((player) => ({
      ...player,
      league: player.league.name,
      team: player.team.club,
      nationality: player.nationality.name,
    }))
  }

  get duplicatePlayers(): IPlayer[][] {
    const notLoanPlayers = this.playerData.filter((player) => !player.loans)

    const duplicates = groupBy(notLoanPlayers, 'assetId') as Record<string, IPlayer[]>

    const filteredDuplicates = Object.values(duplicates).filter((players) => players.length > 1)

    const sort = sortBy(filteredDuplicates, (players) => players[0].playerName)

    return sort
  }

  get orderedPlayers(): IPlayer[] {
    if (this.orderPriority.size > 0) {
      const priority = Array.from(this.orderPriority)
      const values = priority.map((key) => this.orderBy.get(key as keyof IPlayer))

      const newPlayerData = orderBy(this.flattenedPlayerData, priority, values) as IPlayer[]

      return newPlayerData.map((player) => (this.mappedPlayerData.get(player.id)))
    }

    return this.filteredPlayers
  }

  private get groupByLeague() {
    const groupedByleagueId = groupBy(this.playerData, 'leagueId') as Record<number, IPlayer[]>

    const leagues = Object.entries(groupedByleagueId).map(([leagueId, players]) => ({
      league: {
        id: leagueId,
        name: players[0].league.name,
        abbr5: players[0].league.abbr5,
        abbr15: players[0].league.abbr15,
      },
      players,
    }))

    return leagues
  }

  get orderedGroupByLeague() {
    const ordered = orderBy(this.groupByLeague, 'league.abbr5', 'asc')

    return ordered as {
      league: IPlayer['league'] & { id: string },
      players: IPlayer[]
    }[]
  }
}

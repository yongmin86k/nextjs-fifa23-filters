import { orderBy, isNumber } from 'lodash'
import clubFiles from "./data/clubFiles"
const players = require('./data/players.json')
const rarity = require('./data/rarity.json')

interface IRawPlayer {
  f: string
  id: number
  l: string
  r: number
  c?: string
}

export interface IPlayer {
  id: number
  playerName: string
  rating: number
  loans: number | null
  rarityName: string | null
}


export const getAllPlayers = () => {
  const allPlayers: IRawPlayer[] = [...players.LegendsPlayers, ...players.Players]
  const mappedPlayerById = new Map<number, IRawPlayer>()

  allPlayers.forEach((player) => {
    mappedPlayerById.set(player.id, player)
  })

  const mapped: IPlayer[] = clubFiles.map((item) => {
    const playerData = mappedPlayerById.get(item.assetId)

    const rarityName = rarity[`${item.rareflag}`]

    if (!playerData) {
      return {
        id: item.assetId,
        playerName: 'UNKNOWN',
        rating: item.rating,
        loans: item.loans || null,
        rarityName: rarityName || null,
      }
    }

    let playerName

    if (playerData.c) {
      playerName = `${playerData.c}`
    } else {
      playerName = `${playerData.f} ${playerData.l}`
    }

    return {
      id: item.assetId,
      playerName,
      rating: item.rating,
      loans: item.loans || null,
      rarityName: rarityName || null,
    }
  })

  const filtered = mapped.filter((item) => !isNumber(item.loans) && (item.rating >= 80 && item.rating <= 82))
  const sorted = orderBy(filtered, ['rating', 'playernName'], ['desc', 'asc'])

  return sorted as IPlayer[]
}
import clubFiles from './data/clubFiles'

const players = require('./data/players.json')
const local = require('./data/en-US.json')

interface IRawPlayer {
  f: string;
  id: number;
  l: string;
  r: number;
  c?: string;
}

interface ILeague {
  name: string | null;
  abbr5: string | null;
  abbr15: string | null;
}

interface ITeam {
  abbr3: string | null;
  abbr10: string | null;
  abbr15: string | null;
  club: string | null;
}

interface INationality {
  abbr: string | null;
  abbr12: string | null;
  name: string | null;
}

export interface IPlayer {
  id: number;
  playerName: string;
  rating: number;
  loans: number | null;
  rarityName: string | null;
  leagueId: number;
  league: ILeague;
  teamId: number;
  team: ITeam;
  nationId: number;
  nationality: INationality;
}

const getLeague = (leagueId: number): ILeague => {
  const prefix = 'global.league'
  const suffix = `.2023.league${leagueId}`

  const name = `${prefix}Full${suffix}`
  const abbr5 = `${prefix}abbr5${suffix}`
  const abbr15 = `${prefix}abbr15${suffix}`

  return {
    name: local[name] || null,
    abbr5: local[abbr5] || null,
    abbr15: local[abbr15] || null,
  }
}

const getTeam = (
  teamId: number,
): {
  abbr3: string | null;
  abbr10: string | null;
  abbr15: string | null;
  club: string | null;
} => {
  const prefix = 'global.teamabbr'
  const suffix = `.2023.team${teamId}`

  const abbr3 = `${prefix}3${suffix}`
  const abbr10 = `${prefix}10${suffix}`
  const abbr15 = `${prefix}15${suffix}`

  const club = `clubAbbrvByID_${teamId}`

  return {
    abbr3: local[abbr3] || null,
    abbr10: local[abbr10] || null,
    abbr15: local[abbr15] || null,
    club: local[club] || null,
  }
}

const getNationality = (
  nationId: number,
): {
  abbr: string | null;
  abbr12: string | null;
  name: string | null;
} => {
  const abbr = `nationAbbrvByID_${nationId}`
  const abbr12 = `search.nationAbbr12.nation${nationId}`
  const name = `search.nationName.nation${nationId}`

  return {
    abbr: local[abbr] || null,
    abbr12: local[abbr12] || null,
    name: local[name] || null,
  }
}

const getRarityName = (rareFlag: number): string | null => {
  const key = `item.raretype${rareFlag}`

  return local[key]
}

export const getAllPlayers = () => {
  const allPlayers: IRawPlayer[] = [
    ...players.LegendsPlayers,
    ...players.Players,
  ]
  const mappedPlayerById = new Map<number, IRawPlayer>()

  allPlayers.forEach((player) => {
    mappedPlayerById.set(player.id, player)
  })

  const mapped: IPlayer[] = clubFiles.map((item) => {
    const playerData = mappedPlayerById.get(item.assetId)

    const rarityName = getRarityName(item.rareflag)

    if (!playerData) {
      return {
        id: item.assetId,
        playerName: 'UNKNOWN',
        rating: item.rating,
        loans: item.loans || null,
        rarityName: rarityName || null,
        leagueId: item.leagueId,
        league: getLeague(item.leagueId),
        teamId: item.teamid,
        team: getTeam(item.teamid),
        nationId: item.nation,
        nationality: getNationality(item.nation),
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
      leagueId: item.leagueId,
      league: getLeague(item.leagueId),
      teamId: item.teamid,
      team: getTeam(item.teamid),
      nationId: item.nation,
      nationality: getNationality(item.nation),
    }
  })

  return mapped
}

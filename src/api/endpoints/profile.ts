import api from "@services/ApiService"
import { SearchCategory } from "@api/endpoints/search"

export type BaseDetail = {
  readonly name?: string
  readonly title?: string
  readonly homeworld: string
  readonly films: string[]
  readonly species: string[]
  readonly vechiles: string[]
  readonly starships: string[]
	readonly url: string
	readonly created: Date
	readonly edited: Date
}

export interface Person extends BaseDetail {
  readonly height: number
  readonly mass: number
  readonly hair_color: string
  readonly skin_color: string
  readonly eye_color: string
  readonly birth_year: string
  readonly gender?: 'male' | 'female'
}

export interface Vechile extends BaseDetail {
  readonly cargo_capacity: number
  readonly consumables: string
  readonly cost_in_credits: number
  readonly crew: string
  readonly length: number
  readonly manufacturer: string
  readonly max_atmosphering_speed: number
  readonly model: string
  readonly passengers: number
  readonly vehicle_class: string
  readonly pilots?: string[]
}

export interface Starship extends Vechile {
  readonly MGLT: number
  readonly hyperdrive_rating: number
  readonly starship_class?: string[]
}

export interface Planet extends BaseDetail {
  readonly climate: string
  readonly diameter: number
  readonly gravity: string
  readonly orbital_period: number
  readonly population: number
  readonly residents: string[]
  readonly rotation_period: number
  readonly surface_water: number
  readonly terrain: string
}

export interface Film extends BaseDetail {
  characters: string[]
  director: string
  episode_id: number
  opening_crawl: string
  producer: string
  release_date: Date
}

export type MultiCategoryDetails =  Person | Vechile | Starship | Planet | Film;

export type ProfileResponse<Item> = Item[]

export type GetProfileParams = {
  category: SearchCategory
  ids: number[]
}


export const getProfile = async <Item>({ category, ids }: GetProfileParams) => {
  if (!ids.length) {
    return Promise.reject({
      message: 'IDs is required',
    })
  }

  if (!category) {
    return Promise.reject({
      message: 'Category is required',
    })
  }

  return Promise.resolve((await Promise.all(
    ids.map((id: number) => api.get<ProfileResponse<Item>>(`/${category}/${id}`)
    .then(response => response.data)
    )
  )).flat(1))
} 
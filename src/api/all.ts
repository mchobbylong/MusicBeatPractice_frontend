import { axios } from './request'

type randomGenerateApi = {
  rhythm_list: number[];
  bar_count_min: number;
  bar_count_max: number;
  bpm: number;
}
export function randomGenerate (data: randomGenerateApi) {
  return axios({
    method: 'post',
    url: '/',
    data
  })
}

export function checkIdExist (id: string) {
  return axios.get(`/${id}`)
}

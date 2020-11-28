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
    url: '/random',
    data
  })
}

type customGenerateApi = {
  custom: string;
  rhythm: number;
  bpm: number;
}
export function customGenerate (data: customGenerateApi) {
  return axios({
    method: 'post',
    url: '/custom',
    data
  })
}

export function checkIdExist (id: string) {
  return axios.get(`/${id}`)
}
